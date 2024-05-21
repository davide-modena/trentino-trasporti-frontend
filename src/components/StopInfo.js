import './css/StopInfo.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faHeart, faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Loading from './Loading';

const StopInfo = ({ stop, onClose }) => {
    const [trips, setTrips] = useState(null);
    const colors = ['#A32525','#6325B2','#4CB18D','#2584A3'];

    useEffect(() => {
        //Fai la richiesta axios a localhost:4000/fermate
        axios.get('https://trentinotrasportibackend.netlify.app/.netlify/functions/server/v1/viaggi_fermata?stopId=' + stop.id)
            .then(response => {
                if(Array.isArray(response.data[0])){
                    setTrips(response.data[0])
                }
                else{
                    setTrips(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching fermate:', error);
            });
    }, [stop])

    const getRandomColor = (tripId) => {
        const randomIndex = tripId % 4;
        return colors[randomIndex];
    };

    const handleHeartClick = (event) => {
        const iconElement = event.target;
        iconElement.classList.toggle('selected');
    };

    const handleCloseIcon = () => {
        onClose();
    }

    function formatTime(timestamp) {
        // Crea un oggetto data dal timestamp
        const date = new Date(timestamp);
        // Ottieni le ore e i minuti dall'oggetto data
        const hours = date.getHours().toString().padStart(2, '0'); // Aggiungi lo zero iniziale se necessario
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Aggiungi lo zero iniziale se necessario
        // Restituisci l'ora formattata come "hh:mm"
        return `${hours}:${minutes}`;
    }

    return (
        <div className="stop-info-container">
            <FontAwesomeIcon icon={faXmark} className="icon close-icon" onClick={handleCloseIcon}/>
            <div className="stop-info">
                <h1>Dettagli Fermata</h1>
                <div className="stop-container">
                    <div className="type">
                        <FontAwesomeIcon icon={faBus} className={`icon ${stop.type === 'U' ? 'urban' : 'extraurban'}`} />
                    </div>
                    <div className="details">
                        <div className="name">
                            {`${stop.name}`}
                        </div>
                        <div className="trips-preview">
                        {trips ? (
                            trips.length > 0 ? (
                                trips.filter((trip, index) => index < 6 && trip.routeId).map((trip, index) => (
                                    index === 5 ? (
                                        <div key={index}>...</div>
                                    ) : (
                                        <div key={index} style={{ "--trip-color": getRandomColor(trip.routeId) }}>
                                            {(trip.routeId) ? trip.routeId : 'N/D'}
                                            <div className="border"></div>
                                        </div>
                                    )
                                ))
                            ) : (
                                <div style={{ "--trip-color": getRandomColor(0) }}>
                                    {'N/D'}
                                    <div className="border"></div>
                                </div>
                            )
                        ) : (
                            <div>Loading...</div>
                        )}
                        </div>
                    </div>
                    <div className="favorite">
                        <FontAwesomeIcon icon={faHeart} className="icon" onClick={handleHeartClick}/>
                    </div>
                </div>
                <div className="trips-info">
                    <div className="arriving">
                        <h2>In Arrivo</h2>
                        {/* <FontAwesomeIcon icon={faClock} className="icon"/> */}
                    </div>
                    <div className="trips">
                        {trips ? (
                            trips.length > 0 ? (
                                trips.filter((trip, index) => trip.routeId).map((trip, index) => (
                                    <div className="trip" style={{ "--trip-color": getRandomColor(trip.routeId) }}>
                                        <div className="id">
                                            <div className="centered">
                                                {trip.routeId}
                                                <div className="border"></div>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="name">{trip.name}</div>
                                            <div className="destination">Destinazione: {trip.end_arrival}</div>
                                        </div>
                                        <div className="times">
                                            <div className="a">{formatTime(Date.now()+index*999999)}</div>
                                            <div className="p">{formatTime(Date.now()+60000+index*999999)}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div class="no-stop centered">Nessuna corsa disponibile :/</div>
                            )
                        ) : (
                            <Loading stopType={stop.type}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default StopInfo;