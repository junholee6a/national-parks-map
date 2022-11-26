/*
References:
- Followed this tutorial: https://deck.gl/docs/get-started/using-with-react
*/

import React from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import {Map} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import apiKey from './api-key.json';

const MAPBOX_ACCESS_TOKEN = apiKey.key;

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [
  {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
];

// DeckGL react component
function App() {
  const layers = [
    new LineLayer({id: 'line-layer', data})
  ];

  const style = 'mapbox://styles/mapbox/light-v9'

  return <DeckGL
    initialViewState={INITIAL_VIEW_STATE}
    controller={true}
    layers={layers}
    >
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle={style}
      />
    </DeckGL>
}

export default App;
