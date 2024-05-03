import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faHeart } from '@fortawesome/free-solid-svg-icons';
import './css/Footer.css';

const Footer = () => {
    return (
        <>
        <footer>
            <div className="icons">
                <FontAwesomeIcon icon={faLocationDot} className="icon"/>
                <FontAwesomeIcon icon={faHeart} className="icon"/>
                <div className="profile-pic"></div>
            </div>
        </footer>
        </>
    );
}
 
export default Footer;