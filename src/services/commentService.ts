import { prisma } from '@/lib/prisma'
import { sanitizeInput } from '@/middleware/security'
import { notifyPostClients } from '@/app/api/comments/[postId]/sse/route'
import { sendEmail, emailTemplates } from './emailService'
import { Comment } from '@/types'

export interface CreateCommentInput {
  content: string
  postId: string
  authorId: string
  parentId?: string
}

export interface UpdateCommentInput {
  content: string
}

export async function createComment(input: CreateCommentInput) {
  try {
    // Sanitize content
    const content = sanitizeInput(input.content)

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content,
        post: {
          connect: { id: input.postId }
        },
        author: {
          connect: { id: input.authorId }
        },
        ...(input.parentId && {
          parent: {
            connect: { id: input.parentId }
          }
        })
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        post: {
          select: {
            title: true,
            author: {
              select: {
                email: true
              }
            }
          }
        }
      }
    })

    // Notify clients about new comment
    notifyPostClients(input.postId, {
      type: 'new',
      comment
    })

    // Send email notification to post author
    if (comment.post.author.email) {
      const emailTemplate = emailTemplates.newComment(
        comment.post.title,
        comment.content,
        `/blog/${input.postId}#comment-${comment.id}`
      )

      await sendEmail({
        to: comment.post.author.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html
      })
    }

    return comment
  } catch (error) {
    console.error('Error creating comment:', error)
    throw error
  }
}

export async function updateComment(commentId: string, input: UpdateCommentInput) {
  try {
    const content = sanitizeInput(input.content)

    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    // Notify clients about updated comment
    const postId = comment.postId
    notifyPostClients(postId, {
      type: 'update',
      comment
    })

    return comment
  } catch (error) {
    console.error('Error updating comment:', error)
    throw error
  }
}

export async function deleteComment(commentId: string) {
  try {
    const comment = await prisma.comment.delete({
      where: { id: commentId },
      include: {
        replies: true
      }
    })

    // Notify clients about deleted comment
    notifyPostClients(comment.postId, {
      type: 'delete',
      commentId
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting comment:', error)
    throw error
  }
}

export async function getComments(params: {
  postId: string
  page?: number
  limit?: number
  parentId?: string | null
}) {
  try {
    const {
      postId,
      page = 1,
      limit = 10,
      parentId
    } = params

    // Build where clause
    const where = {
      postId,
      parentId: parentId ?? null // If parentId is undefined, get top-level comments
    }

    // Get total count
    const total = await prisma.comment.count({ where })

    // Get comments
    const comments = await prisma.comment.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        },
        _count: {
          select: {
            likes: true,
            replies: true
          }
        }
      }
    })

    return {
      comments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalComments: total,
        hasMore: page * limit < total
      }
    }
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

export async function toggleCommentLike(commentId: string, userId: string) {
  try {
    // Check if like exists
    const existingLike = await prisma.like.findFirst({
      where: {
        commentId,
        userId
      }
    })

    if (existingLike) {
      // Remove like
      await prisma.like.delete({
        where: { id: existingLike.id }
      })
    } else {
      // Add like
      await prisma.like.create({
        data: {
          comment: {
            connect: { id: commentId }
          },
          user: {
            connect: { id: userId }
          }
        }
      })
    }

    // Get updated comment with like count
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        _count: {
          select: {
            likes: true
          }
        }
      }
    })

    return {
      success: true,
      liked: !existingLike,
      likeCount: comment?._count.likes ?? 0
    }
  } catch (error) {
    console.error('Error toggling comment like:', error)
    throw error
  }
}

interface CommentFilters {
  page?: number
  limit?: number
  postId?: string
  authorId?: string
  parentId?: string
  sort?: 'newest' | 'oldest' | 'likes'
}

interface CommentResponse {
  comments: Comment[]
  pagination: {
    currentPage: number
    totalPages: number
    totalComments: number
    hasMore: boolean
  }
}

class CommentService {
  private baseUrl = '/api/comments'

  async getComments(filters: CommentFilters = {}): Promise<CommentResponse> {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value))
      }
    })

    const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`)
    if (!response.ok) {
      throw new Error('Failed to fetch comments')
    }

    return response.json()
  }

  async getCommentById(id: string): Promise<Comment> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch comment')
    }

    return response.json()
  }

  async createComment(data: {
    postId: string
    content: string
    parentId?: string
  }): Promise<Comment> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to create comment')
    }

    return response.json()
  }

  async updateComment(id: string, content: string): Promise<Comment> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })

    if (!response.ok) {
      throw new Error('Failed to update comment')
    }

    return response.json()
  }

  async deleteComment(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete comment')
    }
  }

  async likeComment(id: string): Promise<{ likes: number }> {
    const response = await fetch(`${this.baseUrl}/${id}/like`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to like comment')
    }

    return response.json()
  }

  async unlikeComment(id: string): Promise<{ likes: number }> {
    const response = await fetch(`${this.baseUrl}/${id}/unlike`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to unlike comment')
    }

    return response.json()
  }

  async getReplies(commentId: string, page: number = 1): Promise<CommentResponse> {
    const response = await fetch(`${this.baseUrl}/${commentId}/replies?page=${page}`)
    if (!response.ok) {
      throw new Error('Failed to fetch replies')
    }

    return response.json()
  }

  async reportComment(id: string, reason: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason }),
    })

    if (!response.ok) {
      throw new Error('Failed to report comment')
    }
  }
}

export const commentService = new CommentService() 