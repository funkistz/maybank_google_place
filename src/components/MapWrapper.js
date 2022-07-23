import React, { useRef, useState, useMemo } from 'react';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, OverlayView } from '@react-google-maps/api'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { Box } from '@mui/system';
import { Typography, Fab } from '@mui/material';

export default function MapWrapper({ center, setMap }) {

    const [libraries] = useState(['places']);

    /** disable as we already load it at indexed.html */
    // const { isLoaded, loadError } = useJsApiLoader({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_APIS_KEY,
    //     libraries
    // })

    return (
        <>
            <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
                onLoad={map => setMap(map)}
            >
                {/* <Marker position={center} label='you area here'></Marker> */}
                <OverlayView
                    position={center}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ backgroundColor: 'white', opacity: 0.95, borderRadius: 2 }}>
                            You are here
                        </Typography>
                        <PersonPinCircleIcon sx={{ fontSize: 40, color: 'red' }} />
                    </Box>
                </OverlayView>
            </GoogleMap>

        </>
    )
}
