import { useNavigate } from "react-router-dom"
import style from './ButtonLink.module.css';

function ButtonLink({ texto, to })  {
    const Navigate = useNavigate();
    return (
        <>  
            <button className={style.btn_projeto} onClick={() => {Navigate(to)}}> {texto} </button>
        </>
    )
}

export default ButtonLink