import React, { useRef, useState, useMemo, useEffect } from 'react';
import GooglePlaceAutoComplete from './components/GooglePlaceAutoComplete';
import MapWrapper from './components/MapWrapper';
import { Box } from '@mui/system';
import { Paper, AppBar, Toolbar, Typography } from '@mui/material';
import TopBar from './components/TopBar';

const App = () => {

  const [center, setCenter] = useState({ lat: 3.0803478, lng: 101.5827577 })
  const [map, setMap] = useState( /** @type google.maps.Map */(null))

  const centerMap = () => {
    map.panTo(center)
  }

  return (
    <>
      <Box height="100vh" display="flex" flexDirection="column">
        <TopBar title='Google Place' ></TopBar>
        <MapWrapper center={center} setMap={setMap} ></MapWrapper>
        <Paper sx={{ width: '300px', position: 'absolute', m: 2, top: 65 }} >
          <GooglePlaceAutoComplete setCenter={setCenter}></GooglePlaceAutoComplete>
        </Paper>
      </Box>
    </>
  );
}

export default App;
