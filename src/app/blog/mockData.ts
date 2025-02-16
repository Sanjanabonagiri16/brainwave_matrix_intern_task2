import { Post } from '@/types'

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14 and Server Components',
    content: 'Detailed guide about Next.js 14 features...',
    excerpt: 'Learn how to leverage the power of Next.js 14 and its revolutionary Server Components to build faster, more efficient web applications.',
    author: {
      id: 'author1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: 'SJ'
    },
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Web Development'],
    status: 'published',
    views: 1250,
    likes: 89,
    comments: 23,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date().toISOString(),
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Building a Real-time Chat Application with WebSockets',
    content: 'Step by step tutorial on WebSocket implementation...',
    excerpt: 'Discover how to create a real-time chat application using WebSockets, React, and Node.js. Complete with code examples and best practices.',
    author: {
      id: 'author2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      avatar: 'MC'
    },
    category: 'Real-time',
    tags: ['WebSocket', 'React', 'Node.js'],
    status: 'published',
    views: 843,
    likes: 56,
    comments: 12,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date().toISOString(),
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Advanced TypeScript Patterns for Enterprise Applications',
    content: 'Deep dive into TypeScript patterns...',
    excerpt: 'Explore advanced TypeScript patterns and techniques used in large-scale enterprise applications. Includes real-world examples and performance tips.',
    author: {
      id: 'author3',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      avatar: 'EW'
    },
    category: 'TypeScript',
    tags: ['TypeScript', 'Enterprise', 'Architecture'],
    status: 'published',
    views: 2100,
    likes: 145,
    comments: 34,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date().toISOString(),
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    title: 'Implementing Dark Mode in Your React Application',
    content: 'Complete guide to dark mode implementation...',
    excerpt: 'Learn how to implement a fully featured dark mode in your React application using Tailwind CSS and Context API. Includes system preference detection.',
    author: {
      id: 'author4',
      name: 'Alex Rivera',
      email: 'alex@example.com',
      avatar: 'AR'
    },
    category: 'UI/UX',
    tags: ['React', 'Tailwind CSS', 'Dark Mode'],
    status: 'published',
    views: 967,
    likes: 78,
    comments: 15,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date().toISOString(),
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    title: 'Optimizing Database Queries in PostgreSQL',
    content: 'Advanced PostgreSQL optimization techniques...',
    excerpt: 'Master the art of database optimization in PostgreSQL. Learn about indexing, query planning, and performance tuning for large-scale applications.',
    author: {
      id: 'author5',
      name: 'David Kim',
      email: 'david@example.com',
      avatar: 'DK'
    },
    category: 'Database',
    tags: ['PostgreSQL', 'Performance', 'Database'],
    status: 'published',
    views: 1567,
    likes: 112,
    comments: 28,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    updatedAt: new Date().toISOString(),
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    title: 'Building Accessible Web Applications',
    content: 'Comprehensive guide to web accessibility...',
    excerpt: 'Discover how to create web applications that are accessible to everyone. Learn about ARIA attributes, keyboard navigation, and screen reader compatibility.',
    author: {
      id: 'author6',
      name: 'Rachel Thompson',
      email: 'rachel@example.com',
      avatar: 'RT'
    },
    category: 'Accessibility',
    tags: ['Accessibility', 'HTML', 'ARIA'],
    status: 'published',
    views: 789,
    likes: 67,
    comments: 19,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    updatedAt: new Date().toISOString(),
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
] 