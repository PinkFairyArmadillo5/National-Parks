const express = require('express');
const app = express();
const path = require('path');
const db = require('../models/npModels');

require('dotenv').config();

const PORT = process.env.PORT;
const NPS_API_KEY = process.env.NPS_API_KEY;
const EBIRDS_API_KEY = process.env.EBIRDS_API_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(PORT, () => console.log('Server running on Port', PORT));
// module.exports = app;

/**
 * app.get('/', (req, res) => {
db.select('*)
.from('parks')
.then((data) => {
  //console.log(data); 
  res.json(data);
}) 
.catch((err) => {
  console.log('error in db get:' ${err})
});
});
 */
