
import style from './SelectForm.module.css';


const SelectForm = ({ text, name, options, value, handleOnChange}) => {
    return (
        <div className={style.form_control}>
            <label htmlFor={name}>{text}</label>
            <select 
                name={name} 
                id={name} 
                value={value || ''} 
                onChange={handleOnChange}>

                <option>Selecione uma opção</option>
                { options.map((option) => (
                <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
            
        </div>
    ) 
}

export default SelectForm