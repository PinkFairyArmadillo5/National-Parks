const express = require('express');
const natlParks = require('../../models/npModels');

const npController = require('../controllers/npController');
const dbRouter = express.Router();

dbRouter.get(
  '/initial-render',
  npController.getParksFromBucketList,
  (req, res) => res.status(200).json(res.locals.parks)
);

dbRouter.post(
  '/put-bucketlist',
  // npController.bucketlistCheckDuplicates,
  npController.bucketlistAdd,
  npController.getParksFromBucketList,
  (req, res) => {
    res.status(200).json(res.locals.parks);
    // console.log('finished dbRouter.post/put-bucketlist');
  }
);

module.exports = dbRouter;
