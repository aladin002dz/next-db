# Next.js with Vercel Postgres

This project demonstrates how to build a Next.js application with Vercel Postgres for database management.

## Prerequisites
- Node.js installed on your system
- Basic understanding of Next.js and SQL
- Vercel account (for Postgres)

## Setup Instructions

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd next-db
npm install
```

### 2. Install Vercel Postgres
```bash
npm install @vercel/postgres
```

### 3. Configure Environment Variables
Create a `.env.local` file with your database credentials:

```env
# Vercel Postgres Credentials
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

Get Vercel Postgres credentials from:
1. Vercel project dashboard
2. Storage > Create New > Postgres Database
3. `.env.local` tab in settings

## Using Vercel Postgres

### Basic Query
```typescript
import { sql } from '@vercel/postgres';

async function getPosts() {
  const { rows } = await sql`SELECT * from posts`;
  return rows;
}
```

### Using Client
```typescript
import { db } from '@vercel/postgres';

async function getPosts() {
  const client = await db.connect();
  try {
    const { rows } = await client.query('SELECT * from posts');
    return rows;
  } finally {
    client.release();
  }
}
```

### Server Action Example
Create `app/actions/pgPosts.ts`:
```typescript
'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function createPost(title: string, content: string) {
  try {
    await sql`
      INSERT INTO posts (title, content)
      VALUES (${title}, ${content})
    `;
    revalidatePath('/');
    return { message: 'Post created successfully' };
  } catch (error) {
    return { message: 'Database Error: Failed to create post' };
  }
}
```

## Available Scripts
- `npm run dev`: Start development server

## Project Structure
- `/app`: Next.js app directory
  - `/actions`: Server actions for database operations
  - `/api`: API routes
- `/lib`: Utility functions and database clients

## Best Practices
1. Use parameterized queries to prevent SQL injection
2. Handle database errors appropriately
3. Use `revalidatePath()` for cache management
4. Keep credentials in `.env.local`
5. Consider using Edge Runtime for better performance

## Important Notes
- Vercel Postgres provides automatic connection pooling
- Use SQL template literals with @vercel/postgres for safety
- Connection is automatically managed in Vercel's environment
- Edge Runtime compatible - works with Edge Functions and Middleware
- Local development requires proper environment variables setup