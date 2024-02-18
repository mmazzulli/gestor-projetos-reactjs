import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Message from "../../components/projects/messages/Message";
import Container from '../../components/layout/container/Container';
import ButtonLink from '../../components/buttons/ButtonLink';
import ProjectCard from "../../components/projects/cards/ProjectCard";
import styles from './Projects.module.css';
import Loading from "../../components/layout/loading/Loading";

const Projects = () => {

        // Para a listagem dos projetos
        const [projects, setProjects] = useState([]);

        // Administrar o icon loading
        const [removeLoading, setRemoveLoading] = useState(false)

        // useState da mensagem de remoção 
        const [projectMessage, setProjectMessage] = useState('')



        // Para recuperar a mensagem que vem junto aos dados do form
        // Este form mencionado é para o cadastro
        const location = useLocation() 
        let message = '' 
        if(location.state){
        message = location.state.message
        }

        useEffect(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json', 
                },
            })
            .then((resp) => resp.json())
            .then((data) =>{
                // console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            } )
            .catch((err) => console.log(err))
        }, [])

        // Função para remover registro 

        function removeProject(id) {
            fetch(`http://localhost:5000/projects/${id}`, {
                method:  'DELETE', 
                headers: {
                    'Content-Type' : 'application/json'
                },
            })
            .then(resp => resp.json())
            .then(data => {
                setProjects(projects.filter((project) => project.id !== id))
                // message de remoção 
                setProjectMessage('Registro removido com sucesso!');

            })
            .catch((err) => console.log(err))
        }
    
    return (
         
        <div id="item-2">
        <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <ButtonLink to="/newprojects" texto=" + Criar novo projeto " />
        </div>
        {/* Mensagens de sucesso para diferentes eventos */}
        { message && <Message msg="Sucesso na inclusão de dados!" type="success"/> }
        { projectMessage && <Message msg={projectMessage} type="success"/> }

        {/* Para que o conteúdo entre as tags container sejam exibidas
            precisa lá no componente ter uma props.children  */}
        <Container customClass="starter">
            {/* Aqui vai a listagem de dados cadastrados */}
            { projects.length > 0 && 
                projects.map( (project) => 
                    <ProjectCard 
                    name=         {project.name} 
                    id=           {project.id} 
                    budget=       {project.Budget} 
                    category=     {project.category.name} 
                    key=          {project.id} 
                    handleRemove= {removeProject}
                    /> 
                )
            }
            { !removeLoading && <Loading /> }
            { removeLoading && projects.length === 0 && (
                <p>Não há projetos cadastrados</p>
            ) }
        </Container>
     
        </div>
      
    )
}

export default Projects