'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Editor from '@/components/Editor'

interface PostData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
}

export default function WritePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async (data: PostData) => {
    if (!data.title || !data.content) {
      alert('Please provide both title and content')
      return
    }

    setIsPublishing(true)
    try {
      // Here you would typically make an API call to save the post
      console.log('Publishing post:', data)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated delay
      router.push('/blog')
    } catch (error) {
      console.error('Failed to publish:', error)
      alert('Failed to publish post. Please try again.')
    } finally {
      setIsPublishing(false)
    }
  }

  if (!user) {
    router.push('/signin')
    return null
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Create a New Post</h1>
            <p className="text-gray-400">Share your knowledge with the community</p>
          </div>
          {isPublishing ? (
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Publishing...
            </div>
          ) : (
            <button
              onClick={() => document.getElementById('publish-trigger')?.click()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Publish Post
            </button>
          )}
        </div>

        <Editor onSave={handlePublish} />
      </div>
    </main>
  )
} 