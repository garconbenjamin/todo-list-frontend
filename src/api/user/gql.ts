import { gql } from "@/__generated__/gql";

const createUserGQL = gql(`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input)
  }
`);

const getUsersByGroupGQL = gql(/* GraphQL */ `
  query getUsersByGroup($groupId: Int!) {
    getUsersByGroup(groupId: $groupId) {
      id
      name
      email
      groupId
      createdAt
      updatedAt
    }
  }
`);

const getUserByEmailGQL = gql(/* GraphQL */ `
  query user($email: String!) {
    user(email: $email) {
      id
      name
      email
      groupId
      createdAt
      updatedAt
    }
  }
`);

export { getUsersByGroupGQL, createUserGQL, getUserByEmailGQL };
