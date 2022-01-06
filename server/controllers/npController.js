const db = require('../../models/npModels');

const npController = {};

// npController.bucketlistCheckDuplicates = async (req, res, next) => {
//   let noDuplicatesArr = [{ name: 'sam' }];
//   //res.locals.bucketListParks = [1, 2, 3];
//   req.body.bucketListParks.forEach(async (park) => {
//     const duplicateCheckQuery =
//       'SELECT parkName FROM bucketlist WHERE parkName=$1';
//     const data = await db.query(duplicateCheckQuery, [park.fullName]);
//     if (data) {
//       // console.log('data from sql query check dupes: ', data.rows);
//       // console.log('noDupesArr before: ', noDuplicatesArr);
//       if (Array.isArray(data.rows) && data.rows.length === 0) {
//         noDuplicatesArr.push(park);
//         res.locals.bucketListParks = [1, 2, 3];
//         console.log('SAM IN CATCH DUPES', res.locals.bucketListParks);
//         // console.log(
//         //   'noDuplicatesArr AFTER bucketlistCheckDuplicates: ',
//         //   noDuplicatesArr.fullName
//         // );
//       }
//       // } else {
//       //   console.log('this park already exists in BL: ', park.fullName);
//       //   req.body.bucketListParks = req.body.bucketListParks.filter(
//       //     (x) => x[0].fullName !== data.rows[0].parkName
//       //   );
//       //   console.log('bucketListParks line 24: ', req.body.bucketListParks);
//       // }
//     }
//     if (!data) {
//       console.log(`error in bucketlistCheckDuplicates: ${err}`);
//       next('route');
//     }
//   });

//   return next();
// };

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
  // const { fullName, parkCode, latitude, longitude } = req.body.bucketListParks;
  // console.log('npController.bucketlistAdd', req.body.bucketListParks);

  // console.log('MIA res.locals.bucketListParks: ', res.locals.bucketListParks);

  // if (res.locals.bucketListParks.length === 0) {
  //   return next();
  // }

  //iterate thru the req body
  // req.body.bucketListParks.forEach(async (park) => {
  //check if park already exists in SQL bucket list

  for (let i = 0; i < req.body.bucketListParks.length; i++) {
    //if does contain dupe, exit loop
    const duplicateCheckQuery =
      'SELECT parkName FROM bucketlist WHERE parkName=$1';

    const duplicateCheck = await db.query(duplicateCheckQuery, [
      req.body.bucketListParks[i].fullName,
    ]);

    console.log('MIA duplicateCheck', duplicateCheck);

    if (Array.isArray(duplicateCheck) && duplicateCheck[0]) {
      continue;
    }

    //if it doesnt contain dupe, run INSERT query
    const bucketlistAdd = `INSERT INTO bucketlist (parkName, parkCode, lat, long)
  VALUES($1, $2, $3, $4)`;
    const values = [
      park.fullName,
      park.parkCode,
      park.latitude,
      park.longitude,
    ];

    const data = await db.query(bucketlistAdd, values);

    if (data) {
      console.log(`from add`, data);
      // next();
    } else {
      console.log(`error in bucketlistAdd ${park.fullName}:`, err);
      return next({ log: err });
    }
  }
  // });
  return next();
};

module.exports = npController;
