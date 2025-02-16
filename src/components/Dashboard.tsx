'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const StatCard = ({
  icon,
  value,
  label,
  iconColor,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconColor: string;
}) => (
  <motion.div 
    className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors"
    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)" }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center justify-between mb-4">
      <motion.div 
        className={`${iconColor} p-3 rounded-lg`}
        whileHover={{ rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        {icon}
      </motion.div>
    </div>
    <motion.div 
      className="text-3xl font-bold mb-1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      {value}
    </motion.div>
    <div className="text-gray-400">{label}</div>
  </motion.div>
)

const recentPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    status: "Published",
    views: "1.2K",
    publishedAt: "2 days ago",
  }
  // Add more posts here as needed
]

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()

  const handleNewPost = () => {
    router.push('/write')
  }

  const handleViewProfile = () => {
    router.push(`/profile/${user?.id}`)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* User Profile Section */}
        <motion.div 
          className="flex items-center justify-between mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-center gap-6">
            <motion.div 
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user?.avatar || user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </motion.div>
            <div>
              <motion.h1 
                className="text-3xl font-bold mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome back, {user?.name}
              </motion.h1>
              <p className="text-gray-400">Manage your content and analytics</p>
            </div>
          </div>
          <div className="flex gap-4">
            <motion.button 
              onClick={handleNewPost}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              New Post
            </motion.button>
            <motion.button 
              onClick={handleViewProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Profile
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            value="156"
            label="Total Posts"
            iconColor="text-blue-500"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
            value="23.8K"
            label="Total Views"
            iconColor="text-purple-500"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            }
            value="892"
            label="Comments"
            iconColor="text-green-500"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
            value="3.4K"
            label="Likes"
            iconColor="text-red-500"
          />
        </div>

        {/* Recent Posts Section */}
        <motion.div 
          className="bg-[#1e1e1e] rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Posts</h2>
            <motion.a 
              href="/posts" 
              className="text-blue-500 hover:text-blue-400 transition"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              View All
            </motion.a>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 mb-4 text-gray-400 border-b border-gray-800 pb-4">
            <div>Title</div>
            <div>Status</div>
            <div>Views</div>
            <div className="flex justify-between">
              <span>Published</span>
              <span>Actions</span>
            </div>
          </div>

          {/* Table Content */}
          {recentPosts.map((post, index) => (
            <motion.div 
              key={post.id} 
              className="grid grid-cols-4 gap-4 py-4 items-center hover:bg-gray-800/50 rounded-lg transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-3">
                <motion.svg 
                  className="w-5 h-5 text-blue-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </motion.svg>
                <span className="font-medium">{post.title}</span>
              </div>
              <div>
                <motion.span 
                  className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  {post.status}
                </motion.span>
              </div>
              <div>{post.views}</div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{post.publishedAt}</span>
                <motion.button 
                  className="text-gray-400 hover:text-white p-1"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
} 