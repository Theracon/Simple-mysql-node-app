const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const databaseService = require('./databaseService');
const { response } = require('express');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create
app.post('/insert', (req, res) => {

});

// Read
app.get('/getAll', (req, res) => {
    const db = databaseService.getDatabaseServiceInstance();

    const result = db.getAllData();

    result
    // .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Update

// Delete

app.listen(process.env.PORT, () => console.log('Server is running!'));