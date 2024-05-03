import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import StopInfo from './StopInfo'; // Importa il componente StopInfo

import urbanBusUrl from './../images/bus-solid-u.svg';
import extraurbanBusUrl from './../images/bus-solid-e.svg';

const Map = ({ latitude, longitude }) => {
    const mapRef = useRef(null);
    const [fermate, setFermate] = useState([]);
    const [selectedStop, setSelectedStop] = useState(null); // Stato per memorizzare le informazioni sulla fermata selezionata

    useEffect(() => {
        // Create map instance
        mapRef.current = L.map('map', {
            center: [latitude, longitude],
            zoom: 14,
            zoomControl: false
        });

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);

        // Fai la richiesta axios a localhost:4000/fermate
        axios.get('https://trentinotrasportibackend.netlify.app/.netlify/functions/server/v1/fermate')
            .then(response => {
                setFermate(response.data);
            })
            .catch(error => {
                console.error('Error fetching fermate:', error);
            });

        return () => {
            // Clean up map instance when component unmounts
            mapRef.current.remove();
        };
    }, [latitude, longitude]);

    useEffect(() => {
        if (mapRef.current) {
            // Impostazione dell'icona personalizzata del marker
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

            // Aggiungi marcatori per ogni fermata sulla mappa
            fermate.forEach((fermata) => {
                if((Math.abs(latitude - fermata.lat) < 0.03) && (Math.abs(longitude - fermata.lon) < 0.03)){
                    const marker = L.marker([fermata.lat, fermata.lon], { icon: (fermata.type === "U") ? urbanMarker : extraurbanMarker, className: 'custom-marker-icon' })
                    .addTo(mapRef.current);

                    // Aggiungi un gestore per l'evento di click sul marker
                    marker.on('click', () => {
                        setSelectedStop(fermata); // Memorizza le informazioni sulla fermata selezionata nello stato
                    });

                    // marker.bindPopup(`<b>${fermata.name}</b><br>${fermata.id}`);
                }
            });
        }
    }, [fermate,latitude, longitude]);

    return (
        <div>
            <div id="map"></div>
            {selectedStop && <StopInfo stop={selectedStop} onClose={() => setSelectedStop(null)} />} {/* Renderizza il componente StopInfo se una fermata è stata selezionata */}
        </div>
    );
};

export default Map;