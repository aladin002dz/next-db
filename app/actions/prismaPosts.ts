'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export async function createPost(title: string, content: string) {
  try {
    await prisma.post.create({
      data: {
        title,
        content,
      },
    })
    revalidatePath('/')
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export async function deletePost(postId: number) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    })
    revalidatePath('/')
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}
