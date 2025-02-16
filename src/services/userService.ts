import { User } from '@/types'

interface UserFilters {
  page?: number
  limit?: number
  role?: 'admin' | 'user'
  search?: string
}

interface UserResponse {
  users: User[]
  pagination: {
    currentPage: number
    totalPages: number
    totalUsers: number
    hasMore: boolean
  }
}

interface UpdateProfileData {
  name?: string
  avatar?: string
  email?: string
  currentPassword?: string
  newPassword?: string
}

class UserService {
  private baseUrl = '/api/users'

  async getUsers(filters: UserFilters = {}): Promise<UserResponse> {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value))
      }
    })

    const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`)
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }

    return response.json()
  }

  async getUserProfile(userId: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${userId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user profile')
    }

    return response.json()
  }

  async updateProfile(userId: string, data: UpdateProfileData): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to update profile')
    }

    return response.json()
  }

  async deleteUser(userId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${userId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete user')
    }
  }

  async changeRole(userId: string, role: 'admin' | 'user'): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    })

    if (!response.ok) {
      throw new Error('Failed to change user role')
    }

    return response.json()
  }

  async getUserStats(userId: string): Promise<{
    posts: number
    comments: number
    likes: number
  }> {
    const response = await fetch(`${this.baseUrl}/${userId}/stats`)
    if (!response.ok) {
      throw new Error('Failed to fetch user stats')
    }

    return response.json()
  }

  async getUserActivity(userId: string, page: number = 1): Promise<{
    activities: Array<{
      type: 'post' | 'comment' | 'like'
      target: string
      createdAt: string
    }>
    hasMore: boolean
  }> {
    const response = await fetch(`${this.baseUrl}/${userId}/activity?page=${page}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user activity')
    }

    return response.json()
  }
}

export const userService = new UserService() 