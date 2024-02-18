import React from "react";
import Style from './Home.module.css'
import savings from '../../assets/img/savings.png'
import ButtonLink from "../../components/buttons/ButtonLink";

const Home = () => {
    return (
        <>
        <section id="item-2">
        <div>
        <span className={Style.title}>Bem-vindo ao </span><span className={Style.enfase_title}>Cost</span> <span className={Style.title}>Dashboard!</span>
        <p>Comece agora a gerenciar seus projetos.</p>
        <img className={Style.savings} src={savings} alt="Gestor de Projetos" />
        </div>
        <div></div>
        </section>
        
        <section id="item-3">
         <ButtonLink to="/newprojects" texto=" + Criar novo projeto " />
        </section>  
        </>    
    )
}

export default Home