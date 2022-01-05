import React, { useState, useEffect, useCallback } from 'react';
import ReactMapGL from 'react-map-gl';
import EachNationalParkByState from './EachNationalParkByState';


function Map({ selectedState, bucketList, setBucketList }) {
  const [mouseIsOnWhichState, setMouseIsOnWhichState] = useState();
  const [hoverInfo, setHoverInfo] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 37.0902,
    longitude: -95.7129,
    width: '98vw',
    height: '100vh',
    zoom: 4,
  })

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson'
    )
      .then(resp => resp.json())
      .then(json => setMouseIsOnWhichState(json));
  }, []);

  const onHover = useCallback(event => {
    // console.log(event.features)
    const {
      features,
      srcEvent: { offsetX, offsetY }
    } = event;
    const hoveredFeature = features && features[0];
    setHoverInfo(
      hoveredFeature
        ? {
          feature: hoveredFeature,
          x: offsetX,
          y: offsetY
        }
        : null
    );
    console.log(hoveredFeature)
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
      mapStyle='mapbox://styles/mapbox/outdoors-v11'
      onViewportChange={setViewport}
      onHover={onHover}
    // interactiveLayerIds={['data']}
    >
      <EachNationalParkByState selectedState={selectedState} bucketList={bucketList} setBucketList={setBucketList} />
      {hoverInfo && (
        <div className="onhover-bubble" style={{ left: hoverInfo.x, top: hoverInfo.y }}>
          <div>State: {hoverInfo.feature.properties.name}</div>
        </div>
      )}
    </ReactMapGL>
  );
}

export default Map;
