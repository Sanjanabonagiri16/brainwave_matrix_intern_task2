import nodemailer from 'nodemailer'
import { User, Post, Comment } from '@/types'

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface EmailTemplate {
  subject: string
  body: string
}

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
  replyTo?: string
}

export const emailTemplates = {
  welcome: (user: User): EmailTemplate => ({
    subject: `Welcome to BlogApp, ${user.name}!`,
    body: `
      <h1>Welcome to BlogApp!</h1>
      <p>Hi ${user.name},</p>
      <p>Thank you for joining BlogApp. We're excited to have you as part of our community!</p>
      <p>Here are a few things you can do to get started:</p>
      <ul>
        <li>Complete your profile</li>
        <li>Write your first blog post</li>
        <li>Follow other writers</li>
        <li>Explore trending posts</li>
      </ul>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Happy blogging!</p>
    `,
  }),

  passwordReset: (user: User, resetLink: string): EmailTemplate => ({
    subject: 'Reset Your Password',
    body: `
      <h1>Password Reset Request</h1>
      <p>Hi ${user.name},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <a href="${resetLink}" style="display:inline-block;padding:12px 24px;background:#3b82f6;color:white;text-decoration:none;border-radius:4px;">
        Reset Password
      </a>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
  }),

  newComment: (post: Post, comment: Comment): EmailTemplate => ({
    subject: `New Comment on "${post.title}"`,
    body: `
      <h1>New Comment</h1>
      <p>Hi ${post.author.name},</p>
      <p>You have a new comment on your post "${post.title}":</p>
      <div style="padding:16px;background:#f3f4f6;border-radius:4px;margin:16px 0;">
        <p style="margin:0;"><strong>${comment.author.name}</strong></p>
        <p style="margin:8px 0 0;">${comment.content}</p>
      </div>
      <a href="/blog/${post.id}#comment-${comment.id}" style="display:inline-block;padding:12px 24px;background:#3b82f6;color:white;text-decoration:none;border-radius:4px;">
        View Comment
      </a>
    `,
  }),

  commentReply: (originalComment: Comment, reply: Comment, post: Post): EmailTemplate => ({
    subject: 'Someone Replied to Your Comment',
    body: `
      <h1>New Reply</h1>
      <p>Hi ${originalComment.author.name},</p>
      <p>Someone replied to your comment on "${post.title}":</p>
      <div style="padding:16px;background:#f3f4f6;border-radius:4px;margin:16px 0;">
        <p style="margin:0;"><strong>Your comment:</strong></p>
        <p style="margin:8px 0;">${originalComment.content}</p>
        <hr style="margin:16px 0;border:none;border-top:1px solid #e5e7eb;" />
        <p style="margin:0;"><strong>${reply.author.name}'s reply:</strong></p>
        <p style="margin:8px 0 0;">${reply.content}</p>
      </div>
      <a href="/blog/${post.id}#comment-${reply.id}" style="display:inline-block;padding:12px 24px;background:#3b82f6;color:white;text-decoration:none;border-radius:4px;">
        View Reply
      </a>
    `,
  }),

  weeklyDigest: (user: User, posts: Post[]): EmailTemplate => ({
    subject: 'Your Weekly Reading Digest',
    body: `
      <h1>Weekly Digest</h1>
      <p>Hi ${user.name},</p>
      <p>Here are some posts we think you'll enjoy based on your interests:</p>
      ${posts.map(post => `
        <div style="margin:24px 0;">
          <h2 style="margin:0;">${post.title}</h2>
          <p style="margin:8px 0;color:#666;">By ${post.author.name}</p>
          <p style="margin:8px 0;">${post.excerpt}</p>
          <a href="/blog/${post.id}" style="color:#3b82f6;text-decoration:none;">Read more →</a>
        </div>
      `).join('')}
      <p>
        <a href="/settings/notifications" style="color:#666;text-decoration:none;">
          Manage email preferences
        </a>
      </p>
    `,
  }),
}

class EmailService {
  private async sendEmail(options: EmailOptions): Promise<void> {
    const defaultFrom = 'BlogApp <noreply@blogapp.com>'
    const emailData = {
      ...options,
      from: options.from || defaultFrom,
    }

    try {
      // In a real app, you would use a proper email service like SendGrid, AWS SES, etc.
      // For now, we'll just log the email data
      console.log('Sending email:', emailData)
    } catch (error) {
      console.error('Failed to send email:', error)
      throw new Error('Failed to send email')
    }
  }

  async sendWelcomeEmail(user: User): Promise<void> {
    const template = emailTemplates.welcome(user)
    await this.sendEmail({
      to: user.email,
      subject: template.subject,
      html: template.body,
    })
  }

  async sendPasswordResetEmail(user: User, resetLink: string): Promise<void> {
    const template = emailTemplates.passwordReset(user, resetLink)
    await this.sendEmail({
      to: user.email,
      subject: template.subject,
      html: template.body,
    })
  }

  async sendNewCommentNotification(post: Post, comment: Comment): Promise<void> {
    const template = emailTemplates.newComment(post, comment)
    await this.sendEmail({
      to: post.author.email,
      subject: template.subject,
      html: template.body,
    })
  }

  async sendCommentReplyNotification(originalComment: Comment, reply: Comment, post: Post): Promise<void> {
    const template = emailTemplates.commentReply(originalComment, reply, post)
    await this.sendEmail({
      to: originalComment.author.email,
      subject: template.subject,
      html: template.body,
    })
  }

  async sendWeeklyDigest(user: User, posts: Post[]): Promise<void> {
    const template = emailTemplates.weeklyDigest(user, posts)
    await this.sendEmail({
      to: user.email,
      subject: template.subject,
      html: template.body,
    })
  }
}

export const emailService = new EmailService() 