export type LoginInput = {
  email: string | null;
  password: string | null;
}

export type RegisterInput = {
  name: string | null;
  surname: string | null;
  email: string | null;
  password: string | null;
}

export type User = {
  name: string;
  surname: string;
  token: string;
}