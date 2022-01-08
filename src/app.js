import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import ListOfStates from '../components/ListOfStates';
// import NavigationBar from '../components/NavBar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Fab, Action } from 'react-tiny-fab';
import EachNationalParkByState from '../components/EachNationalParkByState';
import BucketList from '../components/BucketList';
import Map from '../components/Map';
import { GiFishBucket, GiMountainCave } from 'react-icons/gi';
import { IconContext } from 'react-icons';
// import Trips from '../components/Trips';
import '../src/index.css';

function App() {
  const [parks, setParks] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [rerenderBucketList, setRerenderBucketList] = useState(0);
  const [bucketList, setBucketList] = useState([]);
  const [bucketVisibility, setBucketVisibility] = useState(false);
  const [showENPBS, setShowENPBS] = useState(false);

  return (
    <Router>
      {/* <ListOfStates setSelectedState={setSelectedState} /> */}
      <Map parks={parks} setSelectedState={setSelectedState} />
      <EachNationalParkByState
        parks={parks}
        setParks={setParks}
        selectedState={selectedState}
        bucketList={bucketList}
        setBucketList={setBucketList}
        rerenderBucketList={rerenderBucketList}
        setRerenderBucketList={setRerenderBucketList}
        showENPBS={showENPBS}
        setShowENPBS={setShowENPBS}
      />
      <Modal
        show={bucketVisibility}
        onHide={() => setBucketVisibility(false)}
        size='md'
        centered
      >
        <Modal.Header>
          <Modal.Title className='bucketlistTitle'>My Bucket List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BucketList
            bucketList={bucketList}
            setBucketList={setBucketList}
            rerenderBucketList={rerenderBucketList}
            setRerenderBucketList={setRerenderBucketList}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setBucketVisibility(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Fab
        icon='+'
        mainButtonStyles={{
          backgroundColor: '#FF6347',
          width: '50px',
          height: '50px',
        }}
      >
        <Action
          className='openBLbutton'
          text='Open Bucket List'
          onClick={() => setBucketVisibility(true)}
          style={{ backgroundColor: '#ff4c4c', color: 'rgb(35, 104, 152)' }}
        >
          <IconContext.Provider value={{ color: 'black' }}>
            <GiFishBucket />
          </IconContext.Provider>
        </Action>
        <Action
          className='openParkByStatebutton'
          text='Open Park By State'
          onClick={() => setShowENPBS(true)}
          style={{ backgroundColor: '#ff4c4c', color: 'rgb(35, 104, 152)' }}
        >
          <IconContext.Provider value={{ color: 'black' }}>
            <GiMountainCave />
          </IconContext.Provider>
        </Action>
      </Fab>
      {/* <Trips /> */}
    </Router>
  );
}

export default App;
//set state again(passing curr state, append condition, spread op)
//submitButtonPressedInENPBS={submitButtonPressedInENPBS}
//submitButtonPressedInENPBS={submitButtonPressedInENPBS} setSubmitButtonPressedInENPBS={setSubmitButtonPressedInENPBS}
