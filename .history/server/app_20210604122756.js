const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const databaseService = require('./databaseService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create
app.post('/insert', (req, res) => {

});

// Read
app.get('/getAll', (req, res) => {
    console.log("YES")
    const db = databaseService.getDatabaseServiceInstance();

    const result = databaseService.getAllData;
});

// Update

// Delete

app.listen(process.env.PORT, () => console.log('Server is running!'));