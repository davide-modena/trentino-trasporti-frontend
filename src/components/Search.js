import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
            <style>
                {`
                .input-search{
                    position: fixed;
                    top: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1;
                }

                .input-search input{
                    height: 40px;
                    width: 90vw;
                    max-width: 600px;
                    border-radius: 45px;
                    border: none;
                    box-shadow: 0 4px 7px 1px rgba(0, 0, 0, .25);
                    padding: 15px;
                    font-size: 16px;
                }

                .input-search .icon{
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    font-size: 20px;
                    color: rgba(0, 0, 0, .55);
                }
                
                .input-search ul{
                    position: absolute;
                    list-style: none;
                }

                .input-search li{
                    height: 30px;
                    width: 90vw;
                    max-width: 600px;
                    border-radius: 10px;
                    /* border: 1px solid black; */
                    /* border: none; */
                    box-shadow: 0 4px 7px 1px rgba(0, 0, 0, .25);
                    font-size: 16px;
                    padding: 2px 15px;
                    margin: 5px 0;
                    cursor: pointer;
                    background-color: white;
                }`}
            </style>
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