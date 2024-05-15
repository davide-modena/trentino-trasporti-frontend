import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faSignsPost, faXmark } from '@fortawesome/free-solid-svg-icons';
import './css/FunctionIcons.css';

const FunctionIcons = ({isPianifica, setIsPianifica, setRecenter}) => {

    return (
        <>
            <div className="icons-container">
                <div className="your-location" onClick={()=>{setRecenter(true)}}>
                    <FontAwesomeIcon icon={faLocationArrow}/>
                </div>
                <div className="plan" onClick={()=>{setIsPianifica(!isPianifica)}}>
                    <FontAwesomeIcon icon={isPianifica ? faXmark : faSignsPost}/>
                </div>
            </div>
        </>
    );
}
 
export default FunctionIcons;