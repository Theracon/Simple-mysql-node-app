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
    const { name } = req.body;
    const db = databaseService.getDatabaseServiceInstance();

    const result = db.insertNewName(name);

    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// Read
app.get('/getAll', (req, res) => {
    const db = databaseService.getDatabaseServiceInstance();

    const result = db.getAllData();

    result
        .then(data => {
            res.json({ data: data })
        })
        .catch(err => console.log(err));
});

// Update
app.patch('/update', (req, res) => {
    const { id, name } = req.body;
    const db = databaseService.getDatabaseServiceInstance();

    const result = db.updateNameById(id, name);

    result
        .then(data => {
            res.json({ success: data })
        })
        .catch(err => console.log(err));
});

// Delete
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const db = databaseService.getDatabaseServiceInstance();

    const result = db.deleteRowById(id);

    result
        .then(data => {
            res.json({ success: data })
        })
        .catch(err => console.log(err));
});

app.get('/search/:name', (req, res) => {
    const { name } = req.params;
    const db = databaseService.getDatabaseServiceInstance();
});

app.listen(process.env.PORT, () => console.log('Server is running!'));