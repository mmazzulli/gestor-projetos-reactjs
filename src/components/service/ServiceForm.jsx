import styles from '../../pages/newprojects/NewProjects.module.css'
import { useState } from 'react'
import InputForm from '../form/InputForm'
import SubmitButtonForm from '../form/SubmitButtonForm'


function ServiceForm({handleSubmit, txtBtn, Dados}) {

    const [service, setService] = useState({})


    function submit(e) {
        e.preventDefault()
        Dados.services.push(service)
        handleSubmit(Dados)
        // console.log('Result: ' +  {service})
    }


    function handleChange(e) {
        // Spread operator(...) para pegar dados do objeto
        setService({...service, [e.target.name]: e.target.value})
    }

    return (

        <form onSubmit={submit} className={styles.project_container}>
            <InputForm 
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />

            <InputForm 
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o custo do serviço"
                handleOnChange={handleChange}
            />

            <InputForm 
                type="text"
                text="Descreva o Serviço"
                name="description"
                placeholder="Insira a descrição do serviço"
                handleOnChange={handleChange}
            />

            <SubmitButtonForm txt={txtBtn}/>
        </form>
    )
}

export default ServiceForm