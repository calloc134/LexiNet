import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
import type { GraphQLContext } from "../../context";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  chatGPT: ChatGptInterface;
  createTransaction: Transaction;
  deleteMyUser: User;
  deleteUserForAdmin: User;
  requestTransactionApproval: Transaction;
  updateMyUser: User;
  updateUserForAdmin: User;
};

export type MutationChatGptArgs = {
  text: Scalars["String"]["input"];
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
  getAllMyTransactions: Array<Transaction>;
  getAllUsers: Array<User>;
  getMyUser: User;
  getTransactionByUUID: Transaction;
  getUserByUUID: User;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  ChatGPTInterface: ResolverTypeWrapper<ChatGptInterface>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  PositiveFloat: ResolverTypeWrapper<Scalars["PositiveFloat"]["output"]>;
  PositiveInt: ResolverTypeWrapper<Scalars["PositiveInt"]["output"]>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionStatus: TransactionStatus;
  UUID: ResolverTypeWrapper<Scalars["UUID"]["output"]>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]["output"];
  ChatGPTInterface: ChatGptInterface;
  DateTime: Scalars["DateTime"]["output"];
  Mutation: {};
  PositiveFloat: Scalars["PositiveFloat"]["output"];
  PositiveInt: Scalars["PositiveInt"]["output"];
  Query: {};
  String: Scalars["String"]["output"];
  Transaction: Transaction;
  UUID: Scalars["UUID"]["output"];
  User: User;
};

export type AuthDirectiveArgs = {
  role?: Role;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = GraphQLContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<
  Result,
  Parent,
  ContextType,
  Args
>;

export type ChatGptInterfaceResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["ChatGPTInterface"] = ResolversParentTypes["ChatGPTInterface"]
> = {
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]> = {
  chatGPT?: Resolver<ResolversTypes["ChatGPTInterface"], ParentType, ContextType, RequireFields<MutationChatGptArgs, "text">>;
  createTransaction?: Resolver<ResolversTypes["Transaction"], ParentType, ContextType, RequireFields<MutationCreateTransactionArgs, "amount">>;
  deleteMyUser?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  deleteUserForAdmin?: Resolver<ResolversTypes["User"], ParentType, ContextType, RequireFields<MutationDeleteUserForAdminArgs, "user_uuid">>;
  requestTransactionApproval?: Resolver<
    ResolversTypes["Transaction"],
    ParentType,
    ContextType,
    RequireFields<MutationRequestTransactionApprovalArgs, "transaction_hash" | "transaction_uuid">
  >;
  updateMyUser?: Resolver<ResolversTypes["User"], ParentType, ContextType, Partial<MutationUpdateMyUserArgs>>;
  updateUserForAdmin?: Resolver<ResolversTypes["User"], ParentType, ContextType, RequireFields<MutationUpdateUserForAdminArgs, "user_uuid">>;
};

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["PositiveFloat"], any> {
  name: "PositiveFloat";
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["PositiveInt"], any> {
  name: "PositiveInt";
}

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]> = {
  getAllMyTransactions?: Resolver<
    Array<ResolversTypes["Transaction"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetAllMyTransactionsArgs, "limit" | "offset">
  >;
  getAllUsers?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType, RequireFields<QueryGetAllUsersArgs, "limit" | "offset">>;
  getMyUser?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  getTransactionByUUID?: Resolver<ResolversTypes["Transaction"], ParentType, ContextType, RequireFields<QueryGetTransactionByUuidArgs, "uuid">>;
  getUserByUUID?: Resolver<ResolversTypes["User"], ParentType, ContextType, RequireFields<QueryGetUserByUuidArgs, "uuid">>;
};

export type TransactionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes["Transaction"] = ResolversParentTypes["Transaction"]> = {
  amount?: Resolver<ResolversTypes["PositiveFloat"], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["TransactionStatus"], ParentType, ContextType>;
  tickets_count?: Resolver<ResolversTypes["PositiveInt"], ParentType, ContextType>;
  transaction_hash?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  transaction_uuid?: Resolver<ResolversTypes["UUID"], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["UUID"], any> {
  name: "UUID";
}

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]> = {
  bio?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>;
  screen_name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tickets_count?: Resolver<ResolversTypes["PositiveInt"], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user_uuid?: Resolver<ResolversTypes["UUID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  ChatGPTInterface?: ChatGptInterfaceResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = GraphQLContext> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
