'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Editor from '@/components/Editor'

// This would typically come from your backend
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    content: `
      <h2>Introduction</h2>
      <p>Next.js 14 introduces groundbreaking features that revolutionize how we build web applications...</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Server Components</li>
        <li>Improved Routing</li>
        <li>Enhanced Performance</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To begin with Next.js 14, first ensure you have Node.js installed...</p>
    `,
    category: "Development",
    tags: ["Next.js", "React", "Web Development"],
    author: {
      id: "1",
      name: "John Doe"
    }
  }
]

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/signin')
      return
    }

    // Fetch post data
    const fetchPost = async () => {
      try {
        // In a real app, this would be an API call
        const foundPost = blogPosts.find(p => p.id === parseInt(params.id))
        
        if (!foundPost) {
          router.push('/blog')
          return
        }

        // Check if user is the author
        if (foundPost.author.id !== user.id) {
          router.push('/blog')
          return
        }

        setPost(foundPost)
      } catch (error) {
        console.error('Failed to fetch post:', error)
        router.push('/blog')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.id, router, user])

  const handleUpdate = async (data: {
    title: string;
    content: string;
    category: string;
    tags: string[];
    coverImage?: string;
  }) => {
    try {
      // In a real app, this would be an API call to update the post
      console.log('Updating post:', data)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated delay
      router.push(`/blog/${params.id}`)
    } catch (error) {
      console.error('Failed to update post:', error)
      alert('Failed to update post. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-800 rounded w-1/4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Edit Post</h1>
            <p className="text-gray-400">Make changes to your post</p>
          </div>
        </div>

        <Editor
          initialContent={post.content}
          initialTitle={post.title}
          initialCategory={post.category}
          initialTags={post.tags}
          onSave={handleUpdate}
          isEditing={true}
        />
      </div>
    </main>
  )
} 