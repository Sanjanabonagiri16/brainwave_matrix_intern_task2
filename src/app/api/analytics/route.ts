import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock analytics data - in a real app, this would come from a database
const analyticsData = {
  stats: [
    {
      label: 'Total Users',
      value: '2,845',
      change: '+12.5%',
      trend: 'up',
    },
    {
      label: 'Total Posts',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
    },
    {
      label: 'Comments',
      value: '8,921',
      change: '-3.1%',
      trend: 'down',
    },
    {
      label: 'Active Users',
      value: '452',
      change: '+4.3%',
      trend: 'up',
    },
  ],
  viewsData: [
    { date: '2024-03-01', views: 1200 },
    { date: '2024-03-02', views: 1500 },
    { date: '2024-03-03', views: 1100 },
    { date: '2024-03-04', views: 1800 },
    { date: '2024-03-05', views: 2100 },
    { date: '2024-03-06', views: 1900 },
    { date: '2024-03-07', views: 2300 },
  ],
  topPosts: [
    {
      id: '1',
      title: 'Getting Started with Next.js',
      views: 1234,
      likes: 89,
      comments: 23,
    },
    {
      id: '2',
      title: 'The Future of Web Development',
      views: 987,
      likes: 76,
      comments: 15,
    },
    {
      id: '3',
      title: 'Building Modern UIs with Tailwind CSS',
      views: 856,
      likes: 67,
      comments: 19,
    },
  ],
  recentActivity: [
    {
      id: '1',
      type: 'comment',
      user: 'Jane Smith',
      action: 'commented on',
      target: 'Getting Started with Next.js',
      timestamp: '2024-03-20T10:30:00Z',
    },
    {
      id: '2',
      type: 'post',
      user: 'John Doe',
      action: 'published',
      target: 'The Future of Web Development',
      timestamp: '2024-03-20T09:15:00Z',
    },
    {
      id: '3',
      type: 'like',
      user: 'Bob Johnson',
      action: 'liked',
      target: 'Building Modern UIs with Tailwind CSS',
      timestamp: '2024-03-20T08:45:00Z',
    },
  ],
}

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const timeRange = url.searchParams.get('timeRange') || '7d'

  // In a real app, we would filter data based on the timeRange
  // For now, we'll return the mock data
  return NextResponse.json(analyticsData)
} 