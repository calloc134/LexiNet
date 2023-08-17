import { PrismaClient } from "@prisma/client";
import { GraphQLErrorWithCode } from "src/lib/error/error";
import { QueryResolvers } from "src/lib/generated/resolver-types";
import { GraphQLContext } from "src/context";
import { withErrorHandling } from "src/lib/error/handling";
import axios from "axios";

// ChatGPTエンドポイントの戻り値の型
type ChatCompletion = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

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

  // ChatGPTクエリのリゾルバー
  chatGPT: async (_parent, args, context) => {
    const safeChatGPT = withErrorHandling(async (user_uuid: string, prisma: PrismaClient, message: string) => {
      // ユーザの存在を確認しチケット枚数を確認
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          user_uuid: user_uuid,
        },
        select: {
          tickets_count: true,
        },
      });

      // ChatGPTエンドポイントにリクエストを送信
      const response = await axios.post<ChatCompletion>("https://gptwrapper-f6bkalktuq-uc.a.run.app?text=" + encodeURIComponent(message));

      const { choices, usage } = response.data;

      // チケット枚数を確認し、足りない場合はエラーを返す
      if (user.tickets_count < usage.total_tokens) {
        throw new GraphQLErrorWithCode("insufficient_ticket");
      }

      // チケット枚数を減らす
      await prisma.user.update({
        where: {
          user_uuid: user_uuid,
        },
        data: {
          tickets_count: {
            decrement: usage.total_tokens,
          },
        },
      });

      return {
        text: choices[0].message.content,
      };
    });

    // 引数からメッセージを取得
    const { text } = args;

    // コンテキストからPrismaクライアントを取得
    const { prisma, currentUser } = context;

    return await safeChatGPT(currentUser.user_uuid, prisma, text);
  },
};

export { PanelQueryResolver };
