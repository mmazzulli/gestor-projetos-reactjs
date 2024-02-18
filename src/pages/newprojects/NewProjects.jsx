import React from "react";
import { useNavigate } from 'react-router-dom';
import style from './NewProjects.module.css';
import FormProjectNew from '../../components/projects/forms/FormProjectNew';

// Os métodos de criação estarão nesta pg
// os métodos de edição estará aqui tbm

const NewProjects = () => {

    // Hook para o redirect 
    const navigate = useNavigate()

    // Inserir projeto POST no db 
    function createPost(project) {
        // Initialize costs and projects
        project.cost     = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(project) 
            })
                .then( (res) => res.json())
                .then( (data) => {
                console.log(data);
                // Redirect 
                    navigate("/projetos", { state: {
                    message: "PROJETO CRIADO COM SUCESSO!!!"} })
                })
                .catch( (err) => console.log(err))
    }

    return (
        <>

        <section id="item-2" className={style.project_container}>
        <div>
           <h1>Formulário - Novo Projeto</h1>
           <p>Crie seu projeto para adicionar os serviços</p>
           <FormProjectNew handleSubmit={createPost} btntext=" + Criar novo projeto " />
        </div> 
        </section>
        <section id="item-3"> 
        </section>
        </>
       
    )
}

export default NewProjects