'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const installationCode = `# Using npm
npm install @blogapp/sdk

# Using yarn
yarn add @blogapp/sdk

# Using pnpm
pnpm add @blogapp/sdk`

const initializationCode = `import { BlogAppSDK } from '@blogapp/sdk';

const sdk = new BlogAppSDK({
  apiKey: 'your-api-key',
  environment: 'production' // or 'development'
});`

const exampleUsages = [
  {
    title: 'Authentication',
    code: `// Login
const { user, token } = await sdk.auth.login({
  email: 'user@example.com',
  password: 'password123'
});

// Register
const newUser = await sdk.auth.register({
  email: 'newuser@example.com',
  password: 'password123',
  username: 'newuser'
});

// Reset Password
await sdk.auth.requestPasswordReset('user@example.com');`
  },
  {
    title: 'Posts',
    code: `// Create a post
const post = await sdk.posts.create({
  title: 'My First Post',
  content: '# Hello World\\nThis is my first post!',
  category: 'Technology',
  tags: ['intro', 'tech']
});

// Get posts with pagination
const { posts, pagination } = await sdk.posts.list({
  page: 1,
  limit: 10,
  category: 'Technology'
});

// Get post by ID
const post = await sdk.posts.get('post-id');

// Update post
await sdk.posts.update('post-id', {
  title: 'Updated Title',
  content: 'Updated content'
});

// Delete post
await sdk.posts.delete('post-id');`
  },
  {
    title: 'Comments',
    code: `// Add comment
const comment = await sdk.comments.create('post-id', {
  content: 'Great post!'
});

// Get comments for post
const { comments } = await sdk.comments.list('post-id', {
  page: 1,
  limit: 20
});

// Delete comment
await sdk.comments.delete('comment-id');`
  },
  {
    title: 'Error Handling',
    code: `try {
  const post = await sdk.posts.get('non-existent-id');
} catch (error) {
  if (error.status === 404) {
    console.error('Post not found');
  } else if (error.status === 401) {
    console.error('Authentication required');
  } else {
    console.error('An error occurred:', error.message);
  }
}`
  }
]

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
      <code className="text-gray-300 text-sm font-mono">{code}</code>
    </pre>
  )
}

export default function JsSDKPage() {
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
            <span>JavaScript SDK</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            JavaScript SDK
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Official JavaScript client library for the BlogApp API
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
              Install the SDK using your preferred package manager:
            </p>
            <CodeBlock code={installationCode} />
          </div>
        </motion.section>

        {/* Initialization */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Initialization</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              Initialize the SDK with your API key:
            </p>
            <CodeBlock code={initializationCode} />
            <div className="mt-4 bg-blue-500/10 text-blue-500 p-4 rounded-lg">
              <strong className="block mb-2">Note:</strong>
              Never expose your API key in client-side code. For browser environments,
              use client tokens with limited permissions.
            </div>
          </div>
        </motion.section>

        {/* Usage Examples */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Usage Examples</h2>
          
          <div className="space-y-8">
            {exampleUsages.map((example) => (
              <div key={example.title} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">{example.title}</h3>
                <CodeBlock code={example.code} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* TypeScript Support */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">TypeScript Support</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              The SDK is written in TypeScript and includes type definitions out of the box.
              You'll get full type safety and autocompletion in supported editors.
            </p>
            <div className="bg-green-500/10 text-green-500 p-4 rounded-lg">
              <strong className="block mb-2">Pro Tip:</strong>
              Use TypeScript to get the best development experience with autocomplete
              and type checking.
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
              href="/docs/python-sdk"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Python SDK
            </Link>
            <Link
              href="/docs/react-components"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              React Components
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 