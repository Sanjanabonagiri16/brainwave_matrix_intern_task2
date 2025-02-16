import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  joinedDate: string
  lastLogin: string
}

interface Post {
  id: string
  title: string
  content: string
  author: string
  category: string
  status: string
  publishDate: string
  views: number
  comments: number
}

interface Comment {
  id: string
  postId: string
  author: string
  content: string
  createdAt: string
  likes: number
}

interface Settings {
  general: {
    siteName: string
    siteDescription: string
  }
}

interface ExportData {
  users: User[]
  posts: Post[]
  comments: Comment[]
  settings: Settings
}

// GET /api/export - Export data
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get('type') as keyof ExportData | 'all' || 'all'

    // In a real app, this would fetch data from the database
    const data: ExportData = {
      users: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          status: 'Active',
          joinedDate: '2024-01-15',
          lastLogin: '2024-03-20',
        },
      ],
      posts: [
        {
          id: '1',
          title: 'Getting Started with Next.js',
          content: 'Next.js is a powerful React framework...',
          author: 'John Doe',
          category: 'Development',
          status: 'Published',
          publishDate: '2024-03-15',
          views: 1234,
          comments: 23,
        },
      ],
      comments: [
        {
          id: '1',
          postId: '1',
          author: 'Jane Smith',
          content: 'Great article!',
          createdAt: '2024-03-20T10:30:00Z',
          likes: 5,
        },
      ],
      settings: {
        general: {
          siteName: 'BlogApp',
          siteDescription: 'Share Your Stories',
        },
      },
    }

    // Filter data based on type
    const exportData = type === 'all' ? data : { [type]: data[type] }

    // Generate filename
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `export-${type}-${timestamp}.json`

    // Return data as downloadable JSON file
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    )
  }
} 