'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const webhookEvents = [
  {
    name: 'post.created',
    description: 'Triggered when a new post is created',
    payload: {
      id: 'post_123',
      title: 'My New Post',
      content: '# Hello World\nThis is my first post!',
      author: {
        id: 'user_456',
        username: 'johndoe'
      },
      category: 'Technology',
      tags: ['intro', 'tech'],
      createdAt: '2024-03-15T12:00:00Z'
    }
  },
  {
    name: 'post.updated',
    description: 'Triggered when a post is updated',
    payload: {
      id: 'post_123',
      title: 'Updated Post Title',
      content: 'Updated content',
      author: {
        id: 'user_456',
        username: 'johndoe'
      },
      category: 'Technology',
      tags: ['intro', 'tech'],
      updatedAt: '2024-03-15T12:30:00Z'
    }
  },
  {
    name: 'post.deleted',
    description: 'Triggered when a post is deleted',
    payload: {
      id: 'post_123',
      deletedAt: '2024-03-15T13:00:00Z'
    }
  },
  {
    name: 'comment.created',
    description: 'Triggered when a new comment is added to a post',
    payload: {
      id: 'comment_789',
      postId: 'post_123',
      content: 'Great post!',
      author: {
        id: 'user_789',
        username: 'janedoe'
      },
      createdAt: '2024-03-15T12:15:00Z'
    }
  },
  {
    name: 'user.registered',
    description: 'Triggered when a new user registers',
    payload: {
      id: 'user_456',
      username: 'johndoe',
      email: 'john@example.com',
      createdAt: '2024-03-15T11:00:00Z'
    }
  }
]

const setupCode = `curl -X POST https://api.blogapp.com/v1/webhooks \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-domain.com/webhook",
    "events": ["post.created", "comment.created"],
    "secret": "your-webhook-secret"
  }'`

const verificationCode = `import crypto from 'crypto'
import { type NextApiRequest, NextApiResponse } from 'next'

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const signature = req.headers['x-blogapp-signature']
  
  // Verify webhook signature
  const hmac = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex')
    
  if (signature !== \`sha256=\${hmac}\`) {
    return res.status(401).json({ error: 'Invalid signature' })
  }
  
  // Handle webhook event
  const { type, data } = req.body
  
  switch (type) {
    case 'post.created':
      // Handle new post
      console.log('New post created:', data)
      break
      
    case 'comment.created':
      // Handle new comment
      console.log('New comment:', data)
      break
      
    default:
      console.log('Unhandled event type:', type)
  }
  
  res.status(200).json({ received: true })
}`

const retryCode = `export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Process webhook
    await processWebhook(req.body)
    
    // Return 2xx status code to acknowledge receipt
    res.status(200).json({ received: true })
  } catch (error) {
    // Return 5xx status code to trigger retry
    res.status(500).json({ error: 'Processing failed' })
  }
}`

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
      <code className="text-gray-300 text-sm font-mono">{code}</code>
    </pre>
  )
}

export default function WebhooksPage() {
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
            <span>Webhooks</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            Webhooks
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Real-time notifications for your application's events
          </motion.p>
        </div>

        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400">
              Webhooks allow your application to receive real-time notifications when
              specific events occur in your BlogApp instance. When an event occurs,
              we'll send a POST request to the endpoint you configure with details
              about the event.
            </p>
          </div>
        </motion.section>

        {/* Setup */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Setting Up Webhooks</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              To start receiving webhooks, you'll need to register an endpoint URL
              and specify which events you want to receive:
            </p>
            <CodeBlock code={setupCode} />
            <div className="mt-4 bg-blue-500/10 text-blue-500 p-4 rounded-lg">
              <strong className="block mb-2">Note:</strong>
              Store your webhook secret securely. You'll need it to verify that incoming
              webhooks are genuinely from BlogApp.
            </div>
          </div>
        </motion.section>

        {/* Events */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Available Events</h2>
          
          <div className="space-y-6">
            {webhookEvents.map((event) => (
              <div key={event.name} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-blue-400">
                  {event.name}
                </h3>
                <p className="text-gray-400 mb-4">{event.description}</p>
                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">
                    Example Payload
                  </h4>
                  <pre className="text-gray-300 text-sm font-mono">
                    {JSON.stringify(event.payload, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Security */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Security</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              Each webhook request includes a signature in the X-BlogApp-Signature header.
              You should verify this signature to ensure the webhook is genuine:
            </p>
            <CodeBlock code={verificationCode} />
          </div>
        </motion.section>

        {/* Retries */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Retries & Best Practices</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="space-y-4">
              <p className="text-gray-400">
                If your endpoint returns a non-2xx response code, we'll retry the webhook
                delivery with exponential backoff:
              </p>
              <ul className="list-disc list-inside text-gray-400 ml-4 space-y-2">
                <li>First retry: 5 minutes</li>
                <li>Second retry: 15 minutes</li>
                <li>Third retry: 30 minutes</li>
                <li>Fourth retry: 1 hour</li>
                <li>Fifth retry: 2 hours</li>
              </ul>
              <p className="text-gray-400 mt-4 mb-4">
                Handle webhook processing errors appropriately:
              </p>
              <CodeBlock code={retryCode} />
            </div>
          </div>
        </motion.section>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-gray-400 mb-6">
            Check out our SDKs and implementation guides.
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