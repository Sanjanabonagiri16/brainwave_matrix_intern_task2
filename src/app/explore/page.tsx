'use client'

import { useState } from 'react'
import Link from 'next/link'

// Sample data (in a real app, this would come from your backend)
const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt: "Learn how to build modern web applications with Next.js 14 and its powerful features...",
    category: "Development",
    author: {
      name: "John Doe",
      avatar: "JD",
      role: "Senior Developer"
    },
    publishedAt: "2024-03-15",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Web Development"],
    stats: {
      views: "2.3K",
      likes: "156",
      comments: "23"
    }
  },
  {
    id: 2,
    title: "UI/UX Design Principles",
    excerpt: "A comprehensive guide to creating user-friendly interfaces and delightful experiences...",
    category: "Design",
    author: {
      name: "Sarah Lee",
      avatar: "SL",
      role: "UX Designer"
    },
    publishedAt: "2024-03-14",
    readTime: "6 min read",
    tags: ["UI/UX", "Design", "User Experience"],
    stats: {
      views: "1.8K",
      likes: "142",
      comments: "18"
    }
  }
]

const categories = [
  {
    id: 'development',
    title: 'Development',
    description: 'Tutorials and guides about web development, programming languages, and best practices.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    iconBgColor: 'bg-blue-900/30',
    iconColor: 'text-blue-500'
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Resources and articles about UI/UX design, visual design, and design systems.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    iconBgColor: 'bg-purple-900/30',
    iconColor: 'text-purple-500'
  }
]

const PostCard = ({ post }: { post: typeof posts[0] }) => (
  <article className="bg-[#1e1e1e] rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {post.author.avatar}
          </div>
          <div>
            <h3 className="font-medium text-white">{post.author.name}</h3>
            <p className="text-sm text-gray-400">{post.author.role}</p>
          </div>
        </div>
        <span className="text-sm text-gray-400">{post.readTime}</span>
      </div>

      <Link href={`/blog/${post.id}`}>
        <h2 className="text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
      </Link>

      <p className="text-gray-300 mb-4">{post.excerpt}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-gray-400 pt-4 border-t border-gray-800">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{post.stats.likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{post.stats.comments}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{post.stats.views}</span>
        </div>
      </div>
    </div>
  </article>
)

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = !selectedCategory || post.category.toLowerCase() === selectedCategory.toLowerCase()
    
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Explore Content</h1>
          <p className="text-xl text-gray-400 mb-8">
            Discover amazing articles, tutorials, and stories from our community
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white px-12 py-4 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
              <svg
                className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`bg-[#1e1e1e] rounded-xl p-6 hover:bg-[#252525] transition-all duration-300 text-left ${
                selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`${category.iconBgColor} p-3 rounded-lg`}>
                  <div className={category.iconColor}>
                    {category.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory ? `${selectedCategory} Posts` : 'All Posts'}
            </h2>
            <span className="text-gray-400">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-400 mb-4">No posts found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 