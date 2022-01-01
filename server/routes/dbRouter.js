const express = require('express');
const natlParks = require('../../models/npModels');
<<<<<<< HEAD
=======

const npController = require('../controllers/npController');
const dbRouter = express.Router();

dbRouter.get('/', npController.getParks, (req, res) =>
  res.status(200).json(res.locals.parks)
);

module.exports = dbRouter;
>>>>>>> e1bfb074f84ec8d2aaf86e7f89f39fc1a95b4bf0
