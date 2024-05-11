import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Map from './components/Map';
import Footer from './components/Footer';
import FunctionIcons from './components/FunctionIcons';

const App = () => {
    const [isPianifica, setIsPianifica] = useState(false);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const location = { lat: position.coords.latitude, lon: position.coords.longitude };
                setLocation(location);
            });
        } else {
            // Se la geolocalizzazione non è disponibile, imposta una posizione predefinita
            const defaultLocation = { lat: 46.0664228, lon: 11.1257601 };
            setLocation(defaultLocation);
        }
    }, []);

    return (
        <div>
            <Search isPianifica={isPianifica}/>
            <FunctionIcons isPianifica={isPianifica} setIsPianifica={setIsPianifica} />
            {location && <Map latitude={location.lat} longitude={location.lon} />}
            <Footer/>
        </div>
    );
};

export default App;