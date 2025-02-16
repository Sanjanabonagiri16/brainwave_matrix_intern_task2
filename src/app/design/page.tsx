'use client'

import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import ThemeToggle from '@/components/ThemeToggle'

export default function DesignSystem() {
  const [email, setEmail] = useState('')
  const { theme } = useTheme()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-12">Design System</h1>

      {/* Colors */}
      <section className="mb-16">
        <h2 className="mb-6">Colors</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Primary Colors */}
          <div>
            <h3 className="text-lg mb-4">Primary</h3>
            <div className="space-y-2">
              <div className="h-12 bg-primary-50 rounded-lg"></div>
              <div className="h-12 bg-primary-100 rounded-lg"></div>
              <div className="h-12 bg-primary-200 rounded-lg"></div>
              <div className="h-12 bg-primary-300 rounded-lg"></div>
              <div className="h-12 bg-primary-400 rounded-lg"></div>
              <div className="h-12 bg-primary-500 rounded-lg"></div>
              <div className="h-12 bg-primary-600 rounded-lg"></div>
              <div className="h-12 bg-primary-700 rounded-lg"></div>
              <div className="h-12 bg-primary-800 rounded-lg"></div>
              <div className="h-12 bg-primary-900 rounded-lg"></div>
            </div>
          </div>

          {/* Secondary Colors */}
          <div>
            <h3 className="text-lg mb-4">Secondary</h3>
            <div className="space-y-2">
              <div className="h-12 bg-secondary-50 rounded-lg"></div>
              <div className="h-12 bg-secondary-100 rounded-lg"></div>
              <div className="h-12 bg-secondary-200 rounded-lg"></div>
              <div className="h-12 bg-secondary-300 rounded-lg"></div>
              <div className="h-12 bg-secondary-400 rounded-lg"></div>
              <div className="h-12 bg-secondary-500 rounded-lg"></div>
              <div className="h-12 bg-secondary-600 rounded-lg"></div>
              <div className="h-12 bg-secondary-700 rounded-lg"></div>
              <div className="h-12 bg-secondary-800 rounded-lg"></div>
              <div className="h-12 bg-secondary-900 rounded-lg"></div>
            </div>
          </div>

          {/* Gray Colors */}
          <div>
            <h3 className="text-lg mb-4">Gray</h3>
            <div className="space-y-2">
              <div className="h-12 bg-gray-50 rounded-lg"></div>
              <div className="h-12 bg-gray-100 rounded-lg"></div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
              <div className="h-12 bg-gray-300 rounded-lg"></div>
              <div className="h-12 bg-gray-400 rounded-lg"></div>
              <div className="h-12 bg-gray-500 rounded-lg"></div>
              <div className="h-12 bg-gray-600 rounded-lg"></div>
              <div className="h-12 bg-gray-700 rounded-lg"></div>
              <div className="h-12 bg-gray-800 rounded-lg"></div>
              <div className="h-12 bg-gray-900 rounded-lg"></div>
            </div>
          </div>

          {/* Status Colors */}
          <div>
            <h3 className="text-lg mb-4">Status</h3>
            <div className="space-y-4">
              <div className="h-12 bg-success-500 rounded-lg"></div>
              <div className="h-12 bg-error-500 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="mb-6">Typography</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg mb-2">Headings (Playfair Display)</h3>
            <div className="space-y-4">
              <h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <h4>Heading 4</h4>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-2">Body (Inter)</h3>
            <p className="mb-4">
              Regular paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm">
              Small text. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>

          <div>
            <h3 className="text-lg mb-2">Code (Fira Code)</h3>
            <code>const example = "Hello, World!";</code>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-16">
        <h2 className="mb-6">Buttons</h2>
        
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">Primary Button</button>
          <button className="btn-secondary">Secondary Button</button>
          <button className="btn-success">Success Button</button>
          <button className="btn-error">Error Button</button>
          <button className="btn-outline">Outline Button</button>
        </div>
      </section>

      {/* Form Elements */}
      <section className="mb-16">
        <h2 className="mb-6">Form Elements</h2>
        
        <div className="max-w-md space-y-6">
          <div>
            <label className="label">Input Field</label>
            <input
              type="text"
              className="input"
              placeholder="Enter text..."
            />
          </div>

          <div>
            <label className="label">Select Field</label>
            <select className="select">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>

          <div>
            <label className="label">Email Input</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter email..."
            />
          </div>
        </div>
      </section>

      {/* Theme Toggle */}
      <section className="mb-16">
        <h2 className="mb-6">Theme Toggle</h2>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <p>Current theme: {theme}</p>
        </div>
      </section>

      {/* Cards */}
      <section className="mb-16">
        <h2 className="mb-6">Cards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
            <p className="text-gray-500 dark:text-gray-400">
              A simple card with some content.
            </p>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-2">Interactive Card</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              A card with a button.
            </p>
            <button className="btn-primary">Action</button>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-2">Feature Card</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              A card highlighting a feature.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-primary-500">Learn more</span>
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 