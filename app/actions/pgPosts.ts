'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { Post } from '@/types/post';

// Create a new post
export async function createPgPost(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
      return { error: 'Title and content are required' };
    }

    const result = await sql<Post>`
      INSERT INTO posts (title, content)
      VALUES (${title}, ${content})
      RETURNING *
    `;
    
    revalidatePath('/');
    return { success: true, post: result.rows[0] };
  } catch (error) {
    console.error('Error creating post:', error);
    return { error: 'Failed to create post' };
  }
}

// Get all posts with pagination
export async function getPgPosts(page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;
    const { rows: posts } = await sql<Post>`
      SELECT * FROM posts 
      ORDER BY id DESC
      LIMIT ${limit} 
      OFFSET ${offset}
    `;

    const { rows: [{ count }] } = await sql`
      SELECT COUNT(*) FROM posts
    `;

    return { 
      posts,
      pagination: {
        total: Number(count),
        pages: Math.ceil(Number(count) / limit),
        current: page
      }
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { error: 'Failed to fetch posts', posts: [] };
  }
}

// Get a single post by ID
export async function getPgPost(id: number) {
  try {
    const { rows } = await sql<Post>`
      SELECT * FROM posts 
      WHERE id = ${id}
    `;
    
    if (rows.length === 0) {
      return { error: 'Post not found' };
    }

    return { post: rows[0] };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { error: 'Failed to fetch post' };
  }
}

// Update a post
export async function updatePgPost(id: number, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
      return { error: 'Title and content are required' };
    }

    const { rows } = await sql<Post>`
      UPDATE posts 
      SET title = ${title}, content = ${content}
      WHERE id = ${id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return { error: 'Post not found' };
    }

    revalidatePath('/');
    return { success: true, post: rows[0] };
  } catch (error) {
    console.error('Error updating post:', error);
    return { error: 'Failed to update post' };
  }
}

// Delete a post
export async function deletePgPost(id: number) {
  try {
    const { rows } = await sql<Post>`
      DELETE FROM posts 
      WHERE id = ${id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return { error: 'Post not found' };
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { error: 'Failed to delete post' };
  }
}