import { PrismaClient } from "@prisma/client";
import { UserResolvers } from "src/lib/generated/resolver-types";
import { GraphQLContext } from "src/context";
import { withErrorHandling } from "src/lib/error/handling";

const UserTypeResolver: UserResolvers<GraphQLContext> = {
  transactions: async (parent, args, context) => {
    const safeTransactions = withErrorHandling(async (user_uuid: string, { offset, limit }: { offset: number; limit: number }, prisma: PrismaClient) => {
      // ユーザーのUUIDからトランザクションを取得
      const result = await prisma.transaction.findMany({
        where: {
          user_uuid: user_uuid,
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

    // ペアレントオブジェクトからユーザーのUUIDを取得
    const { user_uuid } = parent;
    // 引数からページネーションのoffsetとlimitを取得
    const { offset, limit } = args;
    // コンテキストからPrismaクライアントを取得
    const { prisma } = context;

    return await safeTransactions(user_uuid, { limit, offset }, prisma);
  },
};

export { UserTypeResolver };
