import NextAuth from 'next-auth'
import { authOptions } from './authOptions'

console.log('🚀 NextAuth route handler loaded - v3.0')

// Create the handler
const handler = NextAuth(authOptions)

// Export with explicit runtime configuration
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export { handler as GET, handler as POST }
