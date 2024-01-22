/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTaskInput = {
  creatorId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  dueTime?: InputMaybe<Scalars['String']['input']>;
  groupId: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['Float']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  createUser: Scalars['String']['output'];
  removeTask: Task;
  updateTask: Scalars['String']['output'];
};


export type MutationCreateTaskArgs = {
  createTaskInput: CreateTaskInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateTaskArgs = {
  updateTaskInput: UpdateTaskInput;
};

export type Query = {
  __typename?: 'Query';
  getAllTasksByGroup: Array<Task>;
  getUsersByGroup: Array<User>;
  task: Task;
  taskLogs: Array<TaskLog>;
  user: User;
};


export type QueryGetAllTasksByGroupArgs = {
  groupId: Scalars['Int']['input'];
};


export type QueryGetUsersByGroupArgs = {
  groupId: Scalars['Int']['input'];
};


export type QueryTaskArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTaskLogsArgs = {
  taskId: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  email: Scalars['String']['input'];
};

export type Task = {
  __typename?: 'Task';
  assignee?: Maybe<User>;
  assigneeId?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueTime?: Maybe<Scalars['String']['output']>;
  follower?: Maybe<User>;
  followerId?: Maybe<Scalars['Float']['output']>;
  groupId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parentId?: Maybe<Scalars['Float']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['Float']['output']>;
};

export type TaskLog = {
  __typename?: 'TaskLog';
  action?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  taskId?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type UpdateTaskInput = {
  assigneeId?: InputMaybe<Scalars['Float']['input']>;
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueTime?: InputMaybe<Scalars['String']['input']>;
  followerId?: InputMaybe<Scalars['Float']['input']>;
  groupId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['Float']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  groupId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type GetAllTasksByGroupQueryVariables = Exact<{
  groupId: Scalars['Int']['input'];
}>;


export type GetAllTasksByGroupQuery = { __typename?: 'Query', getAllTasksByGroup: Array<{ __typename?: 'Task', id?: number | null, title?: string | null, description?: string | null, startTime?: string | null, dueTime?: string | null, creatorId?: number | null, groupId?: number | null, parentId?: number | null, createdAt?: string | null, status?: number | null, creator?: { __typename?: 'User', id: number, name: string } | null, follower?: { __typename?: 'User', id: number, name: string } | null, assignee?: { __typename?: 'User', id: number, name: string } | null }> };

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id?: number | null } };

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: string };

export type GetTaskLogsQueryVariables = Exact<{
  taskId: Scalars['Int']['input'];
}>;


export type GetTaskLogsQuery = { __typename?: 'Query', taskLogs: Array<{ __typename?: 'TaskLog', id?: number | null, taskId?: number | null, status?: string | null, action?: string | null, createdAt?: string | null, user?: { __typename?: 'User', name: string, email: string } | null }> };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: string };

export type GetUsersByGroupQueryVariables = Exact<{
  groupId: Scalars['Int']['input'];
}>;


export type GetUsersByGroupQuery = { __typename?: 'Query', getUsersByGroup: Array<{ __typename?: 'User', id: number, name: string, email: string, groupId: number, createdAt: string, updatedAt: string }> };

export type UserQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, name: string, email: string, groupId: number, createdAt: string, updatedAt: string } };


export const GetAllTasksByGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllTasksByGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTasksByGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"dueTime"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTasksByGroupQuery, GetAllTasksByGroupQueryVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTaskInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateTaskInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const GetTaskLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTaskLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetTaskLogsQuery, GetTaskLogsQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetUsersByGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsersByGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsersByGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUsersByGroupQuery, GetUsersByGroupQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;