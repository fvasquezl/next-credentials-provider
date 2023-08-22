import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter your password",
        },
      },
      async authorize(credentials) {
        //check if the email and password is valid
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }

        const passwordMatch = bcrypt.compareSync(
          credentials.password,
          user.password!
        );
        if (!passwordMatch) {
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      console.log("jwt callback", { token, user, session });
      if (trigger == "update" && session?.name) {
        token.name = session.name;
      }
      //pass in user id and address to token
      if (user) {
        return {
          ...token,
          id: user.id,
          address: user.address,
          name: token.name,
        };
      }
      //update user in database
      const newUser = await prisma.user.update({
        where: {
          id: token.id?.toString(),
        },
        data: {
          name: token.name,
        },
      });
      console.log("newUser", newUser);
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });
      //pass in user id and address to session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          address: token.address,
        },
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
