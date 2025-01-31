import Database from "better-sqlite3";

// Open the database (if it doesn't exist, it will be created automatically)
const db = new Database("./data/database.db");

// Now, you can start creating tables if they don't exist yet
const createTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL
  );
`);

// Run the create table query
createTable.run();

// create table for posts
const createTablePosts = db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  );
`);
createTablePosts.run();

//populate the table posts with some data
const insertPost = db.prepare(`
  INSERT INTO posts (title, content) VALUES (?, ?);
`);
insertPost.run("First Post", "This is the first post.");
insertPost.run("Second Post", "This is the second post.");
insertPost.run("Third Post", "This is the third post.");
