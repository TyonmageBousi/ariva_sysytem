import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'password', type: 'password' },
            },

            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('invalid credentials')
                    }
                    const result = await db.select().from(users).where(eq(users.email, credentials.email))
                    const user = result[0];
                    if (!user) {
                        return null;
                    }
                    const isValid = await bcrypt.compare(credentials.password, user.passWord)
                    if (!isValid) throw new Error('invalid credentials')

                    return {
                        id: user.id.toString(),
                        email: user.email,
                        name: user.name
                    }
                } catch (error) {
                    console.error('Auth error:', error);
                    return null; // エラー時はnullを返す
                }
            }
        })
    ],

    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,

}















