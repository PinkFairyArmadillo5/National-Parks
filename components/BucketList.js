import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

function BucketList({
  bucketList,
  setBucketList,
  rerenderBucketList,
  setRerenderBucketList,
}) {
  // const [bucketList, setBucketList] = useState([]);

  // const [updatedBucketList, setUpdatedBucketList] = useState();

  useEffect(() => {
    const bucketListQuery = `/db/initial-render`;
    fetch(bucketListQuery)
      .then((res) => res.json())
      .then((updatedBL) => {
        // console.log('updated Bucket List: ', updatedBL);
        setBucketList(updatedBL);
        console.log('BucketList.js line 13', updatedBL);
      });
  }, [rerenderBucketList]);

  // const handleOnChange

  const handleDelete = (park) => {
    const deletedPark = park.parkcode;
    console.log('line 29', deletedPark);

    const index = bucketList.indexOf(park);
    console.log('line 25', index);

    const deepCopyBL = [...bucketList];

    deepCopyBL.splice(index, 1);
    console.log('line 29 after SPLICE', deepCopyBL);

    setBucketList(deepCopyBL);
    console.log('new bucketlist', bucketList);

    fetch('/db/deletePark', {
      method: 'DELETE',
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
        //next({ log: err });
      });
    setRerenderBucketList(++rerenderBucketList);
    // setUpdatedBucketList(deepCopyBL);
  };

  return (
    <div className='bucketlist'>
      <h3>My Bucket List</h3>
      <div className='parkname'>
        {bucketList.map((park, index) => (
          <div key={index}>
            <button
              className='deleteX'
              park={park.parkname}
              onClick={() => {
                handleDelete(park);
              }}
            >
              <FaTrash />
            </button>
            {park.parkname}
          </div>
        ))}
      </div>
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
