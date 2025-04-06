import { addData } from './databaseSQL.js';


addData('Hermanni', 42, 'prkl', (err, id) => {
    if (err) {
        console.error('Error adding data:', err);
    } else {
        console.log('Data added successfully with ID:', id);
    }
});
