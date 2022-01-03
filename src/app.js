import React, { useState, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ListOfStates from '../components/ListOfStates';
import EachNationalParkByState from '../components/EachNationalParkByState';
import BucketList from '../components/BucketList';
import Map from '../components/Map';
import Trips from '../components/Trips';

function App() {
  const [selectedState, setSelectedState] = useState('');
  const [submitButtonPressedInENPBS, setSubmitButtonPressedInENPBS] = useState(0)

  return (
    <Router>
      <ListOfStates setSelectedState={setSelectedState} />
      <EachNationalParkByState selectedState={selectedState} submitButtonPressedInENPBS={submitButtonPressedInENPBS} setSubmitButtonPressedInENPBS={setSubmitButtonPressedInENPBS}/>
      <BucketList submitButtonPressedInENPBS={submitButtonPressedInENPBS}/>
      <Map />
      <Trips />
    </Router>
  );
}

export default App;
