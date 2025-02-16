import { NextRequest } from 'next/server'
import { mockPosts } from '../route'

// Store active SSE clients
const clients = new Set<(data: any) => void>()

// Helper to send updates to all clients
export function notifyClients(data: any) {
  clients.forEach(client => client(data))
}

// GET /api/posts/sse - SSE endpoint for real-time post updates
export async function GET(request: NextRequest) {
  // Set up SSE headers
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      // Function to send post updates
      const send = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      // Add client to the list
      clients.add(send)

      // Send initial posts
      send({ type: 'initial', posts: mockPosts })

      // Clean up when client disconnects
      return () => {
        clients.delete(send)
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
} 