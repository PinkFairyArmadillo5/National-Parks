import React, { useEffect, useState } from 'react';

function BucketList({ bucketList, setBucketList }) {
  // const [bucketList, setBucketList] = useState([]);

  useEffect(() => {
    const bucketListQuery = `/db/initial-render`;
    fetch(bucketListQuery)
      .then((res) => res.json())
      .then((updatedBL) => {
        // console.log('updated Bucket List: ', updatedBL);
        setBucketList(updatedBL);
        console.log('BucketList.js line 13', updatedBL);
      });
  }, []);

  const [updatedBucketList, setUpdatedBucketList] = useState();

  const handleDelete = (park) => {
    console.log('line 27', park);
    const deletedPark = park.parkcode;
    console.log('line 29', deletedPark);

    const index = bucketList.indexOf(park);
    console.log('line 25', index);

    const deepCopyBL = [...bucketList];

    const editbucketList = deepCopyBL.splice(index, 1);
    console.log('line 28', editbucketList);

    console.log('line 29', deepCopyBL);

    setBucketList([...deepCopyBL]);
    console.log('new bucketlist', deepCopyBL);
    console.log('BL line 36', bucketList);

    fetch('/db/deletePark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        park: deletedPark,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log('line 49 data returned from delete', data);
      })
      .catch((err) => {
        console.log('error in delete fetch:', err);
        next({ log: err });
      });
    setUpdatedBucketList([...deepCopyBL]);
  };

  return (
    <div>
      <h3>My Bucket List</h3>
      {bucketList.map((park, index) => (
        <div key={index}>
          <button
            className='deleteX'
            park={park.parkname}
            onClick={() => {
              handleDelete(park);
            }}
          >
            X
          </button>
          {park.parkname}
        </div>
      ))}
    </div>
  );
}

export default BucketList;

/*delete route tasks
find trash or X icon to render with each park listed
onclick to remove park from bucketlist
  sends data (post request) to remove park from bucketlist SQL table
  returns edited table
router - dbRouter
SQL query to drop row where parkID matches or parkCode
CSS style to format bucketlist rendering with room for icon

*/
