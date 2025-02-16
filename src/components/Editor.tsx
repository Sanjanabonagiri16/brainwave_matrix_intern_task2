'use client'

import { useState, useEffect, useRef } from 'react'
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import type { Editor as TinyMCEEditorType } from 'tinymce'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

// Add type for MDEditor props
interface MDEditorProps {
  value: string
  onChange: (value?: string) => void
  height?: number
  preview?: 'live' | 'edit' | 'preview'
  className?: string
}

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic<MDEditorProps>(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

interface EditorProps {
  initialContent?: string
  onSave?: (data: {
    title: string;
    content: string;
    category: string;
    tags: string[];
    coverImage?: string;
  }) => void;
  initialTitle?: string;
  initialCategory?: string;
  initialTags?: string[];
  isEditing?: boolean;
}

const categories = [
  'Development',
  'Design',
  'Technology',
  'Tutorial',
  'Career',
  'Productivity'
]

const FeatureCard = ({
  icon,
  title,
  description,
  iconBgColor,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
}) => (
  <div className="bg-gray-800 rounded-xl p-6">
    <div className="flex items-center gap-4 mb-4">
      <div className={`${iconBgColor} p-3 rounded-lg`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </div>
)

const ToolbarButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
    {icon}
    <span>{label}</span>
  </button>
)

const ToolbarDivider = () => (
  <div className="w-px h-6 bg-gray-700 mx-2" />
)

const PostPreview = ({ 
  title, 
  content, 
  category, 
  tags, 
  coverImage 
}: { 
  title: string; 
  content: string; 
  category: string; 
  tags: string[]; 
  coverImage?: string; 
}) => (
  <div className="bg-gray-800 rounded-xl p-6">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {coverImage && (
      <img 
        src={coverImage} 
        alt={title} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
    )}
    <div className="flex items-center gap-2 mb-4">
      <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">
        {category}
      </span>
      {tags.map((tag) => (
        <span 
          key={tag}
          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
    <div 
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
)

export default function Editor({ 
  initialContent = '', 
  initialTitle = '',
  initialCategory = '',
  initialTags = [],
  onSave,
  isEditing = false
}: EditorProps) {
  const router = useRouter()
  const { user } = useAuth()
  const editorRef = useRef<TinyMCEEditorType | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [title, setTitle] = useState(initialTitle)
  const [showPreview, setShowPreview] = useState(false)
  const [category, setCategory] = useState(initialCategory)
  const [tags, setTags] = useState<string[]>(initialTags)
  const [newTag, setNewTag] = useState('')
  const [coverImage, setCoverImage] = useState<string>()
  const [isUploading, setIsUploading] = useState(false)
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>()
  const [content, setContent] = useState(initialContent)
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/signin')
    }
  }, [user, router])

  const handleEditorChange = () => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      handleSave()
    }, 3000)
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would upload to a CDN/storage service
      // For demo, we'll use a local URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!title || !content || !category) {
      alert('Please fill in all required fields')
      return
    }

    setIsSaving(true)
    try {
      if (onSave) {
        await onSave({
          title,
          content,
          category,
          tags,
          coverImage
        })
      }
      setLastSaved(new Date())
    } catch (error) {
      console.error('Failed to save:', error)
      alert('Failed to save post. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!title || !content || !category) {
      alert('Please fill in all required fields')
      return
    }

    setIsPublishing(true)

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          category,
          tags
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to publish post')
      }

      const newPost = await response.json()

      // Show success message
      const successMessage = document.createElement('div')
      successMessage.className = 'fixed bottom-4 right-4 bg-success-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in'
      successMessage.textContent = 'Post published successfully!'
      document.body.appendChild(successMessage)

      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.classList.add('animate-fade-out')
        setTimeout(() => {
          document.body.removeChild(successMessage)
        }, 300)
      }, 3000)

      // Reset form
      setTitle('')
      setContent('')
      setCategory('')
      setTags([])
      setCoverImage(undefined)

      // Redirect to the new post
      router.push(`/blog/${newPost.id}`)
    } catch (error) {
      console.error('Error publishing post:', error)

      // Show error message
      const errorMessage = document.createElement('div')
      errorMessage.className = 'fixed bottom-4 right-4 bg-error-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in'
      errorMessage.textContent = error instanceof Error ? error.message : 'Failed to publish post'
      document.body.appendChild(errorMessage)

      // Remove error message after 3 seconds
      setTimeout(() => {
        errorMessage.classList.add('animate-fade-out')
        setTimeout(() => {
          document.body.removeChild(errorMessage)
        }, 300)
      }, 3000)
    } finally {
      setIsPublishing(false)
    }
  }

  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Editor Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
          title="Live Preview"
          description="See how your post looks in real-time as you write"
          iconBgColor="bg-blue-900/30"
        />
        <FeatureCard
          icon={
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          }
          title="Auto-save"
          description="Your work is automatically saved as you type"
          iconBgColor="bg-purple-900/30"
        />
        <FeatureCard
          icon={
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          title="Rich Formatting"
          description="Format your content with a powerful rich text editor"
          iconBgColor="bg-green-900/30"
        />
      </div>

      {/* Main Editor */}
      <div className="bg-gray-800 rounded-xl p-6">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your post title..."
          className="w-full bg-transparent text-3xl font-bold mb-6 border-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg px-4 py-2"
        />

        {/* Category and Tags */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add tags..."
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Tag
            </button>
          </div>
        </div>

        {/* Tags Display */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Cover Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Cover Image
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="cover-image"
            />
            <label
              htmlFor="cover-image"
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition cursor-pointer"
            >
              Choose File
            </label>
            {coverImage && (
              <img
                src={coverImage}
                alt="Cover preview"
                className="h-20 w-20 object-cover rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Editor Toolbar */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          <ToolbarButton
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            }
            label="Save Draft"
          />
          <ToolbarDivider />
          <ToolbarButton
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
            label="Preview"
          />
        </div>

        {/* Markdown Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content
          </label>
          <div data-color-mode="dark">
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || '')}
              height={400}
              preview="edit"
              className="bg-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Preview Mode */}
      {showPreview && (
        <PostPreview
          title={title}
          content={editorRef.current?.getContent() || ''}
          category={category}
          tags={tags}
          coverImage={coverImage}
        />
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPublishing ? 'Publishing...' : 'Publish Post'}
        </button>
      </div>
    </div>
  )
} 