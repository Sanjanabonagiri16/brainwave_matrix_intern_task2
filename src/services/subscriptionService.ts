import { User } from '@/types'

interface Subscription {
  id: string
  userId: string
  type: 'author' | 'category' | 'tag'
  targetId: string
  notificationType: 'email' | 'push' | 'both'
  frequency: 'instant' | 'daily' | 'weekly'
  createdAt: string
  updatedAt: string
}

interface NotificationPreferences {
  email: boolean
  push: boolean
  commentReplies: boolean
  mentions: boolean
  newFollowers: boolean
  postLikes: boolean
  commentLikes: boolean
  digest: 'none' | 'daily' | 'weekly'
}

interface Notification {
  id: string
  userId: string
  type: 'comment_reply' | 'mention' | 'new_follower' | 'post_like' | 'comment_like' | 'new_post'
  sourceId: string
  sourceType: 'post' | 'comment' | 'user'
  read: boolean
  createdAt: string
}

class SubscriptionService {
  private baseUrl = '/api/subscriptions'

  async getSubscriptions(userId: string): Promise<Subscription[]> {
    const response = await fetch(`${this.baseUrl}?userId=${userId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch subscriptions')
    }

    return response.json()
  }

  async subscribe(data: {
    userId: string
    type: Subscription['type']
    targetId: string
    notificationType: Subscription['notificationType']
    frequency: Subscription['frequency']
  }): Promise<Subscription> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to create subscription')
    }

    return response.json()
  }

  async unsubscribe(subscriptionId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${subscriptionId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete subscription')
    }
  }

  async updateSubscription(
    subscriptionId: string,
    data: Partial<Pick<Subscription, 'notificationType' | 'frequency'>>
  ): Promise<Subscription> {
    const response = await fetch(`${this.baseUrl}/${subscriptionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to update subscription')
    }

    return response.json()
  }

  async getNotificationPreferences(userId: string): Promise<NotificationPreferences> {
    const response = await fetch(`${this.baseUrl}/preferences/${userId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch notification preferences')
    }

    return response.json()
  }

  async updateNotificationPreferences(
    userId: string,
    preferences: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> {
    const response = await fetch(`${this.baseUrl}/preferences/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    })

    if (!response.ok) {
      throw new Error('Failed to update notification preferences')
    }

    return response.json()
  }

  async getNotifications(userId: string, page: number = 1): Promise<{
    notifications: Notification[]
    unreadCount: number
    pagination: {
      currentPage: number
      totalPages: number
      hasMore: boolean
    }
  }> {
    const response = await fetch(`${this.baseUrl}/notifications/${userId}?page=${page}`)
    if (!response.ok) {
      throw new Error('Failed to fetch notifications')
    }

    return response.json()
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/notifications/${notificationId}/read`, {
      method: 'PUT',
    })

    if (!response.ok) {
      throw new Error('Failed to mark notification as read')
    }
  }

  async markAllNotificationsAsRead(userId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/notifications/${userId}/read-all`, {
      method: 'PUT',
    })

    if (!response.ok) {
      throw new Error('Failed to mark all notifications as read')
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/notifications/${notificationId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete notification')
    }
  }

  async getSubscribers(type: Subscription['type'], targetId: string): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/subscribers?type=${type}&targetId=${targetId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch subscribers')
    }

    return response.json()
  }
}

export const subscriptionService = new SubscriptionService() 