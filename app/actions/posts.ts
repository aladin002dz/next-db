'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
      return { error: 'Title and content are required' };
    }

    await sql`
      INSERT INTO posts (title, content)
      VALUES (${title}, ${content})
    `;
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating post:', error);
    return { error: 'Failed to create post' };
  }
}

export async function getPosts() {
  try {
    const { rows } = await sql`
      SELECT * FROM posts 
      ORDER BY id DESC
    `;
    return { posts: rows };
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

    await sql`
      DELETE FROM posts 
      WHERE id = ${postId}
    `;
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { error: 'Failed to delete post' };
  }
}
