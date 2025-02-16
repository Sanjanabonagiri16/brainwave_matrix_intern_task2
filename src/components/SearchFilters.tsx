'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const categories = ['All', 'Technology', 'Design', 'Development', 'Tutorial']
const sortOptions = ['Most Recent', 'Most Popular', 'Most Commented', 'Most Liked']
const dateRanges = ['All Time', 'Today', 'This Week', 'This Month', 'This Year']

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize state from URL parameters
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'Most Recent')
  const [dateRange, setDateRange] = useState(searchParams.get('date') || 'All Time')
  const [author, setAuthor] = useState(searchParams.get('author') || 'All Authors')
  const [authors, setAuthors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load authors list
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('/api/authors')
        const data = await response.json()
        setAuthors(data)
      } catch (error) {
        console.error('Failed to fetch authors:', error)
        setAuthors([])
      }
    }
    fetchAuthors()
  }, [])

  // Update URL with filters
  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Update params with new values
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'All' && value !== 'All Authors' && value !== 'All Time' && value !== 'Most Recent') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    // Update URL
    router.push(`/blog?${params.toString()}`)
  }

  // Handle search input with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ q: search })
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  // Handle category change
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    updateFilters({ category: newCategory })
  }

  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value
    setSortBy(newSort)
    updateFilters({ sort: newSort })
  }

  // Handle date range change
  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDateRange = event.target.value
    setDateRange(newDateRange)
    updateFilters({ date: newDateRange })
  }

  // Handle author change
  const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAuthor = event.target.value
    setAuthor(newAuthor)
    updateFilters({ author: newAuthor })
  }

  return (
    <div className="w-full space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles, topics, or authors..."
          className="w-full bg-gray-900 text-white px-12 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={
              category === cat
                ? 'bg-blue-600 text-white px-4 py-2 rounded-lg transition'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-lg transition'
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={handleDateRangeChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {dateRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Author
          </label>
          <select
            value={author}
            onChange={handleAuthorChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="All Authors">All Authors</option>
            {authors.map((authorName) => (
              <option key={authorName} value={authorName}>
                {authorName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
} 