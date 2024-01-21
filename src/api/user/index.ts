import { isAxiosError } from "axios";

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

export { login, signUp };
