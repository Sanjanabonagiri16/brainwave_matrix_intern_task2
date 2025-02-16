import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In a real app, this would be in a database
let settings = {
  general: {
    siteName: 'BlogApp',
    siteDescription: 'Share Your Stories',
    language: 'en',
    timezone: 'UTC',
  },
  appearance: {
    theme: 'dark',
    primaryColor: '#3b82f6',
    fontFamily: 'Inter',
    enableAnimations: true,
  },
  content: {
    postsPerPage: 10,
    excerptLength: 150,
    enableComments: true,
    moderateComments: true,
  },
  email: {
    notifyOnComments: true,
    notifyOnMentions: true,
    digestFrequency: 'daily',
    emailTemplate: 'default',
  },
  social: {
    twitter: '',
    facebook: '',
    linkedin: '',
    github: '',
  },
}

// GET /api/settings - Get all settings
export async function GET() {
  return NextResponse.json(settings)
}

// PUT /api/settings - Update settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Merge the new settings with existing ones
    settings = {
      ...settings,
      ...body,
      // Merge nested objects
      general: { ...settings.general, ...body.general },
      appearance: { ...settings.appearance, ...body.appearance },
      content: { ...settings.content, ...body.content },
      email: { ...settings.email, ...body.email },
      social: { ...settings.social, ...body.social },
    }

    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
} 