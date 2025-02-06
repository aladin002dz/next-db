import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Define your tables here based on your existing SQLite schema
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  // Add other columns as needed
});

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  // You can add more fields like createdAt, updatedAt if needed
});
