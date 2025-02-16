export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  author: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  category: string
  tags: string[]
  status: 'draft' | 'published'
  views: number
  likes: number
  comments: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface Comment {
  id: string
  postId: string
  content: string
  author: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  parentId?: string
  likes: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  postCount: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  postCount: number
}

export interface Settings {
  general: {
    siteName: string
    siteDescription: string
    language: string
    timezone: string
  }
  appearance: {
    theme: 'light' | 'dark'
    primaryColor: string
    fontFamily: string
    enableAnimations: boolean
  }
  content: {
    postsPerPage: number
    excerptLength: number
    enableComments: boolean
    moderateComments: boolean
  }
  email: {
    notifyOnComments: boolean
    notifyOnMentions: boolean
    digestFrequency: 'daily' | 'weekly' | 'never'
    emailTemplate: string
  }
  social: {
    twitter?: string
    facebook?: string
    linkedin?: string
    github?: string
  }
} 