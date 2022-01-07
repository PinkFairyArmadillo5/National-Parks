const db = require('../../models/npModels');

const npController = {};

npController.getParksFromBucketList = (req, res, next) => {
  const bucketlist = 'Select * FROM bucketlist;';
  db.query(bucketlist)
    .then((data) => {
      // console.log(data);
      res.locals.parks = data.rows;
      // console.log('log from getParksFromBucketList: ', res.locals.parks);
      next();
    })
    .catch((err) => {
      // console.log(`error in getparksController: ${err}`);
      next();
    });
};

npController.bucketlistAdd = async (req, res, next) => {
  for (let i = 0; i < req.body.bucketListParks.length; i++) {
    console.log(`index: ${i}, req.body: ${req.body.bucketListParks}`);

    //if does contain dupe, exit loop
    const duplicateCheckQuery =
      'SELECT parkName FROM bucketlist WHERE parkName=$1';

    const duplicateCheck = await db.query(duplicateCheckQuery, [
      req.body.bucketListParks[i].fullName,
    ]);

    console.log('MIA duplicateCheck', duplicateCheck);

    if (duplicateCheck.rowCount === 0) {
      console.log('MIA, new park! about to add to DB');

      //if it doesnt contain dupe, run INSERT query
      const bucketlistAdd = `INSERT INTO bucketlist (parkName, parkCode, lat, long)
        VALUES($1, $2, $3, $4)`;
      const values = [
        req.body.bucketListParks[i].fullName,
        req.body.bucketListParks[i].parkCode,
        req.body.bucketListParks[i].latitude,
        req.body.bucketListParks[i].longitude,
      ];

      console.log('MIA, checking req.body: ', req.body.bucketListParks);

      console.log('MIA, values before DB query: ', values);

      const data = await db.query(bucketlistAdd, values);

      if (data) {
        console.log(`from add`, data);
        // next();
      } else {
        console.log(
          `error in bucketlistAdd ${req.body.bucketListParks.fullName}:`,
          err
        );
        return next({ log: err });
      }
    }
  }
  return next();
};

npController.deletePark = (req, res, next) => {
  const parkToDelete = req.body.park;
  // console.log('line 48 np controller', typeof parkToDelete);
  // console.log('parkToDelete controller', parkToDelete);
  const sql = `DELETE FROM bucketlist WHERE parkcode = '${parkToDelete}';`;

  db.query(sql)
    .then((data) => {
      console.log('deleted!');
      // next();
    })
    .catch((err) => {
      console.log('error in npDelete parkToDelete:', err);
      next({ log: err });
    });
};

module.exports = npController;
