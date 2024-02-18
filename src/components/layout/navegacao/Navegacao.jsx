import React from "react";
import logo from '../../../assets/img/logo.png';
import { Link } from "react-router-dom";
import style from './Navegacao.module.css';

function Navegacao(){
    return(
        <header className={style.container}>
            <div className={style.div1}>
               <img src={logo} alt="Cost" />
            </div>
            <div className={style.div2}></div>
        <nav className={style.navbar}>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/empresa'>Empresa</Link>
                </li>
                 <li>
                    <Link to='/projetos'>Projetos</Link>
                </li>
                <li>
                    <Link to='/contatos'>Contatos</Link>
                </li>
            </ul>
        </nav>
        </header>
    )}

export default Navegacao