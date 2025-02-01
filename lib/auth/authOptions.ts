import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as yup from "yup";
import { emailValidator } from "@/lib/validation";
import { Session } from "next-auth";

// Validation schema for login
const LoginSchema = yup.object().shape({
  email: emailValidator,
  password: yup.string().min(1).required(),
});

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("salmamamamamm");
        // Validate credentials
        let validatedData;
        try {
          validatedData = await LoginSchema.validate(credentials);
        } catch (err) {
          console.log("error in validating login data ", err);
        }
        console.log("login validated data ", validatedData);

        if (!validatedData) return null;

        const { email, password } = validatedData;

        // Find user by phone
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return null;

        if (!user.password) return null;

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (token) {
        session.user.id = token.id as number;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};

// Type augmentation for session
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      role: string;
    };
  }
}
