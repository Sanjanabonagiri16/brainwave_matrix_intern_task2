'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const sections = [
  {
    title: 'Getting Started',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    items: [
      { title: 'Introduction', link: '/docs/introduction' },
      { title: 'Quick Start Guide', link: '/docs/quick-start' },
      { title: 'Installation', link: '/docs/installation' },
      { title: 'Authentication', link: '/docs/authentication' }
    ]
  },
  {
    title: 'API Reference',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    items: [
      { title: 'REST API', link: '/docs/rest-api' },
      { title: 'Endpoints', link: '/docs/endpoints' },
      { title: 'Rate Limits', link: '/docs/rate-limits' },
      { title: 'Error Handling', link: '/docs/errors' }
    ]
  },
  {
    title: 'SDK & Libraries',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    items: [
      { title: 'JavaScript SDK', link: '/docs/js-sdk' },
      { title: 'Python SDK', link: '/docs/python-sdk' },
      { title: 'React Components', link: '/docs/react-components' },
      { title: 'Webhooks', link: '/docs/webhooks' }
    ]
  },
  {
    title: 'Guides & Tutorials',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    items: [
      { title: 'Integration Guide', link: '/docs/integration' },
      { title: 'Best Practices', link: '/docs/best-practices' },
      { title: 'Examples', link: '/docs/examples' },
      { title: 'Troubleshooting', link: '/docs/troubleshooting' }
    ]
  }
]

const codeExamples = [
  {
    title: 'Authentication',
    language: 'javascript',
    code: `const client = new BlogAPI({
  apiKey: 'your-api-key',
  environment: 'production'
});

const auth = await client.authenticate();
console.log(auth.token);`
  },
  {
    title: 'Create Post',
    language: 'javascript',
    code: `const post = await client.posts.create({
  title: 'My First Post',
  content: 'Hello, world!',
  category: 'Technology',
  tags: ['intro', 'api']
});

console.log(post.id);`
  },
  {
    title: 'Fetch Posts',
    language: 'javascript',
    code: `const posts = await client.posts.list({
  limit: 10,
  category: 'Technology',
  sort: 'created_at:desc'
});

posts.forEach(post => {
  console.log(post.title);
});`
  }
]

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const filteredSections = sections.filter(section =>
    !selectedSection || section.title === selectedSection
  )

  const filteredItems = filteredSections.flatMap(section =>
    section.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Documentation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Comprehensive guides and API references to help you build with our platform.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white
                       placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <svg 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Documentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-20">
              <nav className="space-y-8">
                {sections.map((section, index) => (
                  <div key={section.title}>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <span className="text-blue-500">{section.icon}</span>
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.link}
                            className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-3"
          >
            {/* Quick Start Section */}
            <section className="bg-gray-800 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 mb-6">
                  Get started with our API in minutes. Here's a quick example of how to authenticate and create your first post:
                </p>
                {codeExamples.map((example, index) => (
                  <div key={example.title} className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm font-mono text-gray-300">
                        {example.code}
                      </code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>

            {/* API Keys Section */}
            <section className="bg-gray-800 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">API Keys</h2>
              <p className="text-gray-400 mb-6">
                To use our API, you'll need to generate an API key from your dashboard. Keep your API keys secure and never share them publicly.
              </p>
              <Link
                href="/dashboard/api-keys"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Generate API Keys
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </section>

            {/* Resources Section */}
            <section className="bg-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/docs/examples"
                  className="block p-6 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">Code Examples</h3>
                  <p className="text-gray-400">Browse our collection of code examples and sample applications.</p>
                </Link>
                <Link
                  href="/docs/sdks"
                  className="block p-6 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">SDKs & Tools</h3>
                  <p className="text-gray-400">Official SDKs and tools to help you integrate faster.</p>
                </Link>
              </div>
            </section>
          </motion.div>
        </div>

        {/* Help Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gray-800 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our developer support team is here to help.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Contact Support
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="https://github.com/your-repo/issues" 
              target="_blank"
              className="inline-flex items-center gap-2 bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              GitHub Issues
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  )
} 