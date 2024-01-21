import { gql } from "@/__generated__/gql";

const getAllTasksByGroupGQL = gql(`
  query getAllTasksByGroup($groupId: Int!) {
    getAllTasksByGroup(groupId: $groupId) {
      id
      title
      description
      startTime
      dueTime
      creatorId
      creator{
        name
      }
      groupId
      parentId
      createdAt
      followers{
        id
        userId
      }
      assignee {
          id
          name
        
      }
    }
  }
`);

const followTaskGQL = gql(`
  mutation followTask($input: FollowTaskInput!) {
    followTask(followTaskInput: $input) {
      id
    }
  }
`);
const unflollowTaskGQL = gql(`
  mutation unfollowTask($input: FollowTaskInput!) {
    unfollowTask(unfollowTaskInput: $input) 
  }
`);
const createTaskGQL = gql(`
  mutation createTask($input: CreateTaskInput!) {
    createTask(createTaskInput: $input) {
      id
    }
  }
`);

const updateTaskGQL = gql(`
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(updateTaskInput: $input)
  }
`);

export {
  updateTaskGQL,
  createTaskGQL,
  getAllTasksByGroupGQL,
  followTaskGQL,
  unflollowTaskGQL,
};
