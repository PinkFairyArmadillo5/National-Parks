const express = require('express');
const app = express();
const path = require('path');
// require('dotenv').config();
const PORT = 3000; //process.env.PORT;
const NPS_API_KEY = 'q9RKXHJtdDBmZpTkJ3M73cyBTvxIlzqOm8jf7Gi7'; //process.env.NPS_API_KEY;
const EBIRDS_API_KEY = 'tk3nl7v9brn'; //process.env.EBIRDS_API_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log('Server running on Port', PORT));

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../src/index.html'));
});

module.exports = app;
