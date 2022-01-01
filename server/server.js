const express = require('express');
const app = express();
const path = require('path');
const db = require('../models/npModels');
require('dotenv').config();
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');
const dbRouter = require('./routes/dbRouter');

const PORT = process.env.PORT;
// const NPS_API_KEY = process.env.NPS_API_KEY;
const EBIRDS_API_KEY = process.env.EBIRDS_API_KEY;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

<<<<<<< HEAD
app.post('/get-state-parks', getStateParks, (req, res) => {
  return res.status(200).json([...res.locals.parks]);
});

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../src/index.html'));
});
// app.use('/db', dbRouter), () => console.log('dbRouter');
=======
app.use('/get-state-parks', apiRouter);
app.use('/db', dbRouter), () => console.log('dbRouter');
>>>>>>> e1bfb074f84ec8d2aaf86e7f89f39fc1a95b4bf0

// app.get('/', (req, res) => {
//   return res.sendFile(path.join(__dirname, '../src/index.html'));
// });

app.listen(PORT, () => console.log('Server running on Port', PORT));
