import { NextRequest, NextResponse } from 'next/server'
import { mockPosts, Post } from '../route'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Find the post by ID
    const post = mockPosts.find((p: Post) => p.id === params.id)

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Failed to fetch post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
} 