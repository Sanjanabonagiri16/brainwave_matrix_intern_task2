'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import SearchFilters from '@/components/SearchFilters'
import { motion, AnimatePresence } from 'framer-motion'
import { mockPosts } from './mockData'
import { Post } from '@/types'

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalPosts: number
  hasMore: boolean
}

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: Math.ceil(mockPosts.length / POSTS_PER_PAGE),
    totalPosts: mockPosts.length,
    hasMore: mockPosts.length > POSTS_PER_PAGE
  })
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchPosts = async (page: number) => {
    try {
      setError(null)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const category = searchParams.get('category')
      const search = searchParams.get('search')?.toLowerCase()
      const tag = searchParams.get('tag')?.toLowerCase()
      
      let filteredPosts = [...mockPosts]

      // Apply filters
      if (category) {
        filteredPosts = filteredPosts.filter(post => 
          post.category.toLowerCase() === category.toLowerCase()
        )
      }
      if (search) {
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(search) ||
          post.excerpt.toLowerCase().includes(search) ||
          post.content.toLowerCase().includes(search) ||
          post.author.name.toLowerCase().includes(search)
        )
      }
      if (tag) {
        filteredPosts = filteredPosts.filter(post => 
          post.tags.some(t => t.toLowerCase().includes(tag))
        )
      }

      // Sort posts by date
      filteredPosts.sort((a, b) => 
        new Date(b.publishedAt || b.createdAt).getTime() - 
        new Date(a.publishedAt || a.createdAt).getTime()
      )

      // Calculate pagination
      const start = (page - 1) * POSTS_PER_PAGE
      const end = start + POSTS_PER_PAGE
      const paginatedPosts = filteredPosts.slice(start, end)

      if (page === 1) {
        setPosts(paginatedPosts)
      } else {
        setPosts(prev => [...prev, ...paginatedPosts])
      }
      
      setPagination({
        currentPage: page,
        totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
        totalPosts: filteredPosts.length,
        hasMore: filteredPosts.length > end
      })
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError('Something went wrong. Please try again.')
    }
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPosts(currentPosts => 
        currentPosts.map(post => {
          if (Math.random() < 0.3) { // 30% chance to update each post
            const likesIncrease = Math.floor(Math.random() * 3)
            const commentsIncrease = Math.floor(Math.random() * 2)
            
            return {
              ...post,
              likes: post.likes + likesIncrease,
              comments: post.comments + commentsIncrease,
              ...(likesIncrease > 0 && {
                updatedAt: new Date().toISOString()
              })
            }
          }
          return post
        })
      )
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Initial fetch
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

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
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
            ) : posts && posts.length > 0 ? (
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
                      <p className="text-xs text-gray-400">{formatDate(post.publishedAt || post.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                    <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                      {post.category}
                    </span>
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-700/50 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                    <span className="mx-2">•</span>
                    <motion.span
                      key={`likes-${post.likes}`}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      {post.likes} likes
                    </motion.span>
                    <span>•</span>
                    <motion.span
                      key={`comments-${post.comments}`}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      {post.comments} comments
                    </motion.span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {!isLoading && !error && posts && posts.length > 0 && pagination.hasMore && (
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
      </div>
    </main>
  )
} 