import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'; // Assicurati di importare il CSS di leaflet-routing-machine
import axios from 'axios';
import Routing from 'leaflet-routing-machine';

const Map2 = ({ latitude, longitude }) => {
    const mapRef = useRef('');
    const [waypoints, setWaypoints] = useState([]);

    useEffect(() => {
        if(!mapRef.current){
            mapRef.current = L.map('map', {
                center: [46, 11],
                zoom: 14,
                zoomControl: false
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);

            getWaypoints(4024,2584)
                .then(waypoints => {
                    setWaypoints(waypoints);
                    console.log(waypoints);
                })
                .catch(error => {
                    console.error(error);
                });
        }

        return () => {
            // Cleanup
        };
    }, []);

    useEffect(() => {
        if (waypoints.length > 0) {
            const routingControl = L.Routing.control({
                waypoints: waypoints,
                lineOptions: {
                    styles: [{color: 'var(--blue)', opacity: 1, weight: 6}]
                }
            }).addTo(mapRef.current);

            const defaultIcon = L.icon({
                iconUrl: require('leaflet/dist/images/marker-icon.png'),
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
                shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
                shadowSize: [41, 41],
            });

            waypoints.forEach(waypoint => {
                L.marker([waypoint[0],waypoint[1]], { icon: defaultIcon }).addTo(mapRef.current);
            });

            return () => {
                mapRef.current.removeControl(routingControl);
            };
        }
    }, [waypoints]);

    async function getWaypoints(start,arrival) {
        try {
          const response = await axios.get(`https://trentinotrasportibackend.netlify.app/.netlify/functions/server/v1/viaggi?start=${start}&arrival=${arrival}`);
          let result = [];
          response.data[0].forEach(line => {
            if(line.stazioni){
                let coordinates = [line.stazioni.arrivo.lat,line.stazioni.arrivo.lon];
                result.push(coordinates);
                coordinates = [line.stazioni.partenza.lat,line.stazioni.partenza.lon];
                result.push(coordinates);
            }
          });
          return result;
        } catch (error) {
          console.error(error);
        }
    }

    return (
        <div>
            <div id="map"></div>
        </div>
    );
};

export default Map2;