import { useState, useEffect } from 'react';
import style from '../../../pages/newprojects/NewProjects.module.css'
import InputForm from '../../form/InputForm';
import SelectForm from '../../form/SelectForm';
import SubmitButtonForm from '../../form/SubmitButtonForm';

const FormProjectNew = ({ handleSubmit, btntext, projectData }) => {
        const [categories, setCategories] = useState([]);
        const [project, setProject] = useState(projectData || {});

    useEffect( () => {
        fetch('http://localhost:5000/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        }).then (  (res)  => res.json() )
          .then (  (data) => { setCategories(data) })
          .catch(  (err)  => console.log('ERRO: ' + err) )
    }, [])
    
        const submit = (e) => {
            e.preventDefault() 
            handleSubmit(project)
        }

        function handleChange(e){
            setProject({...project, [e.target.name]: e.target.value })
        }

        function handleCategory(e){
            setProject({
                ...project, 
                category: {
                    id:  e.target.value,
                    name: e.target.options[e.target.selectedIndex].text, 
                },
               })
        }
    
    return (
        <>
            <form onSubmit={submit} className={style.project_container}>
                <InputForm 
                type="text" 
                text="Nome do projeto: " 
                name="name"
                placeholder="Insira nome do projeto" 
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
                />
                <InputForm 
                type="number" 
                text="Budget do projeto" 
                name="Budget" 
                placeholder="Insira o budget pretendido" 
                handleOnChange={handleChange}
                value={project.Budget ? project.Budget : ''}
                />
                <SelectForm 
                name="Category_id" 
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
                />
                <SubmitButtonForm text={btntext} />
             </form>
        </>
    )
}

export default FormProjectNew