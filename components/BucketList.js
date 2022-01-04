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
  }, []
  );

  return (
    <div>
      <h3>My Bucket List</h3>
      {bucketList.map((park, index) => (
        <div key={index}>{park.parkname}</div>
      )
      )}
    </div>
  );
}

export default BucketList;