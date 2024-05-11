import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot, faArrowRightArrowLeft, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import './css/Search.css';

const Search = ({isPianifica}) => {
    const [input, setInput] = useState('');
    const [startInput, setStartInput] = useState('');
    const [arrivalInput, setArrivalInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);

        try {
            const response = await axios.get(`https://trentinotrasportibackend.netlify.app/.netlify/functions/server/v1/fermate?stopName=${inputValue}`);
            const data = response.data;
            console.log(data);
            setSuggestions(data.slice(0, 5));
            if(inputValue === ""){
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Errore durante il recupero delle fermate:', error);
            setSuggestions([]);
        }
    };

    return (
        <>  
            {(isPianifica) ?
                <div className="input-search">
                    <div className="input pianifica">
                        <input type="text" value={startInput} onChange={handleChange} placeholder="Inserisci partenza..."/>
                        <FontAwesomeIcon icon={faLocationCrosshairs} className="icon start"/>
                        <ul>
                            {suggestions.map((stop, index) => (
                                <li key={index}>{`${stop.name} | ${stop.id}`}</li>
                            ))}
                        </ul>
                        <input type="text" value={input} onChange={handleChange} placeholder="Inserisci arrivo..."/>
                        <FontAwesomeIcon icon={faLocationDot} className="icon arrival"/>
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} className="icon switch"/>
                        <input type="datetime-local" name="time" className="time" placeholder="Seleziona data e ora"/>
                        <button>PIANIFICA</button>
                    </div>
                    
                </div>
                :
                <div className="input-search">
                    <div className="input">
                        <input type="text" value={input} onChange={handleChange} placeholder="Cerca fermate..."/>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>
                    </div>
                    <ul>
                        {suggestions.map((stop, index) => (
                            <li key={index}>{`${stop.name} | ${stop.id}`}</li>
                        ))}
                    </ul>
                </div>
            }
        </>
    );
};

export default Search;