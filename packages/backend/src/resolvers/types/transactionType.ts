import { PrismaClient } from "@prisma/client";
import { TransactionResolvers } from "src/lib/generated/resolver-types";
import { GraphQLContext } from "src/context";
import { withErrorHandling } from "src/lib/error/handling";

const TransactionTypeResolver: TransactionResolvers<GraphQLContext> = {
  // ユーザーフィールドのリゾルバー
  // user: async (parent, _args, context) => {
  //   const safeUser = withErrorHandling(async (transaction_uuid: string, prisma: PrismaClient) => {
  //     // UUIDから投稿を取得
  //     const result = await prisma.transaction
  //       .findUniqueOrThrow({
  //         where: {
  //           transaction_uuid: transaction_uuid,
  //         },
  //       })
  //       // そこから投稿者を取得
  //       .user();
  //     return result;
  //   });
  //   // ペアレントオブジェクトから投稿のUUIDを取得
  //   const { transaction_uuid } = parent;
  //   // コンテキストからPrismaクライアントを取得
  //   const { prisma } = context;
  //   return await safeUser(transaction_uuid, prisma);
  // },
};

export { TransactionTypeResolver };
