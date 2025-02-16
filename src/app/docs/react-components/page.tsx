'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const installationCode = `# Using npm
npm install @blogapp/react

# Using yarn
yarn add @blogapp/react

# Using pnpm
pnpm add @blogapp/react`

const providerCode = `import { BlogAppProvider } from '@blogapp/react'

function App() {
  return (
    <BlogAppProvider apiKey="your-api-key">
      <YourApp />
    </BlogAppProvider>
  )
}`

const components = [
  {
    title: 'Authentication Components',
    description: 'Pre-built components for user authentication flows.',
    examples: [
      {
        name: 'LoginForm',
        code: `import { LoginForm } from '@blogapp/react'

function LoginPage() {
  return (
    <LoginForm 
      onSuccess={(user, token) => {
        // Handle successful login
        console.log('Logged in user:', user)
      }}
      onError={(error) => {
        // Handle login error
        console.error('Login failed:', error)
      }}
    />
  )
}`
      },
      {
        name: 'RegisterForm',
        code: `import { RegisterForm } from '@blogapp/react'

function RegisterPage() {
  return (
    <RegisterForm
      onSuccess={(user) => {
        // Handle successful registration
        console.log('Registered user:', user)
      }}
      customFields={[
        {
          name: 'bio',
          label: 'Bio',
          type: 'textarea'
        }
      ]}
    />
  )
}`
      }
    ]
  },
  {
    title: 'Post Components',
    description: 'Components for displaying and managing blog posts.',
    examples: [
      {
        name: 'PostList',
        code: `import { PostList } from '@blogapp/react'

function BlogPage() {
  return (
    <PostList
      category="Technology"
      limit={10}
      renderItem={(post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      )}
      onPageChange={(page) => {
        console.log('Current page:', page)
      }}
    />
  )
}`
      },
      {
        name: 'PostEditor',
        code: `import { PostEditor } from '@blogapp/react'

function CreatePostPage() {
  return (
    <PostEditor
      initialContent={{
        title: '',
        content: '',
        category: 'Technology'
      }}
      onSave={async (post) => {
        // Handle post save
        console.log('Saving post:', post)
      }}
      preview={true}
      toolbar={['bold', 'italic', 'code']}
    />
  )
}`
      }
    ]
  },
  {
    title: 'Comment Components',
    description: 'Components for handling post comments.',
    examples: [
      {
        name: 'CommentSection',
        code: `import { CommentSection } from '@blogapp/react'

function PostPage({ postId }) {
  return (
    <CommentSection
      postId={postId}
      enableReplies={true}
      enableVoting={true}
      onCommentSubmit={(comment) => {
        console.log('New comment:', comment)
      }}
    />
  )
}`
      }
    ]
  },
  {
    title: 'Hooks',
    description: 'Custom hooks for common blog functionality.',
    examples: [
      {
        name: 'usePost & usePosts',
        code: `import { usePost, usePosts } from '@blogapp/react'

function BlogPost({ postId }) {
  const { post, isLoading, error } = usePost(postId)
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return <div>{post.title}</div>
}

function RecentPosts() {
  const { posts, pagination, isLoading } = usePosts({
    limit: 5,
    category: 'Technology'
  })
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}`
      }
    ]
  }
]

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
      <code className="text-gray-300 text-sm font-mono">{code}</code>
    </pre>
  )
}

export default function ReactComponentsPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-gray-400 mb-6"
          >
            <Link href="/docs" className="hover:text-white transition-colors">
              Documentation
            </Link>
            <span>/</span>
            <span>React Components</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            React Components
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Beautiful, accessible React components for building blog interfaces
          </motion.p>
        </div>

        {/* Installation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Installation</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              Install the React components using your preferred package manager:
            </p>
            <CodeBlock code={installationCode} />
          </div>
        </motion.section>

        {/* Provider Setup */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Provider Setup</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              Wrap your app with the BlogAppProvider to enable component functionality:
            </p>
            <CodeBlock code={providerCode} />
            <div className="mt-4 bg-blue-500/10 text-blue-500 p-4 rounded-lg">
              <strong className="block mb-2">Note:</strong>
              The provider must be placed at the root of your application to ensure all
              components have access to the API client and theme settings.
            </div>
          </div>
        </motion.section>

        {/* Components */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Components</h2>
          
          <div className="space-y-12">
            {components.map((section) => (
              <div key={section.title} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-gray-400 mb-6">{section.description}</p>
                
                <div className="space-y-8">
                  {section.examples.map((example) => (
                    <div key={example.name}>
                      <h4 className="text-lg font-semibold mb-4 text-blue-400">
                        {example.name}
                      </h4>
                      <CodeBlock code={example.code} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Customization */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Customization</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              All components accept custom styling through className props and can be themed
              using CSS variables. The components are built with Tailwind CSS and follow
              a consistent design system.
            </p>
            <div className="bg-green-500/10 text-green-500 p-4 rounded-lg">
              <strong className="block mb-2">Pro Tip:</strong>
              Use the theme configuration in BlogAppProvider to customize colors,
              typography, spacing, and other design tokens globally.
            </div>
          </div>
        </motion.section>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-gray-400 mb-6">
            Check out our other SDKs and implementation guides.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/js-sdk"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              JavaScript SDK
            </Link>
            <Link
              href="/docs/python-sdk"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Python SDK
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 