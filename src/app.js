import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ListOfStates from '../components/ListOfStates';
import EachNationalParkByState from '../components/EachNationalParkByState';
import BucketList from '../components/BucketList';
import Map from '../components/Map';
import Trips from '../components/Trips';

function App() {
  const [selectedState, setSelectedState] = useState('');

  return (
    <Router>
      <ListOfStates
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />
      <EachNationalParkByState/>
      <BucketList/>
      <Map/>
      <Trips/>
    </Router>
  );
}

export default App;
