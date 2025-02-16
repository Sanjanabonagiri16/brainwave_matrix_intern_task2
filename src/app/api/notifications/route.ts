import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In a real app, this would be handled by a proper event system
const clients = new Set<ReadableStreamDefaultController>()

// Helper to send notification to all connected clients
function sendNotificationToAll(data: any) {
  clients.forEach(client => {
    client.enqueue(
      `data: ${JSON.stringify(data)}\n\n`
    )
  })
}

// GET /api/notifications - Subscribe to notifications
export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    start(controller: ReadableStreamDefaultController) {
      clients.add(controller)

      // Send initial connection message
      controller.enqueue('data: {"type":"connected"}\n\n')
    },
    cancel(controller: ReadableStreamDefaultController) {
      clients.delete(controller)
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

// POST /api/notifications - Send a notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Send notification to all connected clients
    sendNotificationToAll({
      type: body.type || 'info',
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ message: 'Notification sent' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
} 