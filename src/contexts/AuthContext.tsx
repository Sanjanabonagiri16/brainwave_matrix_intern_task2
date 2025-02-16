'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
}

interface SignUpData {
  name: string
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>
  sendVerificationEmail: () => Promise<void>
  isEmailVerified: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // Check cookie first, then fallback to storage
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`
          const parts = value.split(`; ${name}=`)
          if (parts.length === 2) return parts.pop()?.split(';').shift()
          return null
        }

        const userCookie = getCookie('user')
        const storedUser = userCookie || localStorage.getItem('user') || sessionStorage.getItem('user')
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          setIsEmailVerified(true)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setLoading(true)
      
      // Check for predefined admin credentials
      if (email === 'admin@blog.com' && password === 'admin123') {
        const adminUser: User = {
          id: '1',
          name: 'Admin',
          email: email,
          avatar: 'AD',
          role: 'admin'
        }
        
        // Set both cookie and storage
        document.cookie = `user=${JSON.stringify(adminUser)}; path=/`
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(adminUser))
        } else {
          sessionStorage.setItem('user', JSON.stringify(adminUser))
        }
        
        setUser(adminUser)
        setIsEmailVerified(true)
        router.push('/admin')
        return
      }

      // For regular users
      const regularUser: User = {
        id: String(Date.now()),
        name: 'User',
        email: email,
        avatar: 'U',
        role: 'user'
      }
      
      // Set both cookie and storage
      document.cookie = `user=${JSON.stringify(regularUser)}; path=/`
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(regularUser))
      } else {
        sessionStorage.setItem('user', JSON.stringify(regularUser))
      }
      
      setUser(regularUser)
      setIsEmailVerified(true)
      router.push('/dashboard')
    } catch (error) {
      console.error('Sign in failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (data: SignUpData) => {
    try {
      setLoading(true)
      // Here you would typically make an API call to create the account
      // For demo purposes, we'll simulate a successful registration
      const mockUser: User = {
        id: '1',
        name: data.name,
        email: data.email,
        avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        role: 'user' as const
      }
      
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      setIsEmailVerified(false)
      router.push('/dashboard')
    } catch (error) {
      console.error('Sign up failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      // Clear both cookie and storage
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      localStorage.removeItem('user')
      sessionStorage.removeItem('user')
      setUser(null)
      setIsEmailVerified(false)
      router.push('/')
    } catch (error) {
      console.error('Sign out failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setLoading(true)
      // Here you would typically make an API call to initiate password reset
      // For demo purposes, we'll simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Password reset email sent to:', email)
    } catch (error) {
      console.error('Password reset failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setLoading(true)
      // Here you would typically make an API call to update the password
      // For demo purposes, we'll simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Password updated successfully')
    } catch (error) {
      console.error('Password update failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const sendVerificationEmail = async () => {
    try {
      setLoading(true)
      // Here you would typically make an API call to send verification email
      // For demo purposes, we'll simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Verification email sent to:', user?.email)
    } catch (error) {
      console.error('Failed to send verification email:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        signIn, 
        signUp, 
        signOut, 
        resetPassword, 
        updatePassword, 
        sendVerificationEmail,
        isEmailVerified
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 