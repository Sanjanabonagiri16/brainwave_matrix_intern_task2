import 'next-auth'
import { User } from '@/types'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      avatar?: string
      role: 'admin' | 'user'
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: 'admin' | 'user'
  }
} 