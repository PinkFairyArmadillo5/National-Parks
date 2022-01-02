import React, { useEffect, useState } from 'react';

function BucketList() {
  const [bucketList, setBucketList] = useState([]);

  useEffect(
    () => {
      const bucketList = `/db`;
      fetch(bucketList)
        .then((res) => res.json())
        .then((updatedBL) => {
          console.log('updated Bucket List: ', updatedBL);
          setBucketList(updatedBL);
          console.log(updatedBL);
        });
    },
    [
      /*bucketList*/
    ]
  );

  return (
    <div>
      <h3>My Bucket List</h3>

      {bucketList.map((park) => {
        return <div>{park.parkname}</div>;
      })}
    </div>
  );
}

export default BucketList;
