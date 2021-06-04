const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create
app.post('/insert', (req, res) => {

});

// Read
app.get('getAll', (req, res) => {

});

// Update

// Delete