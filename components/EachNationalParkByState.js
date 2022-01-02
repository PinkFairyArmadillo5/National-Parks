import React, { useEffect, useState, useRef } from 'react';

function EachNationalParkByState({ selectedState }) {
  //each state has more than one national park
  //function to return all
  const [parks, setParks] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const dontFetchOnFirstRender = useRef(false);
  const handleOnChange = (position, parkData) => {
    const deepCopy = [...checkedState];
    // deepCopy[position] = !deepCopy[position];
    if (deepCopy[position] === false) {
      deepCopy[position] = parkData;
    } else {
      deepCopy[position] = false;
    }

    console.log('this updatedCheckedState', deepCopy);
    setCheckedState(deepCopy);
  };

  const handleOnClick = () => {
    console.log('clicked Add to Bucketlist');
    let dataArr = [];
    checkedState.forEach((el) => {
      if (el !== false) {
        dataArr.push(el);
      }
    });
    console.log(dataArr);
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
    fetch('/db/put-bucketlist', postOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log('this is data', data);
      });
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
      fetch('http://localhost:3000/get-state-parks', postOptions)
        .then((res) => res.json())
        .then((data) => {
          setParks(data);
          console.log('data from ext API: ', data);
          const arr = [];
          arr.length = data.length;
          arr.fill(false);
          setCheckedState(arr);
          console.log('line 38:', checkedState);
        });
    } else {
      dontFetchOnFirstRender.current = true;
    }
  }, [selectedState]);

  return (
    <div className='scrollList'>
      <h2>List of National Parks in STATE</h2>
      <div className='ListofParks'>
        {parks.map((park, index) => (
          <label>
            <input
              type='checkbox'
              id={index}
              key={index}
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
