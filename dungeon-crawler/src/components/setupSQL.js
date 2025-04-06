import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// reitti tietokantatiedostoon
const dbPath = path.resolve(__dirname, '../database.db');

// Luo uusi tietokanta
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Luo uusi taulu
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS plr_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        playerName TEXT NOT NULL,
        score INTEGER NOT NULL,
        message TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating table ' + err.message);
        } else {
            console.log('Table created successfully.');
        }
    });

    
});



db.close((err) => {
    if (err) {
        console.error('Error closing the database ' + err.message);
    } else {
        console.log('Database connection closed.');
    }
});
