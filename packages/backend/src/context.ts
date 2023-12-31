import { PrismaClient } from "@prisma/client";
import { UserPayload } from "@envelop/auth0";
import { IncomingMessage } from "http";
import { User } from "@prisma/client";

// コンテキストの型定義
export type GraphQLContext = {
  // Prismaクライアントの型定義
  prisma: PrismaClient;
  // JWTのペイロードの型定義
  logto?: UserPayload;
  // リクエストの型定義
  req: IncomingMessage;
  // 現在ログインしているユーザーのUUID
  currentUser: User;
};
