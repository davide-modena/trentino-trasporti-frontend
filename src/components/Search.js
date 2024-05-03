import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './css/Search.css';

const Search = () => {
    const [input, setInput] = useState('');
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
            <div className="input-search">
                <input type="text" value={input} onChange={handleChange} placeholder="Cerca fermate..."/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>
                <ul>
                    {suggestions.map((stop, index) => (
                        <li key={index}>{`${stop.name} | ${stop.id}`}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Search;