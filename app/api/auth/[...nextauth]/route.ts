import NextAuth from 'next-auth'
import { authOptions } from './authOptions'

console.log('🚀 NextAuth route handler loaded - v2.0')

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
