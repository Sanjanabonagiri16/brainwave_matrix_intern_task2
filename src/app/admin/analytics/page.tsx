'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { motion } from 'framer-motion'

// Mock data - replace with real data from your API
const mockStats = {
  totalViews: 45892,
  totalPosts: 156,
  totalUsers: 2845,
  totalComments: 892,
  viewsGrowth: '+12.5%',
  postsGrowth: '+8.2%',
  usersGrowth: '+15.3%',
  commentsGrowth: '+5.7%',
}

const mockViewsData = [
  { date: 'Mar 1', views: 1200 },
  { date: 'Mar 2', views: 1350 },
  { date: 'Mar 3', views: 1500 },
  { date: 'Mar 4', views: 1250 },
  { date: 'Mar 5', views: 1800 },
  { date: 'Mar 6', views: 2100 },
  { date: 'Mar 7', views: 1950 },
]

const mockTopPosts = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    views: 1234,
    comments: 23,
    engagement: '85%',
  },
  {
    id: '2',
    title: 'Building Modern UIs with Tailwind CSS',
    views: 856,
    comments: 15,
    engagement: '78%',
  },
  {
    id: '3',
    title: 'The Future of Web Development',
    views: 654,
    comments: 12,
    engagement: '72%',
  },
]

const mockUserActivity = [
  {
    id: '1',
    name: 'John Doe',
    action: 'Published a new post',
    time: '2 hours ago',
  },
  {
    id: '2',
    name: 'Jane Smith',
    action: 'Commented on "Getting Started with Next.js"',
    time: '3 hours ago',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    action: 'Updated their profile',
    time: '5 hours ago',
  },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <AdminLayout currentPage="Analytics">
      {/* Time Range Selector */}
      <div className="flex justify-end mb-8">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-[#1e1e1e] border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-green-500">{mockStats.viewsGrowth}</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{mockStats.totalViews.toLocaleString()}</h3>
          <p className="text-gray-400">Total Views</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-green-500">{mockStats.postsGrowth}</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{mockStats.totalPosts.toLocaleString()}</h3>
          <p className="text-gray-400">Total Posts</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-500/20">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-green-500">{mockStats.usersGrowth}</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{mockStats.totalUsers.toLocaleString()}</h3>
          <p className="text-gray-400">Total Users</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-red-500/20">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-green-500">{mockStats.commentsGrowth}</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{mockStats.totalComments.toLocaleString()}</h3>
          <p className="text-gray-400">Total Comments</p>
        </motion.div>
      </div>

      {/* Views Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 mb-8"
      >
        <h2 className="text-xl font-bold mb-6">Views Over Time</h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {mockViewsData.map((data, index) => (
            <div key={data.date} className="flex flex-col items-center gap-2">
              <div
                className="w-12 bg-blue-500/20 rounded-t-lg transition-all duration-500"
                style={{
                  height: `${(data.views / 2100) * 100}%`,
                  transitionDelay: `${index * 100}ms`,
                }}
              />
              <span className="text-xs text-gray-400">{data.date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800"
        >
          <h2 className="text-xl font-bold mb-6">Top Performing Posts</h2>
          <div className="space-y-6">
            {mockTopPosts.map((post) => (
              <div key={post.id} className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium mb-2">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{post.views.toLocaleString()} views</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                  {post.engagement}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800"
        >
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {mockUserActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  {activity.name.charAt(0)}
                </div>
                <div>
                  <p>
                    <span className="font-medium">{activity.name}</span>
                    <span className="text-gray-400 mx-2">{activity.action}</span>
                  </p>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  )
} 