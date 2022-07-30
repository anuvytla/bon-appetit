const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => { res.json('Hello!!!') });

app.listen(PORT, () => console.log('Now listening'));