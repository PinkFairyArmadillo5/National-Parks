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

  //const [ updatedBucketList, setUpdatedBucketList ] = useState(bucketList)

  const handleDelete = (e) => {
    const parkToDelete = e.target.getPark(bucketList.parkcode);
    setUpdatedBucketList(
      bucketList.filter((park) => park.parkcode !== parkToDelete)
    );
  };

  return (
    <div>
      <h3>My Bucket List</h3>
      {bucketList.map((park, index) => (
        <div key={index}>
          <span
            className='deleteX'
            parkcode={park.parkcode}
            onClick={handleDelete}
          >
            X
          </span>
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
