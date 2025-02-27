# Next.js Database Integration with SQLite, Prisma, and Drizzle and Server Actions

## Available Branches
1. [Main Branch - Only SQLite](https://github.com/aladin002dz/next-db/tree/main)
2. [Prisma Branch - Prisma ORM & SQLite](https://github.com/aladin002dz/next-db/tree/prisma)
3. [Drizzle Branch - Drizzle ORM & SQLite](https://github.com/aladin002dz/next-db/tree/drizzle)
4. [Vercel Postgres Branch - Only Vercel Postgres](https://github.com/aladin002dz/next-db/tree/vercel-pg)


### [Main Branch](https://github.com/aladin002dz/next-db/tree/main)
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

### [Drizzle Branch](https://github.com/aladin002dz/next-db/tree/drizzle)
The Drizzle branch demonstrates integration with Drizzle ORM. It features:
- Drizzle ORM setup with SQLite
- Type-safe schema definitions
- Efficient database operations
- Lightweight and flexible approach

To explore the Drizzle implementation, check out the [drizzle branch](https://github.com/aladin002dz/next-db/tree/drizzle) which includes:
- Complete Drizzle ORM configuration
- Schema definitions using TypeScript
- Type-safe query building
- Simple and performant database operations

### [Vercel Postgres Branch](https://github.com/aladin002dz/next-db/tree/vercel-pg)
The Vercel Postgres branch demonstrates integration with Vercel Postgres. It features:
- Vercel Postgres setup
- Type-safe database operations
- Efficient database operations

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