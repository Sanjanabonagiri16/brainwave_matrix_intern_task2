'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const guides = [
  {
    title: 'Authentication',
    description: 'Learn how to implement user authentication in your application',
    sections: [
      {
        title: 'Setting Up JWT Authentication',
        content: `// 1. Install required dependencies
npm install jsonwebtoken bcryptjs

// 2. Create JWT middleware
import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

// 3. Protect routes with middleware
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected data' })
})`
      },
      {
        title: 'Implementing User Registration',
        content: `// 1. Hash password before saving
import bcrypt from 'bcryptjs'

async function registerUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  
  const user = await prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      name: userData.name
    }
  })

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return { user, token }
}`
      }
    ]
  },
  {
    title: 'Content Management',
    description: 'Handle blog posts, comments, and media uploads',
    sections: [
      {
        title: 'Creating Blog Posts',
        content: `// 1. Define post schema
type Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// 2. Create post endpoint
app.post('/api/posts', verifyToken, async (req, res) => {
  const { title, content } = req.body
  
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: req.user.userId
    }
  })

  res.json({ post })
})`
      },
      {
        title: 'Handling Media Uploads',
        content: `// 1. Set up file upload middleware
import multer from 'multer'

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage })

// 2. Create upload endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  const file = req.file
  
  // Store file metadata in database
  const image = await prisma.image.create({
    data: {
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size
    }
  })

  res.json({ image })
})`
      }
    ]
  },
  {
    title: 'Real-time Features',
    description: 'Implement real-time notifications and chat functionality',
    sections: [
      {
        title: 'Setting Up WebSocket Server',
        content: `// 1. Install dependencies
npm install socket.io

// 2. Initialize Socket.IO server
import { Server } from 'socket.io'

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
})

// 3. Handle connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId)
  })
  
  socket.on('message', (data) => {
    io.to(data.roomId).emit('message', {
      text: data.text,
      userId: socket.userId,
      timestamp: new Date()
    })
  })
})`
      },
      {
        title: 'Implementing Notifications',
        content: `// 1. Create notification system
const NotificationSystem = {
  // Send notification to specific user
  async sendToUser(userId, notification) {
    const socket = connectedUsers.get(userId)
    if (socket) {
      socket.emit('notification', notification)
    }
    
    // Store notification in database
    await prisma.notification.create({
      data: {
        userId,
        type: notification.type,
        message: notification.message,
        read: false
      }
    })
  },
  
  // Send notification to multiple users
  async broadcast(userIds, notification) {
    for (const userId of userIds) {
      await this.sendToUser(userId, notification)
    }
  }
}`
      }
    ]
  }
]

const CodeBlock = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative mt-4 mb-6">
      <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-gray-300 text-sm font-mono">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        aria-label="Copy code"
      >
        {isCopied ? (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default function GuidesPage() {
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
            <span>Guides</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            Implementation Guides
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Step-by-step guides for implementing common features and functionality
          </motion.p>
        </div>

        {/* Guides Sections */}
        <div className="space-y-12">
          {guides.map((guide, guideIndex) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + guideIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-2">{guide.title}</h2>
              <p className="text-gray-400 mb-6">{guide.description}</p>
              
              <div className="space-y-8">
                {guide.sections.map((section) => (
                  <div
                    key={section.title}
                    className="bg-gray-800 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                    <CodeBlock code={section.content} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Looking for API Details?</h2>
          <p className="text-gray-400 mb-6">
            Check out our API reference and endpoints documentation for detailed specifications.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/endpoints"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              View Endpoints
            </Link>
            <Link
              href="/docs/api-reference"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              API Reference
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 