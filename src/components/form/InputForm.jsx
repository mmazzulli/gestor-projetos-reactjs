
import style from './InputForm.module.css';


const InputForm = ({ text, type, name, placeholder, value, handleOnChange}) => {
    return (
        <div className={style.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
            type={type} 
            name={name} 
            id={name} 
            placeholder={placeholder}
            value={value}
            onChange={handleOnChange}
            />
            
        </div>
    ) 
}

export default InputForm