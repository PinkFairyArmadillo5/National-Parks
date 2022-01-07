import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

function EachNationalParkByState({
  selectedState,
  bucketList,
  setBucketList,
  rerenderBucketList,
  setRerenderBucketList,
}) {
  //each state has more than one national park
  //function to return all
  const [parks, setParks] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const dontFetchOnFirstRender = useRef(false);
  const handleOnChange = (position, parkData) => {
    const deepCopy = [...checkedState];

    if (deepCopy[position] === false) {
      deepCopy[position] = parkData;
    } else {
      deepCopy[position] = false;
    }
    // console.log('this updatedCheckedState', deepCopy);
    setCheckedState(deepCopy);
  };

  const handleOnClick = () => {
    // console.log('clicked Add to Bucketlist');
    const dataArr = checkedState.filter((el) => el);
    // let dataArr = [];
    // checkedState.forEach((el) => {
    //   if (el !== false) {
    //     dataArr.push(el);
    //   }
    // });
    // console.log('log dataArr before put: ', dataArr);
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        bucketListParks: dataArr,
      }),
    };
    fetch('http://localhost:3000/db/put-bucketlist', postOptions)
      .then((res) => res.json())
      .then((data) => {
        setRerenderBucketList(++rerenderBucketList);
        // console.log('this is data', data);
      });
    // setSubmitButtonPressedInENPBS(++submitButtonPressedInENPBS);
    console.log('dataArr=', dataArr);
    // setBucketList([...bucketList, dataArr[0].fullName]);
    console.log('bucketList var on line 50: ', bucketList);
  };

  useEffect(() => {
    if (dontFetchOnFirstRender.current === true) {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          state: selectedState,
        }),
      };
      fetch('/get-state-parks', postOptions)
        .then((res) => res.json())
        .then((data) => {
          setParks(data);
          // console.log('data from ext API: ', data);
          setCheckedState(new Array(data.length).fill(false));
          // console.log('line 38:', checkedState);
        });
    } else {
      dontFetchOnFirstRender.current = true;
    }
  }, [selectedState]);

  return (
    <div className='scrollList'>
      <h2>List of National Parks in {selectedState}</h2>
      <div className='ListofParks'>
        {parks.map((park, index) => (
          <label key={index}>
            <input
              type='checkbox'
              // id={index}
              // key={index} //commented these out and put "key" in <label> instead. Warning no longer appears in browser console.
              name={park.fullName}
              value={park.fullName}
              onChange={() => {
                handleOnChange(index, park);
              }}
              checked={checkedState[index]}
            />
            <h3>{park.fullName} </h3>
            <h4>{park.description}</h4>
          </label>
        ))}
      </div>
      <button className='addToBL' onClick={handleOnClick}>
        Add to Bucket List
      </button>
    </div>
  );
}

export default EachNationalParkByState;
