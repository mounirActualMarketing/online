import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// Force fresh Vercel deployment - removed conflicting App Router version
export default NextAuth(authOptions)
