import React, { useState } from 'react';
// updated by Jess
// import React, { component} from 'react';
// updated by Jess
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


// import ListOfStates from '../components/ListOfStates';
// import NavigationBar from '../components/NavBar';
import EachNationalParkByState from '../components/EachNationalParkByState';
import BucketList from '../components/BucketList';
import Map from '../components/Map';
import Trips from '../components/Trips';
import SignUp from '../components/signUp';
import Login from '../components/login';

function App() {
  const [parks, setParks] = useState([]);

  const [selectedState, setSelectedState] = useState('');
  const [rerenderBucketList, setRerenderBucketList] = useState(0);
  const [bucketList, setBucketList] = useState([]);

  return ( 
 <Router>
       <Link to="/login">LOGIN</Link> 
      {/* <ListOfStates setSelectedState={setSelectedState} />  */}
      <Routes>

      <Route exact path="/login" component={Login} /> 

      </Routes>
      {/* <Login /> */}
      <Map parks={parks} setSelectedState={setSelectedState} />
      <EachNationalParkByState
        parks={parks}
        setParks={setParks}
        selectedState={selectedState}
        bucketList={bucketList}
        setBucketList={setBucketList}
        rerenderBucketList={rerenderBucketList}
        setRerenderBucketList={setRerenderBucketList}
      />
      <BucketList
        bucketList={bucketList}
        setBucketList={setBucketList}
        rerenderBucketList={rerenderBucketList}
        setRerenderBucketList={setRerenderBucketList}
      />
      <Trips /> 
    
    </Router>
  
  );
}

export default App;
//set state again(passing curr state, append condition, spread op)
//submitButtonPressedInENPBS={submitButtonPressedInENPBS}
//submitButtonPressedInENPBS={submitButtonPressedInENPBS} setSubmitButtonPressedInENPBS={setSubmitButtonPressedInENPBS}
