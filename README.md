# Next.js with Prisma and SQLite

This project is a Next.js application that uses Prisma ORM with SQLite for data persistence. Here's why we chose these technologies:

- **Next.js**: A React framework that provides server-side rendering, routing, and API routes out of the box
- **Prisma**: A modern database ORM that provides type safety and intuitive database access
- **SQLite**: A lightweight, file-based database that's perfect for development and small to medium applications

## Prerequisites

- Node.js (v18 or higher) - Required for running Next.js and Prisma
- npm (Node Package Manager) - Required for managing project dependencies

## Setup Instructions

Each step below is essential for setting up Prisma in your Next.js project. Let's understand why each step is necessary:

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd sqlite
npm install
```
**Why?** This step gets you the project code and installs all the base dependencies defined in package.json. It's the foundation for any Node.js project.

### 2. Install Prisma Dependencies
```bash
npm install prisma --save-dev
npm install @prisma/client
```
**Why?** 
- `prisma`: Development dependency that provides the CLI and migration tools. It's used for database migrations and schema management.
- `@prisma/client`: Runtime dependency that provides the actual database client. This is what your application uses to interact with the database.

### 3. Initialize Prisma
```bash
npx prisma init
```
**Why?** This command:
- Creates the `prisma` directory
- Generates a basic `schema.prisma` file
- Sets up the initial project structure needed for Prisma
- Creates a `.env` file for database connection strings

### 4. Configure Prisma Schema
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:../data/database.db"
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
**Why each part?**
- `generator`: Specifies how to generate the Prisma Client. The `prisma-client-js` provider creates a TypeScript/JavaScript client.
- `datasource`: Defines your database connection. We use SQLite with a local file for simplicity.
- `model Post`: Defines your database schema. Each field has a specific purpose:
  - `id`: Unique identifier for each post
  - `title` & `content`: The actual post data
  - `createdAt`: Automatically tracks creation time
  - `updatedAt`: Automatically updates when the post is modified

### 5. Create and Apply Migrations
```bash
npx prisma migrate dev --name init_posts
```
**Why?** This command:
- Creates a new migration file based on your schema changes
- Applies the migration to your database
- Creates the database if it doesn't exist
- Regenerates the Prisma Client to match your schema
- The `--name` flag provides a descriptive name for the migration

### 6. Generate Prisma Client
```bash
npx prisma generate
```
**Why?** This command:
- Creates a type-safe client based on your schema
- Enables autocomplete in your IDE
- Provides runtime type checking for database operations

## Using Prisma in the Project

The Prisma client is initialized in `lib/db.ts` as a singleton to prevent multiple database connections:

```typescript
import { prisma } from '@/lib/db'

// Example: Fetch all posts
const posts = await prisma.post.findMany()

// Example: Create a new post
const newPost = await prisma.post.create({
  data: {
    title: 'My Post',
    content: 'Post content'
  }
})
```

## Available Scripts and Their Purpose

- `npm run dev`: Starts the development server with hot-reloading for Next.js
- `npx prisma studio`: Opens a GUI to view and edit your database data - useful for debugging and data management
- `npx prisma migrate reset`: Resets the database to a clean state - useful during development or when schema changes significantly
- `npx prisma generate`: Updates the Prisma Client after schema changes - necessary for type safety

## Project Structure Explained

- `/prisma`: Contains all Prisma-related files
  - `schema.prisma`: Defines your database schema and client configuration
  - `migrations/`: Contains all database migration history
- `/data`: Houses the SQLite database file
  - `database.db`: Your SQLite database file
- `/lib/db.ts`: Manages Prisma client instantiation as a singleton
- `/app/actions`: Contains server actions for database operations
  - Keeps database logic separate from UI components
  - Provides a clean API for frontend components

## Useful Prisma Commands and When to Use Them

### View Database with Prisma Studio
```bash
npx prisma studio
```
**When to use**: 
- Debugging database issues
- Manually inspecting or editing data
- Testing database schema

### Reset Database
```bash
npx prisma migrate reset
```
**When to use**:
- During development when you need a fresh start
- When migrations become conflicted
- When testing deployment scripts

### Create New Migration
```bash
npx prisma migrate dev
```
**When to use**:
- After changing your schema
- When adding new models or fields
- When modifying existing database structure

## Important Notes

- The SQLite database (`/data/database.db`) is a single file containing all your data
- Migrations in `/prisma/migrations` track all database schema changes
- The schema file `/prisma/schema.prisma` is your single source of truth for database structure
- Always regenerate the Prisma client after schema changes
- Consider backing up your database file regularly as it contains all your data