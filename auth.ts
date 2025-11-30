// auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const email = credentials?.email as string
                const password = credentials?.password as string

                if (!email || !password) return null

                const result = await db.select().from(users).where(eq(users.email, email))
                const user = result[0]

                if (!user) return null

                const isValid = await bcrypt.compare(password, user.password)
                if (!isValid) return null

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) token.id = user.id
            return token
        },
        session({ session, token }) {
            if (session.user) session.user.id = token.id as string
            return session
        },
    },
})