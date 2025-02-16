'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const featuredPosts = [
  {
    id: 1,
    title: "Modern JavaScript Fundamentals",
    description: "Master the essential concepts of modern JavaScript development...",
    author: {
      name: "Sarah Johnson",
      avatar: "SJ",
      timeAgo: "2 hours ago"
    },
    stats: {
      likes: "1.2k",
      comments: "856"
    },
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "UI/UX Design Principles",
    description: "Learn the fundamental principles of creating user-friendly interfaces...",
    author: {
      name: "Mike Chen",
      avatar: "MC",
      timeAgo: "5 hours ago"
    },
    stats: {
      likes: "943",
      comments: "621"
    },
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Backend Development Guide",
    description: "A comprehensive guide to building scalable backend systems...",
    author: {
      name: "Alex Turner",
      avatar: "AT",
      timeAgo: "1 day ago"
    },
    stats: {
      likes: "1.5k",
      comments: "928"
    },
    readTime: "12 min read"
  }
]

const categories = ['All', 'Technology', 'Design', 'Development', 'Tutorial']
const sortOptions = ['Most Recent', 'Most Popular', 'Most Commented', 'Oldest']
const dateRanges = ['All Time', 'Today', 'This Week', 'This Month', 'This Year']
const authors = ['All Authors', 'John Doe', 'Alice Smith', 'Mike Johnson', 'Emma Wilson']

const categoryCards = [
  {
    id: 'technology',
    title: 'Technology',
    description: 'Latest in tech, programming, and software development',
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    postCount: '2.5k posts'
  },
  {
    id: 'design',
    title: 'Design',
    description: 'UI/UX design, graphics, and creative processes',
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    postCount: '1.8k posts'
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Web development, coding tutorials, and best practices',
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    postCount: '3.2k posts'
  }
]

const CategoryButton = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
    }`}
  >
    {label}
  </button>
)

const FilterDropdown = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-gray-400 text-sm">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
)

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Most Recent')
  const [dateRange, setDateRange] = useState('All Time')
  const [selectedAuthor, setSelectedAuthor] = useState('All Authors')
  const [email, setEmail] = useState('')
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [joinStatus, setJoinStatus] = useState<'idle' | 'joining' | 'joined'>('idle')
  const router = useRouter()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setErrorMessage('Please enter your email address')
      return
    }
    
    setSubscriptionStatus('submitting')
    setErrorMessage('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address')
      }
      
      setSubscriptionStatus('success')
      setEmail('')
    } catch (error) {
      setSubscriptionStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const handleJoinCommunity = async () => {
    setJoinStatus('joining')
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setJoinStatus('joined')
      
      // Reset status after 2 seconds and redirect to signup
      setTimeout(() => {
        setJoinStatus('idle')
        router.push('/signup')
      }, 2000)
    } catch (error) {
      setJoinStatus('idle')
    }
  }

  return (
    <>
      <main className="min-h-screen bg-[#1a1a1a] text-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <h1 className="text-6xl font-bold mb-6">
            Create, Share, <span className="text-blue-500">Connect</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Join our vibrant community of writers and readers. Share your stories, engage
            with amazing content, and connect with like-minded individuals.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={handleJoinCommunity}
              disabled={joinStatus !== 'idle'}
              className={`relative px-8 py-3 rounded-lg transition flex items-center gap-2 ${
                joinStatus === 'joined' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {joinStatus === 'joining' ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Joining...
                </>
              ) : joinStatus === 'joined' ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Joined Successfully!
                </>
              ) : (
                <>
                  Join Our Community
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
            <Link 
              href="/write" 
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Start Writing
            </Link>
            <Link 
              href="/blog" 
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Explore Posts
            </Link>
          </div>

          {/* Stats Section */}
          <div className="flex flex-wrap gap-16 mt-20">
            <div>
              <h2 className="text-4xl font-bold">10K+</h2>
              <p className="text-gray-400">Writers</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">50K+</h2>
              <p className="text-gray-400">Articles</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">100K+</h2>
              <p className="text-gray-400">Readers</p>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Posts</h2>
            <p className="text-gray-400">Discover trending articles from our community</p>
          </div>

          {/* Featured Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      {post.author.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium">{post.author.name}</h3>
                      <p className="text-sm text-gray-400">{post.author.timeAgo}</p>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 hover:text-blue-400 transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-gray-300 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-gray-400">
                  <div className="flex items-center gap-4">
                    <span>{post.stats.likes} likes</span>
                    <span>{post.stats.comments} comments</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </article>
            ))}
          </div>

          {/* View More Posts Button */}
          <div className="text-center">
            <Link
              href="/blog"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2"
            >
              View More Posts
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Explore Categories Section */}
        <section className="container mx-auto px-4 py-16 border-t border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore Categories</h2>
            <p className="text-gray-400">Discover content across various topics and interests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCards.map((category) => (
              <Link 
                href={`/categories/${category.id}`}
                key={category.id}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-gray-700">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 flex items-center justify-between">
                      {category.title}
                      <span className="text-sm font-normal text-gray-400">{category.postCount}</span>
                    </h3>
                  </div>
                </div>
                <p className="text-gray-400">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container mx-auto px-4 py-20 border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">Stay Updated with Our Newsletter</h2>
            <p className="text-xl text-gray-400 mb-12">
              Get the latest articles, tutorials, and community updates delivered directly to your inbox
            </p>

            <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full bg-gray-800 text-white px-6 py-4 rounded-xl border ${
                      errorMessage ? 'border-red-500' : 'border-gray-700'
                    } focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300`}
                    disabled={subscriptionStatus === 'submitting' || subscriptionStatus === 'success'}
                  />
                  {errorMessage && (
                    <p className="absolute -bottom-6 left-0 text-sm text-red-500">{errorMessage}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={subscriptionStatus === 'submitting' || subscriptionStatus === 'success'}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    subscriptionStatus === 'success'
                      ? 'bg-green-600 hover:bg-green-700'
                      : subscriptionStatus === 'submitting'
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {subscriptionStatus === 'submitting' ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Subscribing...
                    </div>
                  ) : subscriptionStatus === 'success' ? (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Subscribed!
                    </div>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold mb-2 text-white">10K+</div>
                <div className="text-gray-400">Subscribers</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2 text-white">Weekly</div>
                <div className="text-gray-400">Updates</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2 text-white">Free</div>
                <div className="text-gray-400">Forever</div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-8">
              By subscribing, you agree to our{' '}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                Terms of Service
              </Link>
            </p>
          </div>
        </section>
    </main>
    </>
  )
} 