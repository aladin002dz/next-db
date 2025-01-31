import Database from 'better-sqlite3';

let db: Database.Database | null = null;

export function getDb() {
  if (!db) {
    db = new Database('./data/database.db');
  }
  return db;
}

// Clean up the connection when the app is shutting down
process.on('SIGTERM', () => {
  if (db) {
    db.close();
    db = null;
  }
});
