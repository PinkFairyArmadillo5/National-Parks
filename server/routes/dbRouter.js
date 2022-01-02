const express = require('express');
const natlParks = require('../../models/npModels');

const npController = require('../controllers/npController');
const dbRouter = express.Router();

dbRouter.get(
  '/initial-render',
  npController.getParksFromBucketList,
  (req, res) => res.status(200).json(res.locals.parks)
);

dbRouter.get(
  '/put-bucketlist',
  npController.bucketlistAdd,
  npController.getParksFromBucketList,
  (req, res) => res.status(200).json(res.locals.bucketlist)
);

module.exports = dbRouter;
