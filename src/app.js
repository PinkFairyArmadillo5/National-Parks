import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ListOfStates from '../components/ListOfStates';
import EachNationalParkByState from '../components/EachNationalParkByState';
import BucketList from '../components/BucketList';
import Map from '../components/Map';
import Trips from '../components/Trips';
import SignUp from './../components/signUp'

function App() {
  const [selectedState, setSelectedState] = useState('');
  // const [submitButtonPressedInENPBS, setSubmitButtonPressedInENPBS] = useState(0);
  const [bucketList, setBucketList] = useState([]);

  return (
    <Router>
      {/* <SignUp/> */}
      <ListOfStates setSelectedState={setSelectedState} />
      <EachNationalParkByState selectedState={selectedState} bucketList={bucketList} setBucketList={setBucketList} />
      <BucketList bucketList={bucketList} setBucketList={setBucketList} />
      <Map />
      <Trips />
    </Router>
  );
}

export default App;
//set state again(passing curr state, append condition, spread op)
//submitButtonPressedInENPBS={submitButtonPressedInENPBS}
//submitButtonPressedInENPBS={submitButtonPressedInENPBS} setSubmitButtonPressedInENPBS={setSubmitButtonPressedInENPBS} 