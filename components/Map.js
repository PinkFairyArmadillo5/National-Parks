import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MapGL, { Source, Layer, Popup, Marker } from 'react-map-gl';
import axios from 'axios';
import { abbr } from 'us-state-converter';
import { BsPinFill as Pin } from "react-icons/bs";
import { IconContext } from "react-icons";

function Map({ parks, selectedState, setSelectedState }) {
  const [statePolygons, setStatePolygons] = useState();
  const [hoverInfo, setHoverInfo] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 37.0902,
    longitude: -95.7129,
    width: '98vw',
    height: '100vh',
    zoom: 4,
  })

  useEffect(async () => {
    const { data } = await axios.get('https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson');
    setStatePolygons(data);
  }, []);

  const onHover = useCallback(event => {
    const {
      features,
      srcEvent: { offsetX, offsetY },
      lngLat: [longitude, latitude]
    } = event;
    const hoveredFeature = features && features[0];
    // console.log(hoveredFeature)
    setHoverInfo(
      hoveredFeature?.properties.income
        ? {
          feature: hoveredFeature,
          x: offsetX,
          y: offsetY,
          longitude,
          latitude
        }
        : null
    );

  }, []);

  const handleOnClick = () => {
    const abbrStateName = abbr(hoverInfo?.feature.properties.name);
    abbrStateName.length === 2 && setSelectedState(abbrStateName)
    //want to implement:
    //zoom to clicked U.S. state
    //highlight selected U.S. state to a darker blue hue
    //put pins on all parks on selected U.S. state
  }
  // const filter = useMemo(() => ['New York'], []);

  const markers = parks && useMemo(() => parks.map(
    park => (
      <IconContext.Provider value={{ color: 'crimson', size: '1.5em' }}>
        <Marker key={park.fullName} longitude={Number(park.longitude)} latitude={Number(park.latitude)} >
          <Pin />
        </Marker>
      </IconContext.Provider>
    )
  ), [parks]);

  const layerStyle = {
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': '#3288bd',
      'fill-opacity': 0.4,
    },
  };

  const layerStyle2 = {
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': '#3288bd',
      'fill-opacity': 0.8,
    },
  };

  return (
    <MapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
      mapStyle='mapbox://styles/mapbox/outdoors-v11'
      onViewportChange={setViewport}
      onHover={onHover}
      onClick={handleOnClick}
    >
      <Source type="geojson" data={statePolygons}>
        <Layer {...layerStyle} />
        {/* <Layer beforeId="waterway-label" {...layerStyle2} filter={filter} /> */}
      </Source>
      {markers}
      {hoverInfo?.feature.properties.name && (
        <Popup
          className='onhover-popup'
          longitude={hoverInfo.longitude}
          latitude={hoverInfo.latitude}
          closeButton={false}
        >
          {hoverInfo.feature.properties.name}
        </Popup>
      )}
    </MapGL>
  );
}

export default Map;
