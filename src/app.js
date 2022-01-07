import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import ListOfStates from '../components/ListOfStates';
// import NavigationBar from '../components/NavBar';
import EachNationalParkByState from '../components/EachNationalParkByState';
import BucketList from '../components/BucketList';
import Map from '../components/Map';
import Trips from '../components/Trips';

function App() {
  const [parks, setParks] = useState([]);

  const [selectedState, setSelectedState] = useState('');
  // const [submitButtonPressedInENPBS, setSubmitButtonPressedInENPBS] = useState(0);
  const [bucketList, setBucketList] = useState([]);

  return (
    <Router>
      {/* <ListOfStates setSelectedState={setSelectedState} /> */}
      {/* <NavigationBar /> */}
      <Map parks={parks} selectedState={selectedState} setSelectedState={setSelectedState} />
      <EachNationalParkByState parks={parks} setParks={setParks} selectedState={selectedState} bucketList={bucketList} setBucketList={setBucketList} />
      <BucketList bucketList={bucketList} setBucketList={setBucketList} />
      <Trips />
    </Router>
  );
}

export default App;
//set state again(passing curr state, append condition, spread op)
//submitButtonPressedInENPBS={submitButtonPressedInENPBS}
//submitButtonPressedInENPBS={submitButtonPressedInENPBS} setSubmitButtonPressedInENPBS={setSubmitButtonPressedInENPBS} 