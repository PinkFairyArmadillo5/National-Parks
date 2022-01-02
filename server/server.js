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

app.use('/get-state-parks', apiRouter);
app.use('/db', dbRouter), () => console.log('dbRouter');
// app.use('/bucketlistAdd', dbRouter), () => console.log('dbRouter');
// app.get('/', (req, res) => {
//   return res.sendFile(path.join(__dirname, '../src/index.html'));
// });

app.listen(PORT, () => console.log('Server running on Port', PORT));
