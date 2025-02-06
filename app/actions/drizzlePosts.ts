'use server';

import { db } from '@/lib/db/index';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { desc } from "drizzle-orm";

export async function createPost(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
      return { error: 'Title and content are required' };
    }

    await db.insert(schema.posts).values({
      title,
      content,
    });

    revalidatePath('/');
    return { message: 'Post created successfully' };
  } catch (error) {
    console.error('Error creating post:', error);
    return { error: 'Failed to create post' };
  }
}

export async function getPosts() {
  try {
    const posts = await db.select().from(schema.posts).orderBy(desc(schema.posts.id));
    return { posts };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { error: 'Failed to fetch posts', posts: [] };
  }
}

export async function deletePost(postId: number) {
  try {
    if (!postId) {
      return { error: 'Post ID is required' };
    }

    await db.delete(schema.posts).where(eq(schema.posts.id, postId));
    
    revalidatePath('/');
    return { message: 'Post deleted successfully' };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { error: 'Failed to delete post' };
  }
}