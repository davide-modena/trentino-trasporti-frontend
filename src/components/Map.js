import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import StopInfo from './StopInfo'; // Importa il componente StopInfo
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Loading from './Loading';

import urbanBusUrl from './../images/bus-solid-u.svg';
import extraurbanBusUrl from './../images/bus-solid-e.svg';

const Map = ({ latitude, longitude }) => {
    const [fermate, setFermate] = useState([]);
    const [selectedStop, setSelectedStop] = useState(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        axios.get('https://trentinotrasportibackend.netlify.app/.netlify/functions/server/v1/fermate')
            .then(response => {
                setFermate(response.data);
            })
            .catch(error => {
                console.error('Error fetching fermate:', error);
            });
    }, []);

    const urbanMarker = L.icon({
        iconUrl: urbanBusUrl,
        iconSize: [35, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    });

    const extraurbanMarker = L.icon({
        iconUrl: extraurbanBusUrl,
        iconSize: [35, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    });

    const recenterMap = () => {
        if (map) {
            map.setView([latitude, longitude], map.getZoom());
        }
    };

    return (
        <div>
            <MapContainer center={[latitude, longitude]} zoom={14} minZoom={8} id="map" whenCreated={setMap}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {fermate.length > 0 ? (
                    <MarkerClusterGroup maxClusterRadius={50}>
                        {fermate.map((fermata, index) => (
                            <Marker
                                key={index}
                                position={[fermata.lat, fermata.lon]}
                                icon={(fermata.type === "U") ? urbanMarker : extraurbanMarker}
                                eventHandlers={{
                                    click: () => {
                                        setSelectedStop(fermata);
                                    }
                                }}
                            />
                        ))}
                    </MarkerClusterGroup>
                ) : (
                    <Loading/>
                )}
            </MapContainer>
            {selectedStop && <StopInfo stop={selectedStop} onClose={() => setSelectedStop(null)} />}
        </div>
    );
};

export default Map;