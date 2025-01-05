import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDB } from "@/db/mongo";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        await connectToDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with the provided email");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        // Log user details
        console.log("User authenticated:", {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          role: user.role,
        });

        // Return user object to be used by the JWT callback
        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username || null,
          role: user.role || "user", // Default to "user" if role is undefined
        };
      },
    }),
  ],
  pages: { signIn: "/signin", error: "/signin" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // No type issue; user.id is always a string
        token.email = user.email ?? null; // Ensure null for undefined
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        
        token.username = user.username ?? null; // Ensure null for undefined
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        
        token.role = user.role ?? "user"; 
      }

      console.log("Generated JWT:", token); 
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string, 
        email: token.email ?? null, 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        username: token.username ?? null, 
        role: token.role as string
      };

      return session;
    },
  },
};
