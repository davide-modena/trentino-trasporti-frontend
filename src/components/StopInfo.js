import './css/StopInfo.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faHeart, faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const StopInfo = ({ stop, onClose }) => {
    const [trips, setTrips] = useState([]);
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
        // const randomIndex = Math.floor(Math.random() * colors.length);
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

    return (
        <div className="stop-info-container">
            <FontAwesomeIcon icon={faXmark} class="icon close-icon" onClick={handleCloseIcon}/>
            <div className="stop-info">
                <h1>Dettagli Fermata</h1>
                <div className="stop-container">
                    <div className="type">
                        <FontAwesomeIcon icon={faBus} className={`icon ${stop.type === 'U' ? 'urban' : 'extraurban'}`} />
                    </div>
                    <div className="details">
                        <div className="name">
                            {`${stop.name} | ${stop.id}`}
                        </div>
                        <div className="trips-preview">
                            {trips.filter((trip, index) => index < 6 && trip.routeId).map((trip, index) => (
                                index === 5 ? (
                                    <div key={index}>
                                        ...
                                    </div>
                                ) : (
                                    <div key={index} style={{ "--trip-color": getRandomColor(trip.routeId) }}>
                                        {(trip.routeId) ? trip.routeId : 'N/D'}
                                        <div className="border"></div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                    <div className="favorite">
                        <FontAwesomeIcon icon={faHeart} className="icon" onClick={handleHeartClick}/>
                    </div>
                </div>
                <div className="trips-info">
                    <div className="arriving">
                        <h2>In Arrivo</h2>
                        <FontAwesomeIcon icon={faClock} className="icon"/>
                    </div>
                    <div className="trips">
                        {trips.filter((trip, index) => trip.routeId).map((trip, index) => (
                            <div className="trip" style={{ "--trip-color": getRandomColor(trip.routeId) }}>
                                <div className="id">
                                    <div className="centered">
                                        {trip.routeId}
                                        <div className="border"></div>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="name">{trip.tripHeadsign}</div>
                                    <div className="destination">Destinazione: {trip.tripHeadsign}</div>
                                </div>
                                <div className="times">
                                    <div className="a">11:41</div>
                                    <div className="p">11:43</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default StopInfo;