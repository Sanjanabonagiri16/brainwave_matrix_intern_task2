import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BlogPage from '../page'

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        posts: [
          {
            id: '1',
            title: 'Test Post',
            excerpt: 'Test excerpt',
            author: { name: 'Test Author', avatar: 'TA' },
            category: 'Test Category',
            publishedAt: '2024-03-15T10:00:00Z',
            readTime: '5 min read',
            likes: 10,
            comments: 5,
          },
        ],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalPosts: 1,
          hasMore: false,
        },
      }),
  })
)

describe('BlogPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders blog page with title and description', () => {
    render(<BlogPage />)
    
    expect(screen.getByText('Blog Posts')).toBeInTheDocument()
    expect(screen.getByText('Discover amazing stories from our community')).toBeInTheDocument()
  })

  it('displays loading skeletons while fetching posts', () => {
    render(<BlogPage />)
    
    const skeletons = screen.getAllByTestId('post-skeleton')
    expect(skeletons).toHaveLength(6)
  })

  it('renders posts after loading', async () => {
    render(<BlogPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument()
      expect(screen.getByText('Test Author')).toBeInTheDocument()
      expect(screen.getByText('Test Category')).toBeInTheDocument()
    })
  })

  it('handles post click navigation', async () => {
    const { container } = render(<BlogPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument()
    })

    const postCard = container.querySelector('.cursor-pointer')
    fireEvent.click(postCard)

    // Verify router.push was called with correct path
    expect(mockRouter.push).toHaveBeenCalledWith('/blog/1')
  })

  it('displays no posts message when no results found', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            posts: [],
            pagination: {
              currentPage: 1,
              totalPages: 0,
              totalPosts: 0,
              hasMore: false,
            },
          }),
      })
    )

    render(<BlogPage />)
    
    await waitFor(() => {
      expect(screen.getByText('No posts found')).toBeInTheDocument()
      expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument()
    })
  })
}) 