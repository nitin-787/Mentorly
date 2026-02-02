import { Role } from "@prisma/client";

export interface SignupInput {
  email: string;
  password: string;
  role: Role;
}

export interface LoginInput {
  email: string;
  password:  string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: Role;
  };
  token: string;
}