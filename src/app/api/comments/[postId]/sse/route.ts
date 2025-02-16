import { NextRequest } from 'next/server'
import { mockComments } from '../../route'

// Store active SSE clients for each post
const clients = new Map<string, Set<(data: any) => void>>()

// Helper to send updates to all clients for a post
export function notifyPostClients(postId: string, data: any) {
  const postClients = clients.get(postId)
  if (postClients) {
    postClients.forEach(client => client(data))
  }
}

// GET /api/comments/[postId]/sse - SSE endpoint for real-time comments
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId
  
  // Set up SSE headers
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      // Function to send comment updates
      const send = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      // Add client to the post's client list
      if (!clients.has(postId)) {
        clients.set(postId, new Set())
      }
      clients.get(postId)!.add(send)

      // Send initial comments
      const initialComments = mockComments.filter(comment => comment.postId === postId)
      send({ type: 'initial', comments: initialComments })

      // Clean up when client disconnects
      return () => {
        const postClients = clients.get(postId)
        if (postClients) {
          postClients.delete(send)
          if (postClients.size === 0) {
            clients.delete(postId)
          }
        }
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