# Next.js Database Demo Project

This is a demonstration project showcasing different approaches to database integration with Next.js. The project implements a simple blog-post system where users can create, read, and delete posts.

## Project Structure

- Built with Next.js 14 App Router
- Uses Server Actions for data mutations
- Implements optimistic updates for better UX
- Features a clean, modern UI

## Available Branches

### Main Branch (Current)
The main branch implements a basic SQLite integration using `better-sqlite3`. It demonstrates:
- Direct SQLite database operations
- Server-side data handling
- Basic CRUD operations

### [Prisma Branch](https://github.com/aladin002dz/next-db/tree/prisma)
The Prisma branch showcases a more sophisticated approach using Prisma ORM. It includes:
- Prisma ORM integration with SQLite
- Type-safe database operations
- Automatic migrations
- Database schema management
- Improved developer experience with Prisma Studio

To explore the Prisma implementation, check out the [prisma branch](https://github.com/aladin002dz/next-db/tree/prisma) which contains:
- Complete Prisma setup and configuration
- Database migrations
- Type-safe database queries
- Detailed documentation on setup and usage

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Initialize the database:
```bash
npm run init-data
```
4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.