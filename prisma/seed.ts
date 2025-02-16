const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('Admin123!', 10)
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'admin'
      }
    })

    // Create regular user
    const userPassword = await bcrypt.hash('User123!', 10)
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: userPassword,
        role: 'user'
      }
    })

    // Create some tags
    const tags = await Promise.all([
      prisma.tag.create({ data: { name: 'Technology' } }),
      prisma.tag.create({ data: { name: 'Programming' } }),
      prisma.tag.create({ data: { name: 'Web Development' } }),
      prisma.tag.create({ data: { name: 'Design' } })
    ])

    // Create some posts
    const post1 = await prisma.post.create({
      data: {
        title: 'Getting Started with Next.js',
        content: `# Getting Started with Next.js

Next.js is a powerful React framework that makes building web applications a breeze.

## Key Features

- Server-side rendering
- Static site generation
- API routes
- File-based routing

## Why Next.js?

Next.js provides an excellent developer experience while ensuring great performance for your users.`,
        category: 'Technology',
        published: true,
        author: {
          connect: { id: user.id }
        },
        tags: {
          connect: [
            { id: tags[0].id },
            { id: tags[2].id }
          ]
        }
      }
    })

    const post2 = await prisma.post.create({
      data: {
        title: 'Modern Web Design Principles',
        content: `# Modern Web Design Principles

Creating beautiful and functional web interfaces requires understanding key design principles.

## Core Concepts

1. Visual Hierarchy
2. Color Theory
3. Typography
4. White Space

## Best Practices

Always design with user experience in mind.`,
        category: 'Design',
        published: true,
        author: {
          connect: { id: admin.id }
        },
        tags: {
          connect: [
            { id: tags[3].id }
          ]
        }
      }
    })

    // Create some comments
    await prisma.comment.create({
      data: {
        content: 'Great introduction to Next.js!',
        author: {
          connect: { id: admin.id }
        },
        post: {
          connect: { id: post1.id }
        }
      }
    })

    await prisma.comment.create({
      data: {
        content: 'Very helpful design tips!',
        author: {
          connect: { id: user.id }
        },
        post: {
          connect: { id: post2.id }
        }
      }
    })

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  }) 