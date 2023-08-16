import { PrismaClient } from "@prisma/client";
// import { GraphQLErrorWithCode } from "src/lib/error/error";
import { MutationResolvers } from "src/lib/generated/resolver-types";
import { GraphQLContext } from "src/context";
import { withErrorHandling } from "src/lib/error/handling";
import { GraphQLErrorWithCode } from "src/lib/error/error";

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
};

export { PanelMutationResolver };
