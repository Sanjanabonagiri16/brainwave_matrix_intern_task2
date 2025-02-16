import { Post } from '@/types'

interface PostFilters {
  page?: number
  limit?: number
  category?: string
  tag?: string
  authorId?: string
  search?: string
  published?: boolean
}

interface PostResponse {
  posts: Post[]
  pagination: {
    currentPage: number
    totalPages: number
    totalPosts: number
    hasMore: boolean
  }
}

class PostService {
  private baseUrl = '/api/posts'

  async getPosts(filters: PostFilters = {}): Promise<PostResponse> {
    const queryParams = new URLSearchParams()
    
    // Add filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value))
      }
    })

    const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`)
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    return response.json()
  }

  async getPostById(id: string): Promise<Post> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch post')
    }

    return response.json()
  }

  async createPost(data: Partial<Post>): Promise<Post> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to create post')
    }

    return response.json()
  }

  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to update post')
    }

    return response.json()
  }

  async deletePost(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete post')
    }
  }

  async likePost(id: string): Promise<{ likes: number }> {
    const response = await fetch(`${this.baseUrl}/${id}/like`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to like post')
    }

    return response.json()
  }

  async unlikePost(id: string): Promise<{ likes: number }> {
    const response = await fetch(`${this.baseUrl}/${id}/unlike`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to unlike post')
    }

    return response.json()
  }

  async getPostStats(id: string): Promise<{
    views: number
    likes: number
    comments: number
  }> {
    const response = await fetch(`${this.baseUrl}/${id}/stats`)
    if (!response.ok) {
      throw new Error('Failed to fetch post stats')
    }

    return response.json()
  }
}

export const postService = new PostService() 