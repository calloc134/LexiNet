/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  fragment TransactionFragment on Transaction {\n    transaction_uuid\n    tickets_count\n    amount\n    status\n  }\n":
    types.TransactionFragmentFragmentDoc,
  "\n  fragment TransactionDetailFragment on Transaction {\n    transaction_uuid\n    transaction_hash\n    tickets_count\n    amount\n    status\n    created_at\n    updated_at\n  }\n":
    types.TransactionDetailFragmentFragmentDoc,
  "\n  mutation requestTransactionApprovalMutation($transaction_uuid: UUID!, $transaction_hash: String!) {\n    requestTransactionApproval(transaction_uuid: $transaction_uuid, transaction_hash: $transaction_hash) {\n      transaction_uuid\n    }\n  }\n":
    types.RequestTransactionApprovalMutationDocument,
  "\n  query GetTransactionDetailQuery($uuid: UUID!) {\n    getTransactionByUUID(uuid: $uuid) {\n      ...TransactionDetailFragment\n    }\n  }\n":
    types.GetTransactionDetailQueryDocument,
  "\n  query GetAllMyTransactionsQuery {\n    getAllMyTransactions(limit: 10) {\n      ...TransactionFragment\n    }\n  }\n":
    types.GetAllMyTransactionsQueryDocument,
  "\n  mutation CreateTransactionMutation($amount: PositiveFloat!) {\n    createTransaction(amount: $amount) {\n      ...TransactionFragment\n    }\n  }\n":
    types.CreateTransactionMutationDocument,
  "\n  fragment UserFragment on User {\n    user_uuid\n    handle\n    screen_name\n  }\n": types.UserFragmentFragmentDoc,
  "\n  fragment UserDetailFragment on User {\n    user_uuid\n    handle\n    screen_name\n    bio\n    created_at\n    updated_at\n    role\n  }\n":
    types.UserDetailFragmentFragmentDoc,
  "\n  query UserDetailFragment($uuid: UUID!) {\n    getUserByUUID(uuid: $uuid) {\n      ...UserDetailFragment\n    }\n  }\n": types.UserDetailFragmentDocument,
  "\n  query GetUsersQuery {\n    getAllUsers(limit: 10) {\n      ...UserFragment\n    }\n  }\n": types.GetUsersQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment TransactionFragment on Transaction {\n    transaction_uuid\n    tickets_count\n    amount\n    status\n  }\n"
): (typeof documents)["\n  fragment TransactionFragment on Transaction {\n    transaction_uuid\n    tickets_count\n    amount\n    status\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment TransactionDetailFragment on Transaction {\n    transaction_uuid\n    transaction_hash\n    tickets_count\n    amount\n    status\n    created_at\n    updated_at\n  }\n"
): (typeof documents)["\n  fragment TransactionDetailFragment on Transaction {\n    transaction_uuid\n    transaction_hash\n    tickets_count\n    amount\n    status\n    created_at\n    updated_at\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation requestTransactionApprovalMutation($transaction_uuid: UUID!, $transaction_hash: String!) {\n    requestTransactionApproval(transaction_uuid: $transaction_uuid, transaction_hash: $transaction_hash) {\n      transaction_uuid\n    }\n  }\n"
): (typeof documents)["\n  mutation requestTransactionApprovalMutation($transaction_uuid: UUID!, $transaction_hash: String!) {\n    requestTransactionApproval(transaction_uuid: $transaction_uuid, transaction_hash: $transaction_hash) {\n      transaction_uuid\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetTransactionDetailQuery($uuid: UUID!) {\n    getTransactionByUUID(uuid: $uuid) {\n      ...TransactionDetailFragment\n    }\n  }\n"
): (typeof documents)["\n  query GetTransactionDetailQuery($uuid: UUID!) {\n    getTransactionByUUID(uuid: $uuid) {\n      ...TransactionDetailFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetAllMyTransactionsQuery {\n    getAllMyTransactions(limit: 10) {\n      ...TransactionFragment\n    }\n  }\n"
): (typeof documents)["\n  query GetAllMyTransactionsQuery {\n    getAllMyTransactions(limit: 10) {\n      ...TransactionFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateTransactionMutation($amount: PositiveFloat!) {\n    createTransaction(amount: $amount) {\n      ...TransactionFragment\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateTransactionMutation($amount: PositiveFloat!) {\n    createTransaction(amount: $amount) {\n      ...TransactionFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UserFragment on User {\n    user_uuid\n    handle\n    screen_name\n  }\n"
): (typeof documents)["\n  fragment UserFragment on User {\n    user_uuid\n    handle\n    screen_name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UserDetailFragment on User {\n    user_uuid\n    handle\n    screen_name\n    bio\n    created_at\n    updated_at\n    role\n  }\n"
): (typeof documents)["\n  fragment UserDetailFragment on User {\n    user_uuid\n    handle\n    screen_name\n    bio\n    created_at\n    updated_at\n    role\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query UserDetailFragment($uuid: UUID!) {\n    getUserByUUID(uuid: $uuid) {\n      ...UserDetailFragment\n    }\n  }\n"
): (typeof documents)["\n  query UserDetailFragment($uuid: UUID!) {\n    getUserByUUID(uuid: $uuid) {\n      ...UserDetailFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetUsersQuery {\n    getAllUsers(limit: 10) {\n      ...UserFragment\n    }\n  }\n"
): (typeof documents)["\n  query GetUsersQuery {\n    getAllUsers(limit: 10) {\n      ...UserFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
