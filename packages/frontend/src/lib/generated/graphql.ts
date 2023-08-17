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
  PositiveFloat: { input: number; output: number };
  PositiveInt: { input: number; output: number };
  UUID: { input: string; output: string };
};

export type ChatGptInterface = {
  text: Scalars["String"]["output"];
};

export type Mutation = {
  createTransaction: Transaction;
  deleteMyUser: User;
  deleteUserForAdmin: User;
  requestTransactionApproval: Transaction;
  updateMyUser: User;
  updateUserForAdmin: User;
};

export type MutationCreateTransactionArgs = {
  amount: Scalars["PositiveFloat"]["input"];
};

export type MutationDeleteUserForAdminArgs = {
  user_uuid: Scalars["UUID"]["input"];
};

export type MutationRequestTransactionApprovalArgs = {
  transaction_hash: Scalars["String"]["input"];
  transaction_uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateMyUserArgs = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  handle?: InputMaybe<Scalars["String"]["input"]>;
  screen_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateUserForAdminArgs = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  handle?: InputMaybe<Scalars["String"]["input"]>;
  screen_name?: InputMaybe<Scalars["String"]["input"]>;
  user_uuid: Scalars["UUID"]["input"];
};

export type Query = {
  chatGPT: ChatGptInterface;
  getAllMyTransactions: Array<Transaction>;
  getAllUsers: Array<User>;
  getTransactionByUUID: Transaction;
  getUserByUUID: User;
};

export type QueryChatGptArgs = {
  text: Scalars["String"]["input"];
};

export type QueryGetAllMyTransactionsArgs = {
  limit?: InputMaybe<Scalars["PositiveInt"]["input"]>;
  offset?: InputMaybe<Scalars["PositiveInt"]["input"]>;
};

export type QueryGetAllUsersArgs = {
  limit?: InputMaybe<Scalars["PositiveInt"]["input"]>;
  offset?: InputMaybe<Scalars["PositiveInt"]["input"]>;
};

export type QueryGetTransactionByUuidArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetUserByUuidArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type Role = "ADMIN" | "USER";

export type Transaction = {
  amount: Scalars["PositiveFloat"]["output"];
  created_at: Scalars["DateTime"]["output"];
  status: TransactionStatus;
  tickets_count: Scalars["PositiveInt"]["output"];
  transaction_hash: Scalars["String"]["output"];
  transaction_uuid: Scalars["UUID"]["output"];
  updated_at: Scalars["DateTime"]["output"];
};

export type TransactionStatus = "APPROVED" | "PENDING" | "REJECTED";

export type User = {
  bio: Scalars["String"]["output"];
  created_at: Scalars["DateTime"]["output"];
  handle: Scalars["String"]["output"];
  role: Role;
  screen_name: Scalars["String"]["output"];
  tickets_count: Scalars["PositiveInt"]["output"];
  updated_at: Scalars["DateTime"]["output"];
  user_uuid: Scalars["UUID"]["output"];
};

export type TransactionFragmentFragment = { transaction_uuid: string; tickets_count: number; amount: number; status: TransactionStatus } & {
  " $fragmentName"?: "TransactionFragmentFragment";
};

export type TransactionDetailFragmentFragment = {
  transaction_uuid: string;
  transaction_hash: string;
  tickets_count: number;
  amount: number;
  status: TransactionStatus;
  created_at: Date;
  updated_at: Date;
} & { " $fragmentName"?: "TransactionDetailFragmentFragment" };

export type RequestTransactionApprovalMutationMutationVariables = Exact<{
  transaction_uuid: Scalars["UUID"]["input"];
  transaction_hash: Scalars["String"]["input"];
}>;

export type RequestTransactionApprovalMutationMutation = { requestTransactionApproval: { transaction_uuid: string } };

export type GetTransactionDetailQueryQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetTransactionDetailQueryQuery = {
  getTransactionByUUID: { " $fragmentRefs"?: { TransactionDetailFragmentFragment: TransactionDetailFragmentFragment } };
};

