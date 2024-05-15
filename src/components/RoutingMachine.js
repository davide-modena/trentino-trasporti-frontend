import React, { useEffect } from 'react';
import L from 'leaflet';
import Routing from 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';

const RoutingMachine = () => {
    const map = useMap();
    useEffect(() => {
        L.Routing.control({
            waypoints: [L.latLng(57.64, 11.94), L.latLng(57.54, 11.949)]
        }).addTo(map);
    },[]);
    return null;
}
 
export default RoutingMachine;