import React, { useState } from 'react';
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
      <ListOfStates setSelectedState={setSelectedState} />
      <EachNationalParkByState selectedState={selectedState} />
      <BucketList />
      <Map />
      <Trips />
    </Router>
  );
}

export default App;
