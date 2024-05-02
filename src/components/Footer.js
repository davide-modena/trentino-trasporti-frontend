import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLocationDot, faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <>
        <style>{`
            footer{
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100vw;
                height: 70px;
                background-color: white;
                box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, .25);
                display: flex;
                justify-content: center;
            }

            footer .icons{
                height: 100%;
                width: 90%;
                max-width: 500px;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 30px;
            }

            footer .icon{
                font-size: 40px;
                color: black;
            }

            footer .profile-pic{
                width: 42px;
                height: 42px;
                background-color: black;
                border-radius: 50%;
                background-image: url(https://yt3.googleusercontent.com/ytc/AIdro_llgeHGM1Tc4gQt4zBX7DAWY1bSAI93KU6_lxSXYjts8i4=s900-c-k-c0x00ffffff-no-rj);
                background-size: cover;
            }
        `}</style>

        <footer>
            <div className="icons">
                <FontAwesomeIcon icon={faLocationDot} className="icon"/>
                <FontAwesomeIcon icon={faHeart} className="icon"/>
                <a href=""><div className="profile-pic"></div></a>
            </div>
        </footer>
        </>
    );
}
 
export default Footer;