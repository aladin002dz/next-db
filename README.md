# Next.js with Drizzle and SQLite

## Prerequisites
- Node.js (v18 or higher) - Required for running Next.js and Drizzle
- npm (Node Package Manager) - Required for managing project dependencies

## Setup Instructions
Each step below is essential for setting up Drizzle in your Next.js project. Let's understand why each step is necessary:

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd next-db
npm install
```
**Why?** This step gets you the project code and installs all the base dependencies defined in package.json. It's the foundation for any Node.js project.

### 2. Install Drizzle Dependencies
```bash
npm install drizzle-orm @libsql/client
npm install -D drizzle-kit
```
**Why?** 
- `drizzle-orm`: The core ORM library that provides the database interaction layer
- `@libsql/client`: The SQLite client that Drizzle uses to connect to the database
- `drizzle-kit`: Development dependency that provides CLI tools for migrations and schema management

### 3. Configure Drizzle
Create `drizzle.config.ts` in your project root:
```typescript
import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './data/database.db',
  },
} satisfies Config;
```
**Why?** This configuration file:
- Specifies where your schema is located
- Defines where migrations should be stored
- Sets up the database connection details
- Tells Drizzle which database driver to use

### 4. Create Database Schema
Create `lib/db/schema.ts`:
```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});
```
**Why each part?**
- `sqliteTable`: Creates a type-safe table definition
- Field definitions specify:
  - `id`: Unique identifier for each post
  - `title` & `content`: The actual post data
  - `createdAt`: Automatically tracks creation time
  - `updatedAt`: Automatically updates when the post is modified

### 5. Set up Database Connection
Create `lib/db/index.ts`:
```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('./data/database.db');
export const db = drizzle(sqlite, { schema });
export { schema };
```
**Why?** This file:
- Creates a singleton database connection
- Configures Drizzle with your schema
- Exports the database instance for use throughout your application

## Using Drizzle in the Project
Import and use the database client in your code:
```typescript
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';

// Example: Fetch all posts
const allPosts = await db.select().from(posts);

// Example: Create a new post
const newPost = await db.insert(posts).values({
  title: 'My Post',
  content: 'Post content'
});
```

## Available Scripts and Their Purpose
- `npm run dev`: Starts the development server
- `npm run db:generate`: Generates SQL migrations based on your schema changes
- `npm run db:push`: Applies schema changes directly to the database

## Project Structure Explained
- `/lib/db`: Contains all database-related files
  - `schema.ts`: Defines your database schema
  - `index.ts`: Sets up the database connection
  - `migrations/`: Contains generated SQL migrations
- `/data`: Houses the SQLite database file
  - `database.db`: Your SQLite database file
- `drizzle.config.ts`: Configuration for Drizzle ORM

## Important Notes
- The SQLite database (`/data/database.db`) is a single file containing all your data
- Schema changes are tracked in SQL migration files in `/lib/db/migrations`
- The schema file `/lib/db/schema.ts` is your single source of truth for database structure
- Always run `npm run db:generate` after schema changes to create new migrations
- Consider backing up your database file regularly as it contains all your data

## Useful Drizzle Commands and When to Use Them

### Generate Migrations
```bash
npm run db:generate
```
**When to use**: 
- After changing your schema
- When adding new tables or fields
- When modifying existing database structure

### Push Schema Changes
```bash
npm run db:push
```
**When to use**:
- During development to quickly apply schema changes
- When you don't need to track migrations
- For rapid prototyping