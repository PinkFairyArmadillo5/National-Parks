const express = require('express');
const natlParks = require('../../models/npModels');

const npController = require('../controllers/npController');
const dbRouter = express.Router();

dbRouter.get('/', npController.getParks, (req, res) =>
  res.status(200).json(res.locals.parks)
);

module.exports = dbRouter;
