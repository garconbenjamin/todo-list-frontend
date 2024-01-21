interface User {
  id: number | null;
  name: string | null;
  email: string | null;
  groupId: number | null;
  accessToken: string | null;
}

type CreateUser = Omit<User, "accessToken" | "id" | "groupId"> & {
  password: string;
};

export type { User, CreateUser };
