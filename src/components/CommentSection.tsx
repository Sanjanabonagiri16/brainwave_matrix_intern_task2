'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

interface Comment {
  id: string
  postId: string
  content: string
  author: {
    name: string
    avatar: string
  }
  createdAt: string
  likes: number
  replies: Comment[]
  parentId?: string
}

interface CommentSectionProps {
  postId: string
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const eventSourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    // Set up SSE connection
    const eventSource = new EventSource(`/api/comments/${postId}/sse`)
    eventSourceRef.current = eventSource

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      switch (data.type) {
        case 'initial':
          setComments(data.comments)
          break
        case 'new':
          if (data.comment.parentId) {
            setComments(prevComments => 
              prevComments.map(comment => 
                comment.id === data.comment.parentId
                  ? { ...comment, replies: [data.comment, ...comment.replies] }
                  : comment
              )
            )
          } else {
            setComments(prevComments => [data.comment, ...prevComments])
          }
          break
        case 'delete':
          setComments(prevComments => 
            prevComments.filter(comment => 
              comment.id !== data.commentId &&
              comment.replies.every(reply => reply.id !== data.commentId)
            )
          )
          break
      }
    }

    return () => {
      eventSource.close()
    }
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content: newComment,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to post comment')
      }

      setNewComment('')
    } catch (error) {
      console.error('Error posting comment:', error)
      alert('Failed to post comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReply = async (commentId: string) => {
    if (!user || !replyContent) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content: replyContent,
          parentId: commentId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to post reply')
      }

      setReplyTo(null)
      setReplyContent('')
    } catch (error) {
      console.error('Error posting reply:', error)
      alert('Failed to post reply. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (commentId: string) => {
    if (!user) return

    try {
      const response = await fetch(`/api/comments?id=${commentId}&postId=${postId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete comment')
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      alert('Failed to delete comment. Please try again.')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffMinutes = Math.ceil(diffTime / (1000 * 60))
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Comments</h2>

      {/* New Comment Form */}
      {user && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full h-24 px-4 py-2 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}

      {/* Comments List */}
      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 rounded-lg p-6 space-y-4"
          >
            {/* Comment Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {comment.author.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{comment.author.name}</h3>
                  <p className="text-sm text-gray-400">{formatDate(comment.createdAt)}</p>
                </div>
              </div>
              {user?.name === comment.author.name && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  Delete
                </button>
              )}
            </div>

            {/* Comment Content */}
            <p className="text-gray-300">{comment.content}</p>

            {/* Comment Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                className="text-gray-400 hover:text-white transition"
              >
                Reply
              </button>
            </div>

            {/* Reply Form */}
            {replyTo === comment.id && (
              <div className="pl-12 space-y-4">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full h-20 px-4 py-2 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReply(comment.id)}
                    disabled={isSubmitting || !replyContent.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Reply'}
                  </button>
                  <button
                    onClick={() => {
                      setReplyTo(null)
                      setReplyContent('')
                    }}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="pl-12 space-y-4">
                {comment.replies.map((reply) => (
                  <motion.div
                    key={reply.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-700 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          {reply.author.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold">{reply.author.name}</h4>
                          <p className="text-sm text-gray-400">{formatDate(reply.createdAt)}</p>
                        </div>
                      </div>
                      {user?.name === reply.author.name && (
                        <button
                          onClick={() => handleDelete(reply.id)}
                          className="text-red-500 hover:text-red-400 transition"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <p className="text-gray-300">{reply.content}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 