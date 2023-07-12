import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt"
import { loginSchema } from "../validation/auth";
import {PrismaClient} from "@prisma/client"

let Prisma = new PrismaClient()
export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const result = await Prisma.users.findFirst({
            where: { email:email },
          });

          if (!result) return null
          const isValidPassword = await bcrypt.compareSync(password, result.password);

          if (!isValidPassword) return null

          return { id: result.id, email:result.email };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
      }
   
      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/",
    newUser: "/Register",
  },
  secret: "super-secret",
};
