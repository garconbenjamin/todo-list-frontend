/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  query getAllTasksByGroup($groupId: Int!) {\n    getAllTasksByGroup(groupId: $groupId) {\n      id\n      title\n      description\n      startTime\n      dueTime\n      creatorId\n      creator{\n        name\n      }\n      groupId\n      parentId\n      createdAt\n      followers{\n        id\n        userId\n      }\n      assignee {\n          id\n          name\n        \n      }\n    }\n  }\n": types.GetAllTasksByGroupDocument,
    "\n  mutation followTask($input: FollowTaskInput!) {\n    followTask(followTaskInput: $input) {\n      id\n    }\n  }\n": types.FollowTaskDocument,
    "\n  mutation unfollowTask($input: FollowTaskInput!) {\n    unfollowTask(unfollowTaskInput: $input) \n  }\n": types.UnfollowTaskDocument,
    "\n  mutation createTask($input: CreateTaskInput!) {\n    createTask(createTaskInput: $input) {\n      id\n    }\n  }\n": types.CreateTaskDocument,
    "\n  mutation updateTask($input: UpdateTaskInput!) {\n    updateTask(updateTaskInput: $input)\n  }\n": types.UpdateTaskDocument,
    "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(createUserInput: $input)\n  }\n": types.CreateUserDocument,
    "\n  query getUsersByGroup($groupId: Int!) {\n    getUsersByGroup(groupId: $groupId) {\n      id\n      name\n      email\n      groupId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetUsersByGroupDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAllTasksByGroup($groupId: Int!) {\n    getAllTasksByGroup(groupId: $groupId) {\n      id\n      title\n      description\n      startTime\n      dueTime\n      creatorId\n      creator{\n        name\n      }\n      groupId\n      parentId\n      createdAt\n      followers{\n        id\n        userId\n      }\n      assignee {\n          id\n          name\n        \n      }\n    }\n  }\n"): (typeof documents)["\n  query getAllTasksByGroup($groupId: Int!) {\n    getAllTasksByGroup(groupId: $groupId) {\n      id\n      title\n      description\n      startTime\n      dueTime\n      creatorId\n      creator{\n        name\n      }\n      groupId\n      parentId\n      createdAt\n      followers{\n        id\n        userId\n      }\n      assignee {\n          id\n          name\n        \n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation followTask($input: FollowTaskInput!) {\n    followTask(followTaskInput: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation followTask($input: FollowTaskInput!) {\n    followTask(followTaskInput: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation unfollowTask($input: FollowTaskInput!) {\n    unfollowTask(unfollowTaskInput: $input) \n  }\n"): (typeof documents)["\n  mutation unfollowTask($input: FollowTaskInput!) {\n    unfollowTask(unfollowTaskInput: $input) \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createTask($input: CreateTaskInput!) {\n    createTask(createTaskInput: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createTask($input: CreateTaskInput!) {\n    createTask(createTaskInput: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateTask($input: UpdateTaskInput!) {\n    updateTask(updateTaskInput: $input)\n  }\n"): (typeof documents)["\n  mutation updateTask($input: UpdateTaskInput!) {\n    updateTask(updateTaskInput: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(createUserInput: $input)\n  }\n"): (typeof documents)["\n  mutation createUser($input: CreateUserInput!) {\n    createUser(createUserInput: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUsersByGroup($groupId: Int!) {\n    getUsersByGroup(groupId: $groupId) {\n      id\n      name\n      email\n      groupId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query getUsersByGroup($groupId: Int!) {\n    getUsersByGroup(groupId: $groupId) {\n      id\n      name\n      email\n      groupId\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;