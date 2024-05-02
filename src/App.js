import React from 'react';
import Search from './components/Search';
import Map from './components/Map';
import Footer from './components/Footer';

const App = () => {
    const latitude = 46.0664228;
    const longitude = 11.1257601;

    return (
        <div>
            <Search/>
            <Map latitude={latitude} longitude={longitude} />
            <Footer/>
        </div>
    );
};

export default App;