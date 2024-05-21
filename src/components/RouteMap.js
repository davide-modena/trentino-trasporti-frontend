import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'; // Import the CSS of leaflet-routing-machine
import axios from 'axios';
import 'leaflet-routing-machine';

import Loading from './Loading';

// Fix for default icon issue with Webpack
import icon from './../images/bus-solid-e.svg';

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

L.Marker.prototype.options.icon = DefaultIcon;

const RouteMap = ({ routePianifica }) => {
    const mapRef = useRef(null);
    const [waypoints, setWaypoints] = useState([]);

    useEffect(() => {
        try {
            if (!mapRef.current) {
                mapRef.current = L.map('map', {
                    center: [46, 11],
                    zoom: 12,
                    zoomControl: false
                });

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);                

                getWaypoints(routePianifica.start, routePianifica.arrival)
                    .then(waypoints => {
                        setWaypoints(waypoints);
                    })
                    .catch(error => {
                        console.error('Error fetching waypoints:', error);
                    });
            }
        } catch (error) {
            console.error('Error initializing map:', error);
        }

        return () => {
            try {
                // Cleanup
                if (mapRef.current) {
                    mapRef.current.off();
                    mapRef.current.remove();
                    mapRef.current = null;
                }
            } catch (error) {
                console.warn('Ignoring error during map cleanup:', error);
            }
        };
    }, [routePianifica]);

    useEffect(() => {
        try {
            if (waypoints.length > 0 && mapRef.current) {
                const routingControl = L.Routing.control({
                    waypoints: waypoints.map(wp => L.latLng(wp[0], wp[1])),
                    fitSelectedRoutes: true,
                    lineOptions: {
                        addWaypoints: false,
                        styles: [{ color: 'var(--blue)', opacity: 1, weight: 6 }]
                    },
                    createMarker: function () { return null; }
                }).addTo(mapRef.current);

                waypoints.forEach(waypoint => {
                    L.marker([waypoint[0], waypoint[1]], { icon: DefaultIcon }).addTo(mapRef.current);
                });

                return () => {
                    try {
                        if (mapRef.current) {
                            mapRef.current.removeControl(routingControl);
                        }
                    } catch (error) {
                        console.warn('Ignoring removeLayer error during routing control cleanup:', error);
                    }
                };
            }
        } catch (error) {
            console.error('Error setting up routing control:', error);
        }
    }, [waypoints]);

    async function getWaypoints(start, arrival) {
        try {
            const response = await axios.get(`https://trentinotrasportibackend.netlify.app/.netlify/functions/server/v1/viaggi?start=${start}&arrival=${arrival}`);
            console.log(response.data);
            let result = [];
            response.data[0].forEach(line => {
                if (line.stations) {
                    let coordinates = [line.stations.arrival.lat, line.stations.arrival.lon];
                    result.push(coordinates);
                    coordinates = [line.stations.departure.lat, line.stations.departure.lon];
                    result.push(coordinates);
                }
            });
            return result;
        } catch (error) {
            console.error('Error fetching waypoints from API:', error);
            return [];
        }
    }

    return (
        <div>
            <div id="map" style={{ height: '100vh', width: '100%' }}></div>
        </div>
    );
};

export default RouteMap;
