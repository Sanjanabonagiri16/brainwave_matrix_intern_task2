'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { postService } from '@/services/postService'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
)

interface EditorForm {
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  status: 'draft' | 'published'
}

const categories = [
  'General',
  'Technology',
  'Programming',
  'Web Development',
  'Design',
  'Business',
  'Lifestyle',
  'Other'
]

export default function Editor() {
  const router = useRouter()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<EditorForm>({
    title: '',
    content: '',
    excerpt: '',
    category: 'General',
    tags: [],
    status: 'draft'
  })
  const [tagInput, setTagInput] = useState('')
  const [isDirty, setIsDirty] = useState(false)

  // Auto-save functionality
  useEffect(() => {
    if (!isDirty) return

    const saveTimeout = setTimeout(async () => {
      await handleAutoSave()
    }, 3000) // Auto-save after 3 seconds of no changes

    return () => clearTimeout(saveTimeout)
  }, [form, isDirty])

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  // Check authentication
  useEffect(() => {
    if (!user) {
      router.push('/signin?redirect=/editor')
    }
  }, [user, router])

  const handleAutoSave = async () => {
    if (!isDirty) return

    setIsSaving(true)
    try {
      // Save as draft
      await postService.createPost({
        ...form,
        status: 'draft'
      })
      setLastSaved(new Date())
      setIsDirty(false)
    } catch (error) {
      console.error('Error auto-saving:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.content) return

    setIsSubmitting(true)
    setError(null)
    try {
      const newPost = await postService.createPost({
        ...form,
        status: 'published'
      })

      // Show success message
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)

      // Reset form
      setForm({
        title: '',
        content: '',
        excerpt: '',
        category: 'General',
        tags: [],
        status: 'draft'
      })
      setIsDirty(false)

      // Redirect to the new post
      router.push(`/blog/${newPost.id}`)
    } catch (error) {
      console.error('Error submitting post:', error)
      setError('Failed to publish post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormChange = (field: keyof EditorForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setIsDirty(true)
    setError(null)
  }

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      const newTag = tagInput.trim()
      if (!form.tags.includes(newTag)) {
        handleFormChange('tags', [...form.tags, newTag])
        setTagInput('')
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleFormChange('tags', form.tags.filter(tag => tag !== tagToRemove))
  }

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to upload image')
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error('Error uploading image:', error)
      setError('Failed to upload image. Please try again.')
      return ''
    }
  }, [])

  const editorOptions = {
    spellChecker: false,
    autofocus: true,
    placeholder: 'Write your post content here...',
    status: false,
    toolbar: [
      'bold', 'italic', 'heading', '|',
      'quote', 'unordered-list', 'ordered-list', '|',
      'link', 'image', '|',
      'preview', 'side-by-side', 'fullscreen', '|',
      'guide'
    ] as const,
    uploadImage: true,
    imageUploadFunction: handleImageUpload,
    imageMaxSize: 5 * 1024 * 1024, // 5MB
    imageAccept: 'image/png, image/jpeg, image/gif, image/webp',
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Create New Post</h1>
          <p className="text-gray-400">Share your thoughts with the community</p>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500"
            >
              Post published successfully!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={form.title}
              onChange={e => handleFormChange('title', e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter post title"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <div className="prose prose-invert max-w-none">
              <SimpleMDE
                value={form.content}
                onChange={value => handleFormChange('content', value)}
                options={editorOptions}
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={form.excerpt}
              onChange={e => handleFormChange('excerpt', e.target.value)}
              className="w-full h-24 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Write a brief excerpt for your post..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              value={form.category}
              onChange={e => handleFormChange('category', e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              <AnimatePresence>
                {form.tags.map(tag => (
                  <motion.span
                    key={tag}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-300"
                    >
                      ×
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagInput}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type a tag and press Enter..."
            />
          </div>

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="flex items-center gap-4">
              <select
                value={form.status}
                onChange={e => handleFormChange('status', e.target.value)}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              {isSaving && (
                <span className="text-sm text-gray-400">Saving...</span>
              )}
              {lastSaved && (
                <span className="text-sm text-gray-400">
                  Last saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => router.push('/blog')}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !form.title || !form.content}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 