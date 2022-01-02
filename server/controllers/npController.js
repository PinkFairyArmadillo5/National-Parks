const db = require('../../models/npModels');

const npController = {};

npController.getParks = (req, res, next) => {
  const bucketlist = 'Select parkname FROM bucketlist;';
  db.query(bucketlist)
    .then((data) => {
      console.log(data);
      res.locals.parks = data.rows;
      console.log(res.locals.parks);
      next();
    })
    .catch((err) => {
      console.log(`error in getparksController: ${err}`);
      next();
    });
};

module.exports = npController;
