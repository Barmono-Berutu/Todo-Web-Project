import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./lib/zod";
import { compareSync } from "bcrypt-ts";

type UserWithRole = {
  role?: string;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validateFields = SignInSchema.safeParse(credentials);
        if (!validateFields.success) return null;

        const { email, password } = validateFields.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const passwordMatch = compareSync(password, user.password);
        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const publicRoutes = ["/login", "/register", "/"];

      if (publicRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/todos", nextUrl));
        }
        return true;
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },

    jwt({ token, user }) {
      if (user) {
        const { role } = user as UserWithRole;
        token.role = role ?? "user";
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.sub!;
      session.user.role = token.role ?? "user";
      return session;
    },
  },
});
