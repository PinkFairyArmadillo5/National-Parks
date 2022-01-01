import React, { useEffect, useState, useRef } from 'react';

function EachNationalParkByState({ selectedState }) {
  //each state has more than one national park
  //function to return all
  const [parks, setParks] = useState([]);
  const dontFetchOnFirstRender = useRef(false);
  useEffect(() => {
    if (dontFetchOnFirstRender.current === true) {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          state: selectedState
        })
      }

      fetch('http://localhost:3000/get-state-parks', postOptions)
      .then(res => res.json())
      .then(data => setParks(data))
    } else {
      dontFetchOnFirstRender.current = true;
    }
  }, [selectedState])
  return (
    <div className='scrollList'>
      <h2>List of National Parks in STATE</h2>
      <div className='ListofParks'>
        {parks.map((park, index) => (
          <label>
            <input
              type='checkbox'
              id={index}
              name={park.fullName}
              value={park.fullName}
              />
            <h3>{park.fullName} </h3>
            <h4>{park.description}</h4>
          </label>
        ))}
      </div>
    </div>
    // <div className='scrollList'>
    //   <h2>List of National Parks in STATE</h2>
    //   <div className='ListofParks'>
    //     <div>
    //       List of National Parks
    //       <div>FullName of Park</div>
    //       <div>descriptionShort</div>
    //       <input type='checkbox'></input>
    //     </div>

    //     <div>
    //       List of National Parks
    //       <div>FullName of Park</div>
    //       <div>descriptionShort</div>
    //       <input type='checkbox'></input>
    //     </div>

    //     <div>
    //       List of National Parks
    //       <div>FullName of Park</div>
    //       <div>descriptionShort</div>
    //       <input type='checkbox'></input>
    //     </div>

    //     <div>
    //       List of National Parks
    //       <div>FullName of Park</div>
    //       <div>descriptionShort</div>
    //       <input type='checkbox'></input>
    //     </div>

    //     <div>
    //       List of National Parks
    //       <div>FullName of Park</div>
    //       <div>descriptionShort</div>
    //       <input type='checkbox'></input>
    //     </div>

    //     <div>
    //       List of National Parks
    //       <div>FullName of Park</div>
    //       <div>descriptionShort</div>
    //       <input type='checkbox'></input>
    //     </div>
    //   </div>
    //   <div>
    //     <button>Bucket List</button>
    //   </div>
    // </div>
  );
}

export default EachNationalParkByState;
