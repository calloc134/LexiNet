import { PrismaClient } from "@prisma/client";
import { GraphQLErrorWithCode } from "src/lib/error/error";
import { MutationResolvers } from "src/lib/generated/resolver-types";
import { GraphQLContext } from "src/context";
import { withErrorHandling } from "src/lib/error/handling";
import { getTransactionDetails } from "src/lib/transaction_checker/transaction_checker";

// prismaのupdateは、undefinedな値を渡すと、そのフィールドを更新しないことに留意する

const PanelMutationResolver: MutationResolvers<GraphQLContext> = {
  // updateUserForAdminフィールドのリゾルバー
  updateUserForAdmin: async (_parent, args, context) => {
    const safeUser = withErrorHandling(
      async (user_uuid: string, prisma: PrismaClient, { bio, handle, screen_name }: { bio?: string; handle?: string; screen_name?: string }) => {
        // UUIDからユーザーを取得
        const result = await prisma.user.update({
          where: {
            user_uuid: user_uuid,
          },
          data: {
            bio: bio,
            handle: handle,
            screen_name: screen_name,
          },
        });
        return result;
      }
    );

    // 引数からユーザーのUUIDとミューテーションの引数を取得
    const { user_uuid, bio: maybeBio, handle: maybeHandle, screen_name: maybeScreenName } = args;
    // コンテキストからPrismaクライアントを取得
    const { prisma } = context;

    const bio = maybeBio ?? undefined;
    const handle = maybeHandle ?? undefined;
    const screen_name = maybeScreenName ?? undefined;

    return await safeUser(user_uuid, prisma, { bio, handle, screen_name });
  },

  // deleteUserForAdminフィールドのリゾルバー
  deleteUserForAdmin: async (_parent, args, context) => {
    const safeUser = withErrorHandling(async (user_uuid: string, prisma: PrismaClient) => {
      // UUIDからユーザーを取得
      const result = await prisma.user.delete({
        where: {
          user_uuid: user_uuid,
        },
      });
      return result;
    });

    // 引数からユーザーのUUIDを取得
    const { user_uuid } = args;
    // コンテキストからPrismaクライアントを取得
    const { prisma } = context;

    return await safeUser(user_uuid, prisma);
  },

  // updateMyUserフィールドのリゾルバー
  updateMyUser: async (_parent, args, context) => {
    const safeUser = withErrorHandling(
      async (currentUser_uuid: string, prisma: PrismaClient, { bio, handle, screen_name }: { bio?: string; handle?: string; screen_name?: string }) => {
        // UUIDからユーザーを取得
        const result = await prisma.user.update({
          where: {
            user_uuid: currentUser_uuid,
          },
          data: {
            bio: bio,
            handle: handle,
            screen_name: screen_name,
          },
        });
        return result;
      }
    );

    // 引数からミューテーションの引数を取得
    const { bio: maybeBio, handle: maybeHandle, screen_name: maybeScreenName } = args;

    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    const bio = maybeBio ?? undefined;
    const handle = maybeHandle ?? undefined;
    const screen_name = maybeScreenName ?? undefined;

    return await safeUser(currentUser.user_uuid, prisma, { bio, handle, screen_name });
  },

  // deleteMyUserフィールドのリゾルバー
  deleteMyUser: async (_parent, _args, context) => {
    const safeUser = withErrorHandling(async (currentUser_uuid: string, prisma: PrismaClient) => {
      // UUIDからユーザーを取得
      const result = await prisma.user.delete({
        where: {
          user_uuid: currentUser_uuid,
        },
      });
      return result;
    });

    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    return await safeUser(currentUser.user_uuid, prisma);
  },

  // createTransactionのリゾルバー
  createTransaction: async (_parent, args, context) => {
    const safeTransaction = withErrorHandling(async (current_user_uuid: string, prisma: PrismaClient, { amount: amount }: { amount: number }) => {
      // amountが0.0001につきチケット一枚とする計算
      const tickets_count = Math.floor(amount * 10000);

      // UUIDからユーザーを取得
      const result = await prisma.transaction.create({
        data: {
          amount: amount,
          tickets_count: tickets_count,
          transaction_hash: "",
          status: "PENDING",
          user: {
            connect: {
              user_uuid: current_user_uuid,
            },
          },
        },
      });

      return result;
    });

    // 引数からミューテーションの引数を取得
    const { amount } = args;

    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    return await safeTransaction(currentUser.user_uuid, prisma, { amount });
  },

  // requestTransactionApprovalのリゾルバー
  requestTransactionApproval: async (_parent, args, context) => {
    const safeTransaction = withErrorHandling(
      async (
        current_user_uuid: string,
        prisma: PrismaClient,
        { transaction_uuid: transaction_uuid, transaction_hash: transaction_hash }: { transaction_uuid: string; transaction_hash: string }
      ) => {
        // ブロックチェーンのトランザクションハッシュから送金量・送金先アドレスと着金先アドレスを取得
        const { amount, receiver } = await getTransactionDetails(transaction_hash);

        // データベースのトランザクションから送金量を取得
        const { amount: require_amount, tickets_count } = await prisma.transaction.findUniqueOrThrow({
          where: {
            transaction_uuid: transaction_uuid,
          },
        });

        // もし送金量が足りていなければエラーを返す
        if (amount < require_amount) {
          throw new GraphQLErrorWithCode("insufficient_amount");
        }

        // もし送金先アドレスが異なっていればエラーを返す
        if (receiver !== "0x57dc7A6D9Aa8cc04E8fb629C5AC298b02C85F1e4".toLocaleLowerCase()) {
          throw new GraphQLErrorWithCode("invalid_receiver");
        }

        // また、データベースで同一のトランザクションがあればエラーを返す
        if (
          (
            await prisma.transaction.findMany({
              where: {
                transaction_hash: transaction_hash,
              },
              select: {
                transaction_uuid: true,
              },
            })
          ).length > 0
        ) {
          throw new GraphQLErrorWithCode("transaction_already_exists");
        }

        // 成功なのでトランザクションを更新

        // UUIDからユーザーを取得
        // トランザクションの開始
        const result = await prisma.$transaction([
          // UUIDからトランザクションを更新
          prisma.transaction.update({
            where: {
              transaction_uuid: transaction_uuid,
            },
            data: {
              transaction_hash: transaction_hash,
              status: "APPROVED",
            },
          }),
          // チケット枚数の分だけユーザのチケットを増やす
          prisma.user.update({
            where: {
              user_uuid: current_user_uuid,
            },
            data: {
              tickets_count: {
                increment: tickets_count,
              },
            },
          }),
        ]);
        // トランザクションの終了

        return result[0];
      }
    );

    // 引数からミューテーションの引数を取得
    const { transaction_uuid, transaction_hash } = args;

    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    return await safeTransaction(currentUser.user_uuid, prisma, { transaction_uuid, transaction_hash });
  },
};

export { PanelMutationResolver };
