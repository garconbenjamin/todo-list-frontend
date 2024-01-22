import { useLazyQuery, useQuery } from "@apollo/client";
import { isAxiosError } from "axios";

import { useAppSelector } from "@/redux/hooks";

import { getUserByEmailGQL, getUsersByGroupGQL } from "./gql";
import { axiosClient } from "../client";
import { User, CreateUser } from "../types/user";

const login = ({ email, password }: { email: string; password: string }) => {
  return axiosClient.post<User>("/auth/login", { email, password });
};

const signUp = async (user: CreateUser) => {
  try {
    return await axiosClient.post("/user/signup", user);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw error;
    }
  }
};

const useGroupUsers = () => {
  const user = useAppSelector((state) => state.user);

  const groupUsers = useQuery(getUsersByGroupGQL, {
    variables: { groupId: user.groupId! },
    fetchPolicy: "cache-first",
  });
  return groupUsers;
};

const useUserByEmail = (email: string) => {
  const user = useAppSelector((state) => state.user);
  const [getUser, { called, loading, data }] = useLazyQuery(getUserByEmailGQL, {
    context: {
      Headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    },
    variables: { email: email },
  });

  return { getUser, called, loading, data };
};

export { login, signUp, useGroupUsers, useUserByEmail };
