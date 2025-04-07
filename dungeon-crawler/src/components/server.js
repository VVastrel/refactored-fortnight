import express from 'express';
import bodyParser from 'body-parser';
import { addData } from './databaseSQL.js'; 

const app = express();
const PORT = 3000;


app.use(bodyParser.json());

// Lisää tietokantaan
app.post('/add-data', (req, res) => {
    const { column1, column2, column3 } = req.body;

    addData(column1, column2, column3, (err, id) => {
        if (err) {
            return res.status(500).json({ error: 'Error adding data' });
        }
        res.status(201).json({ message: 'Data added successfully', id });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
