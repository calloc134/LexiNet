import { Context } from "src/context";
import { QueryResolvers } from "./generated/resolvers-types";
import { GraphQLError } from "graphql";

// クエリのリゾルバーを定義
export const Query: QueryResolvers<Context> = {
  // userクエリのリゾルバー
  user: async (_parent, args, context: Context) => {
    // 呼び出し引数よりuuidを取得
    const { uuid: user_uuid } = args;

    // Prismaからuuidに相当するユーザーを取得
    try {
      const result = await context.prisma.user.findUniqueOrThrow({
        where: {
          uuid: user_uuid,
        },
        // ユーザーのプロフィール情報も取得
        include: {
          profile: true,
        },
      });

      // 結果を返す
      return result;
      
    } catch (error) {
      // エラーが発生した場合はGraphQLErrorとして返却
      throw new GraphQLError(error);
    }
  }
};