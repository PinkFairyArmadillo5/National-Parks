const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
require('dotenv').config();
const { getStateParks } = require('./controllers/parkscontroller')

const PORT = process.env.PORT;
// const NPS_API_KEY = process.env.NPS_API_KEY;
const EBIRDS_API_KEY = process.env.EBIRDS_API_KEY;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/get-state-parks', getStateParks, (req, res) => {
  return res.status(200).json([...res.locals.parks])
})


app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(PORT, () => console.log('Server running on Port', PORT));
// module.exports = app;
