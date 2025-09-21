import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as any
    
    return {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.name || decoded.email,
      role: decoded.role
    }
  } catch (error) {
    return null
  }
}

export function requireAuth() {
  return async (request: Request) => {
    const user = await getCurrentUser()
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    return user
  }
}

export function requireAdmin() {
  return async (request: Request) => {
    const user = await getCurrentUser()
    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    return user
  }
}
