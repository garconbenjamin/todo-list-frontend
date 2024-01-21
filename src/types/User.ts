interface User {
  id: number | null;
  name: string | null;
  email: string | null;
  accessToken: string | null;
}

type CreateUser = Omit<User, "accessToken" | "id"> & { password: string };
export type { User, CreateUser };
