import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { BsX } from 'react-icons/bs';

function EachNationalParkByState({
  parks,
  setParks,
  selectedState,
  bucketList,
  setBucketList,
  rerenderBucketList,
  setRerenderBucketList,
  showENPBS,
  setShowENPBS,
}) {
  //each state has more than one national park
  //function to return all
  // const [showENPBS, setShowENPBS] = useState(false);
  const [checkedState, setCheckedState] = useState([]);
  // const dontFetchOnFirstRender = useRef(false);
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
        state: selectedState,
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
    setCheckedState(new Array(checkedState.length).fill(false));
  };

  useEffect(async () => {
    if (selectedState) {
      // if (dontFetchOnFirstRender.current === true) {
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
          const filterOutParksOnlyInState = data.filter(
            (x) => x.addresses[0].stateCode === selectedState
          );
          setParks(filterOutParksOnlyInState);
          console.log('data from ext API: ', data);
          setCheckedState(new Array(data.length).fill(false));
          // console.log('line 38:', checkedState);
        });
    }
    // } else {
    //   dontFetchOnFirstRender.current = true;
    // }
  }, [selectedState]);

  return (
    showENPBS && (
      <div className='each-park-by-state'>
        <BsX style={{ float: 'right' }} onClick={() => setShowENPBS(false)} />
        <h3>National Parks{selectedState && ' in ' + selectedState}</h3>
        <div className='ListofParks'>
          {parks.map((park, index) => (
            <div key={index} title={park.description}>
              <label>
                <input
                  type='checkbox'
                  className='park-checkbox'
                  name={park.fullName}
                  value={park.fullName}
                  onChange={() => {
                    handleOnChange(index, park);
                  }}
                  checked={checkedState[index]}
                />
                <span className='popupParks'>
                  {park.fullName}, {selectedState}
                </span>
              </label>
            </div>
          ))}
        </div>
        <button className='addToBL' onClick={handleOnClick}>
          Add to Bucket List
        </button>
      </div>
    )
  );
}

export default EachNationalParkByState;
