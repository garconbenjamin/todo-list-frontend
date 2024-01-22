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
        id
        name
      }
      groupId
      parentId
      createdAt
      description
      follower{
        id
        name
      }
      status
      assignee {
          id
          name
      }
    }
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

const getTaskLogsGQL = gql(`
  query getTaskLogs($taskId: Int!) {
    taskLogs(taskId: $taskId) {
      id
      taskId
      user{
        name
        email
      }
      status
      action
      createdAt
    }
  }
`);

export { updateTaskGQL, createTaskGQL, getAllTasksByGroupGQL, getTaskLogsGQL };
