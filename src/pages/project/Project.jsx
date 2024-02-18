import { parse, v4 as uuidv4 } from 'uuid'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import FormProjectNew from '../../components/projects/forms/FormProjectNew'
import Loading from '../../components/layout/loading/Loading'
import Container from '../../components/layout/container/Container'
import Message from '../../components/projects/messages/Message'
import ServiceForm from '../../components/service/ServiceForm'
import ServiceCard from '../../components/service/ServiceCard'


function Project() {

    // Resgata valor di ID
    const {id} = useParams()
    
    // Variáveis que receberão os dados do json
    const [project, setProject] = useState([])

    // use state para listagem dos serviços cadastrados
    const [services, setServices] = useState()

    // useState para mostrar form / associado ao toggleProjectForm()
    // Inicia "false" pois não exibe o form antes do click
    const [showProjectForm, setShowProjectForm] = useState(false)

    const [custoRestante, setCustoRestante] = useState(0)

    // useState para mostrar form / associado ao toggleServiceForm()
    // Inicia "false" pois não exibe o form antes do click
    const [showServiceForm, setShowServiceForm] = useState(false)

    // useState das mensagens do UPDATE
    const [message, setMessage] = useState()
    const [typeMessage, setTypeMessage] = useState()

   
    // Recebe do db.json o registro do projeto
    // Passa o Registro para a VAR "project"
    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json())
      .then((data) => {
        // Recebe dados completos do db.json e atribui a VAR 'project'
            setProject(data)

        // Segmenta os dados só dos serviços para uso de sua listagem 
        // Atribui a VAR services
            setServices(data.services)

      })
      .catch((err) => console.log(err));

    }, [id])

    useEffect(() => {
        if(project.cost === 0) {
            setCustoRestante(project.Budget)
        } else {
            setCustoRestante(project.disponivel)
        }
    })
  

    function editPost(project) {
        // Limpa variável de mensagem para próximas alterações
        setMessage('')

        // Budget validation
        if(project.Budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto.') 
            setTypeMessage('ERROR') 
            // false para parar a função 
            return false
        }
    

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
          .then((data) => {
                setProject(data);
                setShowProjectForm(false);
                setMessage('Alteração concluída com sucesso!')
                setTypeMessage('Success')
          })
          .catch((err) => console.log(err))
    }

    function createService(project) {
        // last service 

        const bdgt = project.Budget 

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        const disponivel = parseFloat(bdgt) - newCost

        // Maximum value validation 
        if (newCost > parseFloat(project.Budget)){
            setMessage('Orçamento inconsistente. Verifique melhor o valor.')
            setTypeMessage('ERROR')
            project.services.pop()
            return false
        }

        // Add service cost to project total cost

        project.cost = newCost 
        project.disponivel = disponivel 


        // UPDATE 

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
           .then(resp => resp.json())
           .then((data) => {

            // Ocultar o form após a inserção do serviço
            setShowServiceForm(false)

            // Teste: exibir os serviços no console 
            // console.log(data)
           })
           .catch((err) => console.log(err))



    }

    // Esta function ao unvés de DELETAR, vai dar um UPDATE 
    // FILTRANDO o registro e reescrevendo sem o ID indicado 
    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id 
        )

        const projectUpdated = project 

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
        projectUpdated.disponivel = parseFloat(projectUpdated.disponivel) +  parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json()) 
          .then((data) => {
                setProject(projectUpdated)
                setServices(servicesUpdated)
                setMessage('Serviço removido com sucesso!')
          })
          .catch((err) => console.log(err))
        
    }
      
    function toggleProjectForm() {
        // Se for false vira true e vice-versa
        setShowProjectForm(!showProjectForm)
    }

    
    function toggleServiceForm() {
        // Se for false vira true e vice-versa
        setShowServiceForm(!showServiceForm)
    }

    return (

        <>

        {/* // if para gerar loading 1º etapa*/}
        { project.name && project.category.name ? (

        <div id="item-2b">

        <Container>
            {message && <Message type={typeMessage} msg={message} />}
               <div className={styles.project_details}>
            <h1>Projeto:  {project.name}</h1>
            
           <button className={styles.btn} onClick={toggleProjectForm}>
            {!showProjectForm ? 'Start Editor' : 'Close Form'}</button>
            </div> 

                     
            {!showProjectForm ? 

            (
                // Exibe Dados do Projeto
                 <div>
                 <p>Categoria: {project.category.name}</p>
                 <p>Total do orçamento: R$ {project.Budget}</p>
                 <p>Total Utilizado: R$ {project.cost}</p>
                 <p>Total Disponível: R$ {custoRestante}</p>
                 <hr className={styles.project_hor}/>
                 </div>

            ) : (

                // Exibe FORM 
                <FormProjectNew handleSubmit={editPost} btntest="Concluir Edição" projectData={project}/>

            )}

                 {/* FORMULÁRIO DO SERVIÇO  */}
            <div className={styles.service_form_container}>
                <h2>Adicione um serviço</h2>

                <button className={styles.btn} onClick={toggleServiceForm}>
            {!showServiceForm ? 'Add Service' : 'Close Form'}</button>
            </div>

            <div className={styles.project_info}>
            {/* if showServiceForm = TRUE */ }
            {showServiceForm && (
                <ServiceForm 
                handleSubmit={createService} 
                txtBtn="Adicionar Serviço" 
                Dados={project}
                />
                
            )}

             <hr className={styles.project_hor}/>
            </div>

            {/* Exibição dos serviços cadastrados */}
            <div className={styles.service_list_container}>
                <h2>Serviços</h2>
                <Container>
                {services.length > 0 && 

                // Map com parentesis quando usamos objeto
                    services.map((service) => (
                        <ServiceCard 
                        id={service.id}
                        name={service.name}
                        cost={service.cost}
                        descr={service.descr}
                        key={service.key}
                        handleRemove={removeService}
                        />
                    ))
                }

                {services.length === 0 && 
                 <p>Não há serviços cadastrados</p>  }
               
                <hr className={styles.project_hor}/>
                </Container>
            </div>

                </Container>
                </div>
            ) : (
                <Loading />
          
        ) }

        </>
    )

}

export default Project