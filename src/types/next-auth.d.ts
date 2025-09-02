// src/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      username: string | null;
      role: string;
    };
  }
  interface JWT {
    id: string;
    email: string | null;
    username: string | null;
    role: string;
  }
}
