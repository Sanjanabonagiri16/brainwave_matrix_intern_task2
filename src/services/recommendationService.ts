import { Post, User } from '@/types'

interface RecommendationFilters {
  userId?: string
  category?: string
  tags?: string[]
  limit?: number
  excludeIds?: string[]
}

interface TrendingPost extends Post {
  trendingScore: number
  engagement: {
    views: number
    likes: number
    comments: number
    shares: number
  }
}

class RecommendationService {
  private baseUrl = '/api/recommendations'

  async getPersonalizedPosts(filters: RecommendationFilters = {}): Promise<Post[]> {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key + '[]', v))
        } else {
          queryParams.append(key, String(value))
        }
      }
    })

    const response = await fetch(`${this.baseUrl}/posts?${queryParams.toString()}`)
    if (!response.ok) {
      throw new Error('Failed to fetch personalized posts')
    }

    return response.json()
  }

  async getTrendingPosts(timeRange: 'day' | 'week' | 'month' = 'week', limit: number = 5): Promise<TrendingPost[]> {
    const response = await fetch(`${this.baseUrl}/trending?timeRange=${timeRange}&limit=${limit}`)
    if (!response.ok) {
      throw new Error('Failed to fetch trending posts')
    }

    return response.json()
  }

  async getSimilarPosts(postId: string, limit: number = 3): Promise<Post[]> {
    const response = await fetch(`${this.baseUrl}/similar/${postId}?limit=${limit}`)
    if (!response.ok) {
      throw new Error('Failed to fetch similar posts')
    }

    return response.json()
  }

  async getRecommendedAuthors(limit: number = 5): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/authors?limit=${limit}`)
    if (!response.ok) {
      throw new Error('Failed to fetch recommended authors')
    }

    return response.json()
  }

  async getPopularCategories(limit: number = 5): Promise<Array<{
    name: string
    postCount: number
    engagement: number
  }>> {
    const response = await fetch(`${this.baseUrl}/categories?limit=${limit}`)
    if (!response.ok) {
      throw new Error('Failed to fetch popular categories')
    }

    return response.json()
  }

  async getPopularTags(limit: number = 10): Promise<Array<{
    name: string
    postCount: number
    engagement: number
  }>> {
    const response = await fetch(`${this.baseUrl}/tags?limit=${limit}`)
    if (!response.ok) {
      throw new Error('Failed to fetch popular tags')
    }

    return response.json()
  }

  async getUserInterests(userId: string): Promise<{
    categories: string[]
    tags: string[]
    authors: string[]
  }> {
    const response = await fetch(`${this.baseUrl}/interests/${userId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user interests')
    }

    return response.json()
  }

  async updateUserInterests(userId: string, data: {
    categories?: string[]
    tags?: string[]
    authors?: string[]
  }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/interests/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to update user interests')
    }
  }
}

export const recommendationService = new RecommendationService() 