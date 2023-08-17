import { PrismaClient } from "@prisma/client";
import { GraphQLErrorWithCode } from "src/lib/error/error";
import { QueryResolvers } from "src/lib/generated/resolver-types";
import { GraphQLContext } from "src/context";
import { withErrorHandling } from "src/lib/error/handling";

const PanelQueryResolver: QueryResolvers<GraphQLContext> = {
  // getUserByUUIDクエリのリゾルバー
  getUserByUUID: async (_parent, args, context) => {
    const safeUser = withErrorHandling(async (prisma: PrismaClient, user_uuid: string) => {
      // UUIDからユーザーを取得
      const result = await prisma.user.findUniqueOrThrow({
        where: {
          user_uuid: user_uuid,
        },
      });
      return result;
    });

    // 引数からユーザーのUUIDを取得
    const { uuid: user_uuid } = args;
    // コンテキストからPrismaクライアントを取得
    const { prisma } = context;

    return await safeUser(prisma, user_uuid);
  },

  // getAllUsersクエリのリゾルバー
  getAllUsers: async (_parent, args, context) => {
    const safeUsers = withErrorHandling(async (prisma: PrismaClient, { offset, limit }: { offset: number; limit: number }) => {
      // ユーザーを全件取得
      const result = await prisma.user.findMany({
        skip: offset,
        take: limit,
        // ユーザを新しい順に並び替える
        orderBy: {
          created_at: "desc",
        },
      });
      return result;
    });

    // 引数からページネーションのoffsetとlimitを取得
    const { offset, limit } = args;
    // コンテキストからPrismaクライアントを取得
    const { prisma } = context;

    return await safeUsers(prisma, { limit, offset });
  },

  // getTransactionByUUIDクエリのリゾルバー
  getTransactionByUUID: async (_parent, args, context) => {
    const safeTransaction = withErrorHandling(async (user_uuid: string, prisma: PrismaClient, transaction_uuid: string) => {
      // UUIDからトランザクションを取得
      const result = await prisma.transaction.findUniqueOrThrow({
        where: {
          transaction_uuid: transaction_uuid,
        },
      });

      // もし自分のトランザクションでなければエラーを返す
      if (result.userUuid !== user_uuid) {
        throw new GraphQLErrorWithCode("item_not_owned");
      }
      return result;
    });

    // 引数からトランザクションのUUIDを取得
    const { uuid: transaction_uuid } = args;
    // コンテキストからPrismaクライアントとログインユーザーを取得
    const { prisma, currentUser } = context;

    return await safeTransaction(currentUser.user_uuid, prisma, transaction_uuid);
  },

  // getMyUserクエリのリゾルバー
  getMyUser: async (_parent, _args, context) => {
    const safeUser = withErrorHandling(async (user_uuid: string, prisma: PrismaClient) => {
      // ログインユーザーを取得
      const result = await prisma.user.findUniqueOrThrow({
        where: {
          user_uuid: user_uuid,
        },
      });
      return result;
    });

    // コンテキストからPrismaクライアントとログインユーザーを取得
    const { prisma, currentUser } = context;

    return await safeUser(currentUser.user_uuid, prisma);
  },

  // getAllTransactionsクエリのリゾルバー
  getAllMyTransactions: async (_parent, args, context) => {
    const safeTransactions = withErrorHandling(async (user_uuid: string, prisma: PrismaClient, { offset, limit }: { offset: number; limit: number }) => {
      // トランザクションを全件取得
      const result = await prisma.transaction.findMany({
        where: {
          // ログインユーザーのトランザクションのみ取得
          userUuid: user_uuid,
        },
        skip: offset,
        take: limit,
        // トランザクションを新しい順に並び替える
        orderBy: {
          created_at: "desc",
        },
      });
      return result;
    });

    // 引数からページネーションのoffsetとlimitを取得
    const { offset, limit } = args;

    // コンテキストからPrismaクライアントを取得
    const { prisma, currentUser } = context;

    return await safeTransactions(currentUser.user_uuid, prisma, { limit, offset });
  },
};

export { PanelQueryResolver };
