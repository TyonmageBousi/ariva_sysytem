import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const email = credentials?.email
                    const password = credentials?.password

                    if (typeof email !== 'string' || typeof password !== 'string') {
                        console.log('フォームから値は文字列ではありません')
                        return null
                    }

                    const result = await db.select().from(users).where(eq(users.email, email))
                    const user = result[0]

                    if (!user) {
                        return null
                    }

                    const isValid = await bcrypt.compare(password, user.passWord)
                    if (!isValid) {
                        return null
                    }

                    return {
                        id: user.id.toString(),
                        email: user.email,
                        name: user.name
                    }
                } catch (error) {
                    console.error('Auth error:', error)
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }