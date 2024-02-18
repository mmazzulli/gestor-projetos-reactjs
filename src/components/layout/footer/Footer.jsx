import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import style from './Footer.module.css';

function Footer(){
    return (
        <div id="item-4" className={style.copy} >
            <ul className={style.icones} >
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaLinkedin /></li>
            </ul>
            <p> &copy; 2024 | Marcelo Developer </p>
        </div>
              
    
    )
}

export default Footer