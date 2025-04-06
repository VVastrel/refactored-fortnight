import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dbPath = path.resolve(__dirname, '../database.db');



    export function addData(column1Value, column2Value, column3Value, callback) {
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error('Error opening database ' + err.message);
                callback(err);
                return;
            }
        });
    
        //Lisää tietokantaan
        const sql = `INSERT INTO plr_data (playerName, score, message) VALUES (?, ?, ?)`;
        db.run(sql, [column1Value, column2Value, column3Value], function(err) {
            if (err) {
                console.error('Error inserting data ' + err.message);
                callback(err);
            } else {
                console.log(`Data inserted successfully with ID: ${this.lastID}`);
                callback(null, this.lastID); 
            }
        });

    db.close((err) => {
        if (err) {
            console.error('Error closing the database ' + err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
}
