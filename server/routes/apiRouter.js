const express = require('express');
const router = express.Router();

const { getStateParks } = require('../controllers/parkscontroller');

router.post('/', getStateParks, (req, res) => {
  return res.status(200).json([...res.locals.parks]);
});
module.exports = router;
