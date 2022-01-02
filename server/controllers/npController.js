const db = require('../../models/npModels');

const npController = {};

npController.getParksFromBucketList = (req, res, next) => {
  const bucketlist = 'Select * FROM bucketlist;';
  db.query(bucketlist)
    .then((data) => {
      console.log(data);
      res.locals.parks = data.rows;
      console.log('log from getParksFromBucketList: ', res.locals.parks);
      next();
    })
    .catch((err) => {
      console.log(`error in getparksController: ${err}`);
      next();
    });
};

npController.bucketlistAdd = (req, res, next) => {
  // const { fullName, parkCode, latitude, longitude } = req.body.bucketListParks;
  console.log('npController.bucketlistAdd', req.body.bucketListParks);
  req.body.bucketListParks.forEach((park) => {
    const bucketlistAdd = `INSERT INTO bucketlist (parkName, parkCode, lat, long)
  VALUES($1, $2, $3, $4)`;
    const values = [
      park.fullName,
      park.parkCode,
      park.latitude,
      park.longitude,
    ];

    db.query(bucketlistAdd, values)
      .then((data) => {
        console.log(`from add ${data}`);
        // next();
      })
      .catch((err) => {
        console.log(`error in bucketlistAdd ${park.fullName}:`, err);
        next({ log: err });
      });
  });
  next();
};

module.exports = npController;
