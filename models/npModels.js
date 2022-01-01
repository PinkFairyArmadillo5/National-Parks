const { Pool } = require('pg');

const PG_URI =
  'postgres://cgxuiorh:QPfwco4D5yC-njzYuggMvIqmuJWNsDCO@kashin.db.elephantsql.com/cgxuiorh';

const pool = new Pool({
  connectionString: PG_URI,
});

pool.on('connect', () => {
  console.log('connected to database');
});

module.exports = {
  PG_URI,
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
