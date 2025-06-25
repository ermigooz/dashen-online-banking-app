import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Explicitly set the runtime to nodejs
export const runtime = "nodejs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          // For demo purposes, only allow this hardcoded user
          if (credentials.email === "abebe@gmail.com" && credentials.password === "password123") {
            return {
              id: "user-1",
              email: "abebe@gmail.com",
              name: "Abebe Kebede",
            }
          }

          // If credentials don't match, return null
          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "THIS_IS_A_DEVELOPMENT_SECRET_DO_NOT_USE_IN_PRODUCTION",
  debug: process.env.NODE_ENV === "development",
}
