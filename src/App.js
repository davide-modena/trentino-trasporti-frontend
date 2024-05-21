import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Map from './components/Map';
import RouteMap from './components/RouteMap';
import Footer from './components/Footer';
import FunctionIcons from './components/FunctionIcons';
import Login from './components/Login';

import TestRouting from './components/TestRouting';

const App = () => {
    const [isPianifica, setIsPianifica] = useState(false);
    const [routePianifica, setRoutePianifica] = useState(null);
    const [location, setLocation] = useState(null);
    const [recenter, setRecenter] = useState(null);

    const [selectedStop, setSelectedStop] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const location = { lat: position.coords.latitude, lon: position.coords.longitude };
                setLocation(location);
            }, showError);
        } else {
            // Se la geolocalizzazione non è disponibile, imposta una posizione predefinita
            const defaultLocation = { lat: 46.0664228, lon: 11.1257601 };
            setLocation(defaultLocation);
        }

        function showError(error) {
            // switch(error.code) {
            //   case error.PERMISSION_DENIED:
            //     alert("User denied the request for Geolocation.")
            //     break;
            //   case error.POSITION_UNAVAILABLE:
            //     alert("Location information is unavailable.")
            //     break;
            //   case error.TIMEOUT:
            //     alert("The request to get user location timed out.")
            //     break;
            //   case error.UNKNOWN_ERROR:
            //     alert("An unknown error occurred.")
            //     break;
            // }
            const defaultLocation = { lat: 46.0664228, lon: 11.1257601 };
            setLocation(defaultLocation);
          }
    }, []);


    return (
        <div>
            <Search isPianifica={isPianifica} setRoutePianifica={setRoutePianifica} setSelectedStop={setSelectedStop}/>
            <FunctionIcons isPianifica={isPianifica} setIsPianifica={setIsPianifica} setRoutePianifica={setRoutePianifica} routePianifica={routePianifica}/>
            {location && (!routePianifica ? (
                <Map latitude={location.lat} longitude={location.lon} selectedStop={selectedStop} setSelectedStop={setSelectedStop}/>
            ) : (
                <RouteMap routePianifica={routePianifica}/>
            ))}
            {/* <Login/> */}
        </div>
    );
};

export default App;