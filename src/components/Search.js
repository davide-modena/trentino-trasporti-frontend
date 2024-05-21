import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot, faArrowRightArrowLeft, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import './css/Search.css';

const Search = ({isPianifica, setRoutePianifica, setSelectedStop}) => {
    const [input, setInput] = useState('');
    const [startInput, setStartInput] = useState('');
    const [arrivalInput, setArrivalInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [arrivalSuggestions, setArrivalSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const [startValue, setStartValue] = useState('');
    const [arrivalValue, setArrivalValue] = useState('');

    const handleChange = async (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);

        try {
            if(inputValue === ""){
                setSuggestions([]);
            }
            const response = await axios.get(`https://trentinotrasportibackend.netlify.app/.netlify/functions/server/v1/fermate?stopName=${inputValue}`);
            const data = response.data;
            setSuggestions(data.slice(0, 5));
            if(inputValue === ""){
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Errore durante il recupero delle fermate:', error);
            setSuggestions([]);
        }
    };

    const handleStartChange = async (e) => {
        const inputValue = e.target.value;
        setStartInput(inputValue);
        setStartValue('');

        try {
            if(inputValue === ""){
                setSuggestions([]);
            }
            const response = await axios.get(`https://trentinotrasportibackend.netlify.app/.netlify/functions/server/v1/fermate?stopName=${inputValue}`);
            const data = response.data;        
            setStartSuggestions(data.slice(0, 5));
            if(inputValue === ""){
                setStartSuggestions([]);
            }
        } catch (error) {
            console.error('Errore durante il recupero delle fermate:', error);
            setStartSuggestions([]);
        }
    };

    const handleArrivalChange = async (e) => {
        const inputValue = e.target.value;
        setArrivalInput(inputValue);
        setArrivalValue('');

        try {
            if(inputValue === ""){
                setSuggestions([]);
            }
            const response = await axios.get(`https://trentinotrasportibackend.netlify.app/.netlify/functions/server/v1/fermate?stopName=${inputValue}`);
            const data = response.data;
            setArrivalSuggestions(data.slice(0, 5));
            if(inputValue === ""){
                setArrivalSuggestions([]);
            }
        } catch (error) {
            console.error('Errore durante il recupero delle fermate:', error);
            setArrivalSuggestions([]);
        }
    };

    const handleSelect = (value) => {
        setInput(value.name);
        setSelectedStop(value);
        setSuggestions([]);
    }

    const handleStartSelect = (value) => {
        setStartInput(value);
        setStartValue(value);
        setStartSuggestions([]);
    };

    const handleArrivalSelect = (value) => {
        setArrivalInput(value);
        setArrivalValue(value);
        setArrivalSuggestions([]);
    };

    const handleSwitch = () => {
        setStartInput(arrivalInput);
        setStartValue(arrivalValue);
        setArrivalInput(startInput);
        setArrivalValue(startValue);
    }

    const handlePianifica = async () => {
        if(startValue && arrivalValue){
            // const response = await axios.get(`https://trentinotrasportibackend.netlify.app/.netlify/functions/server/v1/viaggi?start=${startValue.id}&arrival=${arrivalValue.id}`);
            // setRoutePianifica(response.data);
            setRoutePianifica({start: startValue.id, arrival: arrivalValue.id});
        }
        else{
            alert('Inserisci partenza e arrivo');
        }
    }

    return (
        <>  
            {(isPianifica) ?
                <div className="input-search">
                    <div className="input pianifica">
                        <input type="text" value={(startValue) ? `${startInput.name}` : startInput} onChange={handleStartChange} placeholder="Inserisci partenza..."/>
                        <FontAwesomeIcon icon={faLocationCrosshairs} className="icon start"/>
                        <ul>
                            {startSuggestions.map((stop, index) => (
                                <li key={index} onClick={() => handleStartSelect(stop)}>{`${stop.name}`}</li>
                            ))}
                        </ul>
                        <input type="text" value={(arrivalValue) ? `${arrivalInput.name}` : arrivalInput} onChange={handleArrivalChange} placeholder="Inserisci arrivo..."/>
                        <FontAwesomeIcon icon={faLocationDot} className="icon arrival"/>
                        <ul>
                            {arrivalSuggestions.map((stop, index) => (
                                <li key={index} onClick={() => handleArrivalSelect(stop)}>{`${stop.name}`}</li>
                            ))}
                        </ul>
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} className="icon switch" onClick={handleSwitch}/>
                        {/* <input type="datetime-local" name="time" className="time" placeholder="Seleziona data e ora"/> */}
                        <button onClick={handlePianifica}>PIANIFICA</button>
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
                            <li key={index} onClick={() => handleSelect(stop)}>{`${stop.name}`}</li>
                        ))}
                    </ul>
                </div>
            }
        </>
    );
};

export default Search;