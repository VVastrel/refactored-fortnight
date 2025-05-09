const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("game.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS map_seeds (
      id TEXT PRIMARY KEY,
      seed TEXT NOT NULL
    );
  `);
});

module.exports = db;
