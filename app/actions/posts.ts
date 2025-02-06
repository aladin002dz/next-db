'use server';

import { getDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
      return { error: 'Title and content are required' };
    }

    const db = getDb();
    const insertPost = db.prepare('INSERT INTO posts (title, content) VALUES (?, ?)');
    insertPost.run(title, content);
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating post:', error);
    return { error: 'Failed to create post' };
  }
}

export async function getPosts() {
  try {
    const db = getDb();
    const posts = db.prepare('SELECT * FROM posts ORDER BY id DESC').all();
    return { posts };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { error: 'Failed to fetch posts', posts: [] };
  }
}

export async function deletePost(formData: FormData) {
  try {
    const postId = formData.get('postId') as string;

    if (!postId) {
      return { error: 'Post ID is required' };
    }

    const db = getDb();
    const deletePost = db.prepare('DELETE FROM posts WHERE id = ?');
    deletePost.run(postId);
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { error: 'Failed to delete post' };
  }
}
