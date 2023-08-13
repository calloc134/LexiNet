/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date; output: Date };
  PositiveInt: { input: number; output: number };
  UUID: { input: string; output: string };
};

export type Mutation = {
  createPost: Post;
  deleteMyUser: User;
  deletePost: Post;
  deleteUserForAdmin: User;
  updateMyUser: User;
  updatePost: Post;
  updateUserForAdmin: User;
};

export type MutationCreatePostArgs = {
  body: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationDeletePostArgs = {
  post_uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteUserForAdminArgs = {
  user_uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateMyUserArgs = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  handle?: InputMaybe<Scalars["String"]["input"]>;
  screen_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdatePostArgs = {
  body: Scalars["String"]["input"];
  post_uuid: Scalars["UUID"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationUpdateUserForAdminArgs = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  handle?: InputMaybe<Scalars["String"]["input"]>;
  screen_name?: InputMaybe<Scalars["String"]["input"]>;
  user_uuid: Scalars["UUID"]["input"];
};

export type Post = {
  body: Scalars["String"]["output"];
  created_at: Scalars["DateTime"]["output"];
  is_public: Scalars["Boolean"]["output"];
  post_uuid: Scalars["UUID"]["output"];
  title: Scalars["String"]["output"];
  updated_at: Scalars["DateTime"]["output"];
  user: User;
};

export type Query = {
  getAllPosts: Array<Post>;
  getAllUsers: Array<User>;
  getPostByUUID: Post;
  getUserByUUID: User;
};

export type QueryGetAllPostsArgs = {
  limit?: InputMaybe<Scalars["PositiveInt"]["input"]>;
  offset?: InputMaybe<Scalars["PositiveInt"]["input"]>;
};

export type QueryGetAllUsersArgs = {
  limit?: InputMaybe<Scalars["PositiveInt"]["input"]>;
  offset?: InputMaybe<Scalars["PositiveInt"]["input"]>;
};

export type QueryGetPostByUuidArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetUserByUuidArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type Role = "ADMIN" | "USER";

export type User = {
  bio: Scalars["String"]["output"];
  created_at: Scalars["DateTime"]["output"];
  handle: Scalars["String"]["output"];
  posts: Array<Post>;
  role: Role;
  screen_name: Scalars["String"]["output"];
  updated_at: Scalars["DateTime"]["output"];
  user_uuid: Scalars["UUID"]["output"];
};

export type UserPostsArgs = {
  limit?: InputMaybe<Scalars["PositiveInt"]["input"]>;
  offset?: InputMaybe<Scalars["PositiveInt"]["input"]>;
};

export type PostFragmentFragment = {
  post_uuid: string;
  title: string;
  body: string;
  user: { " $fragmentRefs"?: { UserFragmentFragment: UserFragmentFragment } };
} & { " $fragmentName"?: "PostFragmentFragment" };

export type UserFragmentFragment = { user_uuid: string; handle: string; screen_name: string; bio: string } & { " $fragmentName"?: "UserFragmentFragment" };

export type PanelPageQueryQueryVariables = Exact<{ [key: string]: never }>;

export type PanelPageQueryQuery = { getAllPosts: Array<{ " $fragmentRefs"?: { PostFragmentFragment: PostFragmentFragment } }> };

export const UserFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const PostFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "post_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostFragmentFragment, unknown>;
export const PanelPageQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PanelPageQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAllPosts" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "limit" }, value: { kind: "IntValue", value: "10" } }],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "PostFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "post_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserFragment" } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PanelPageQueryQuery, PanelPageQueryQueryVariables>;
