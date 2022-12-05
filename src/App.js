/*
References:
- Followed this tutorial: https://deck.gl/docs/get-started/using-with-react
*/

import React from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
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

// Data to be used by the ScatterplotLayer
const data = [
  {
    name: 'Acadia',
    location: [-68.21, 44.35]
  },
  {
    name: 'American Samoa',
    location: [-170.68, -14.25]
  }
];

// DeckGL react component
function App() {
  const layers = [
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 100,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: d => d.location,
      getRadius: d => 90,
      getFillColor: d => [88, 129, 87],
      getLineColor: d => [0, 0, 0]
    })
  ];

  const style = 'mapbox://styles/mapbox/light-v9'

  return <DeckGL
    initialViewState={INITIAL_VIEW_STATE}
    controller={true}
    layers={layers}
    getTooltip={({object}) => object && `${object.name}`}
    >
      <Map
        reuseMaps
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle={style}
      />
    </DeckGL>
}

export default App;
