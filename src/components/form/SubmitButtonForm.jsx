
import style from './SubmitButtonForm.module.css';


const SubmitButtonForm = ({ text }) => {
    return (
        <div>
            <button className={style.btn}>{text}</button>
        </div>
    ) 
}

export default SubmitButtonForm