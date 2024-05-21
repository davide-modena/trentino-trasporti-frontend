import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faSignsPost, faXmark, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import './css/FunctionIcons.css';

const FunctionIcons = ({isPianifica, setIsPianifica, setRoutePianifica, setRecenter}) => {
    return (
        <>
            <div className="icons-container">
                {/* <div className="your-location" onClick={()=>{setRecenter('center')}}>
                    <FontAwesomeIcon icon={faHeart}/>
                </div> */}
                <div className="plan" onClick={()=>{
                    setIsPianifica(!isPianifica);
                    if(isPianifica){
                        setRoutePianifica(null);
                    }
                }}>
                    <FontAwesomeIcon icon={isPianifica ? faXmark : faSignsPost}/>
                </div>
            </div>
        </>
    );
}
 
export default FunctionIcons;