import  { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Extended session types to include user id and role.
   */
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
  /**
   * Extended user types to include role.
   */
  interface User extends DefaultUser {
    id: string;
    role: string;
  }
}
