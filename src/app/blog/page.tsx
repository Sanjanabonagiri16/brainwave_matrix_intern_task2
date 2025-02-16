'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import SearchFilters from '@/components/SearchFilters'
import { motion, AnimatePresence } from 'framer-motion'

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  category: string
  publishedAt: string
  readTime: string
  likes: number
  comments: number
  excerpt: string
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalPosts: number
  hasMore: boolean
}

export default function BlogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    hasMore: false
  })
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchPosts = async (page: number) => {
    try {
      // Construct the query string from search params
      const queryParams = new URLSearchParams(searchParams.toString())
      queryParams.set('page', page.toString())
      queryParams.set('limit', '6') // Show 6 posts per page

      const response = await fetch(`/api/posts?${queryParams.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch posts')
      
      const data = await response.json()
      
      if (page === 1) {
        setPosts(data.posts)
      } else {
        setPosts(prev => [...prev, ...data.posts])
      }
      
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  // Set up SSE connection
  useEffect(() => {
    const eventSource = new EventSource('/api/posts/sse')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)

      switch (data.type) {
        case 'initial':
          setPosts(data.posts)
          setIsLoading(false)
          break

        case 'new':
          setPosts(prevPosts => [data.post, ...prevPosts])
          setPagination(prev => ({
            ...prev,
            totalPosts: prev.totalPosts + 1,
            totalPages: Math.ceil((prev.totalPosts + 1) / 10),
            hasMore: true
          }))
          break

        case 'delete':
          setPosts(prevPosts => prevPosts.filter(post => !data.ids.includes(post.id)))
          setPagination(prev => {
            const newTotal = prev.totalPosts - data.ids.length
            return {
              ...prev,
              totalPosts: newTotal,
              totalPages: Math.ceil(newTotal / 10),
              hasMore: newTotal > prev.currentPage * 10
            }
          })
          break
      }
    }

    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    fetchPosts(1).finally(() => setIsLoading(false))
  }, [searchParams]) // Re-fetch when filters change

  const handleLoadMore = async () => {
    if (isLoadingMore || !pagination.hasMore) return
    
    setIsLoadingMore(true)
    await fetchPosts(pagination.currentPage + 1)
    setIsLoadingMore(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const handlePostClick = (postId: string) => {
    router.push(`/blog/${postId}`)
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
          <p className="text-gray-400">Discover amazing stories from our community</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <SearchFilters />
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 rounded-xl p-6 animate-pulse"
                  data-testid="post-skeleton"
                >
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                    <div>
                      <div className="h-3 bg-gray-700 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              posts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handlePostClick(post.id)}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition group cursor-pointer"
                  data-testid="post-card"
                >
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">{post.title}</h2>
                  <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">
                      {post.author.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
                      <p className="text-xs text-gray-400">{formatDate(post.publishedAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.likes} likes</span>
                    <span>•</span>
                    <span>{post.comments} comments</span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {!isLoading && pagination.hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? 'Loading...' : 'View More Posts'}
            </button>
          </div>
        )}

        {/* No Posts Message */}
        {!isLoading && posts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </main>
  )
} 