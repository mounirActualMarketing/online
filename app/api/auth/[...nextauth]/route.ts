import NextAuth from 'next-auth'
import { authOptions } from './authOptions'

console.log('🚀 NextAuth route handler loaded')

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
