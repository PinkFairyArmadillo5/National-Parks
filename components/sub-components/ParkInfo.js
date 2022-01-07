import React from 'react';

const centerStyle = {
  display: 'block',
  'margin-left': 'auto',
  'margin-right': 'auto',
}



function ParkInfo({ park }) {
  const location = `${park.addresses[0].city}, ${park.addresses[0].stateCode}`;

  return (
    <div >
      <div>
        <div style={{ ...centerStyle, paddingTop: '6px', paddingLeft: '6px', paddingRight: '6px', 'font-weight': 'bold' }}>{park.fullName}</div>
        {/* {location + ' ' || ''} */}
        <a
          target="_new"
          href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${location}`}
          style={{ ...centerStyle, paddingBottom: '6px', paddingLeft: '6px', paddingRight: '6px', 'font-weight': 'bold' }}
        >
          {location}
        </a>
      </div>
      <img width={240} src={park.images[0].url} style={centerStyle} />
    </div>
  );
}

export default React.memo(ParkInfo);