export type GetAllMyTransactionsQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllMyTransactionsQueryQuery = {
  getAllMyTransactions: Array<{ " $fragmentRefs"?: { TransactionFragmentFragment: TransactionFragmentFragment } }>;
};

export type CreateTransactionMutationMutationVariables = Exact<{
  amount: Scalars["PositiveFloat"]["input"];
}>;

export type CreateTransactionMutationMutation = { createTransaction: { " $fragmentRefs"?: { TransactionFragmentFragment: TransactionFragmentFragment } } };

export type UserFragmentFragment = { user_uuid: string; handle: string; screen_name: string } & { " $fragmentName"?: "UserFragmentFragment" };

export type UserDetailFragmentFragment = {
  user_uuid: string;
  handle: string;
  screen_name: string;
  bio: string;
  created_at: Date;
  updated_at: Date;
  role: Role;
} & { " $fragmentName"?: "UserDetailFragmentFragment" };

export type UserDetailFragmentQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type UserDetailFragmentQuery = { getUserByUUID: { " $fragmentRefs"?: { UserDetailFragmentFragment: UserDetailFragmentFragment } } };

export type GetUsersQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQueryQuery = { getAllUsers: Array<{ " $fragmentRefs"?: { UserFragmentFragment: UserFragmentFragment } }> };

export const TransactionFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TransactionFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Transaction" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "transaction_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "tickets_count" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TransactionFragmentFragment, unknown>;
export const TransactionDetailFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TransactionDetailFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Transaction" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "transaction_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "transaction_hash" } },
          { kind: "Field", name: { kind: "Name", value: "tickets_count" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TransactionDetailFragmentFragment, unknown>;
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
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const UserDetailFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserDetailFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          { kind: "Field", name: { kind: "Name", value: "role" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserDetailFragmentFragment, unknown>;
export const RequestTransactionApprovalMutationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "requestTransactionApprovalMutation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "transaction_uuid" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "transaction_hash" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "requestTransactionApproval" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "transaction_uuid" },
                value: { kind: "Variable", name: { kind: "Name", value: "transaction_uuid" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "transaction_hash" },
                value: { kind: "Variable", name: { kind: "Name", value: "transaction_hash" } },
              },
            ],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "transaction_uuid" } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RequestTransactionApprovalMutationMutation, RequestTransactionApprovalMutationMutationVariables>;
export const GetTransactionDetailQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTransactionDetailQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getTransactionByUUID" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "uuid" }, value: { kind: "Variable", name: { kind: "Name", value: "uuid" } } }],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "TransactionDetailFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TransactionDetailFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Transaction" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "transaction_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "transaction_hash" } },
          { kind: "Field", name: { kind: "Name", value: "tickets_count" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTransactionDetailQueryQuery, GetTransactionDetailQueryQueryVariables>;
export const GetAllMyTransactionsQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAllMyTransactionsQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAllMyTransactions" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "limit" }, value: { kind: "IntValue", value: "10" } }],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "TransactionFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TransactionFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Transaction" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "transaction_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "tickets_count" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllMyTransactionsQueryQuery, GetAllMyTransactionsQueryQueryVariables>;
export const CreateTransactionMutationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateTransactionMutation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "amount" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "PositiveFloat" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTransaction" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "amount" }, value: { kind: "Variable", name: { kind: "Name", value: "amount" } } }],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "TransactionFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TransactionFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Transaction" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "transaction_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "tickets_count" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTransactionMutationMutation, CreateTransactionMutationMutationVariables>;
export const UserDetailFragmentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserDetailFragment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUserByUUID" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "uuid" }, value: { kind: "Variable", name: { kind: "Name", value: "uuid" } } }],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserDetailFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserDetailFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          { kind: "Field", name: { kind: "Name", value: "role" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserDetailFragmentQuery, UserDetailFragmentQueryVariables>;
export const GetUsersQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUsersQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAllUsers" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "limit" }, value: { kind: "IntValue", value: "10" } }],
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
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQueryQuery, GetUsersQueryQueryVariables>;
