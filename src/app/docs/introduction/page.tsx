'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const features = [
  {
    title: 'Rich Content Creation',
    description: 'Write and format your content with our powerful rich text editor, supporting markdown, code blocks, and media embeds.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  {
    title: 'Community Engagement',
    description: 'Build and engage with your audience through comments, likes, and social sharing features.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    )
  },
  {
    title: 'Analytics & Insights',
    description: 'Track your content performance with detailed analytics on views, engagement, and audience growth.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: 'SEO Optimization',
    description: 'Built-in SEO tools to help your content reach a wider audience through search engines.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  }
]

const quickLinks = [
  { title: 'Getting Started', href: '/docs/getting-started', description: 'Learn the basics and set up your account' },
  { title: 'Writing Guide', href: '/docs/writing-guide', description: 'Tips and best practices for creating content' },
  { title: 'API Reference', href: '/docs/api', description: 'Integrate with our platform using our API' },
  { title: 'Community Guidelines', href: '/docs/community', description: 'Understanding our community standards' }
]

const codeExample = `// Example: Creating a new blog post
const createPost = async (data) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      category: data.category,
      tags: data.tags
    })
  });

  return response.json();
};`

export default function DocsIntroductionPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'quickstart' | 'concepts'>('overview')

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Platform Documentation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Everything you need to know about creating, publishing, and growing your blog on our platform.
          </motion.p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-700 mb-12">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium transition-colors
              ${activeTab === 'overview'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`px-6 py-3 font-medium transition-colors
              ${activeTab === 'quickstart'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
              }`}
          >
            Quick Start
          </button>
          <button
            onClick={() => setActiveTab('concepts')}
            className={`px-6 py-3 font-medium transition-colors
              ${activeTab === 'concepts'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
              }`}
          >
            Key Concepts
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-12">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-gray-800 rounded-xl p-6 flex items-start gap-4"
                  >
                    <div className="bg-blue-500/10 text-blue-400 p-3 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="bg-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                      <p className="text-gray-400">{link.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Start Tab */}
          {activeTab === 'quickstart' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Steps */}
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">1. Create an Account</h3>
                  <p className="text-gray-400 mb-4">
                    Sign up for a new account to get started with our platform. You'll need to provide:
                  </p>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Valid email address</li>
                    <li>Username</li>
                    <li>Secure password</li>
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">2. Set Up Your Profile</h3>
                  <p className="text-gray-400 mb-4">
                    Customize your profile to help readers learn more about you:
                  </p>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Add a profile picture</li>
                    <li>Write your bio</li>
                    <li>Set your interests and expertise</li>
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">3. Create Your First Post</h3>
                  <p className="text-gray-400 mb-4">
                    Start writing and publishing content:
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                    <pre>{codeExample}</pre>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Key Concepts Tab */}
          {activeTab === 'concepts' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Content Structure</h3>
                <p className="text-gray-400">
                  Understanding how content is organized in our platform:
                </p>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-blue-500/10 text-blue-400 p-2 rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Posts</h4>
                      <p className="text-gray-400">The main content type, containing your articles and stories.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-purple-500/10 text-purple-400 p-2 rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Categories & Tags</h4>
                      <p className="text-gray-400">Organize and classify your content for better discoverability.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-green-500/10 text-green-400 p-2 rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Comments & Discussions</h4>
                      <p className="text-gray-400">Engage with readers through threaded comments and discussions.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">User Roles & Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Reader</h4>
                    <ul className="text-gray-400 space-y-1">
                      <li>Read posts</li>
                      <li>Leave comments</li>
                      <li>Follow authors</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Author</h4>
                    <ul className="text-gray-400 space-y-1">
                      <li>Create and edit posts</li>
                      <li>Manage comments</li>
                      <li>View analytics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
} 