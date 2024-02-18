import styles from '../projects/cards/ProjectCard.module.css'
import { Trash } from 'react-bootstrap-icons'

function ServiceCard({id, name, cost, descr, handleRemove}) {
    
    const remove = (e) => {
        e.preventDefault() 
        // Passa o 'id' por ser referência e o 'cost' para subtração
        handleRemove(id, cost)
    }
    
    return ( 
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total: </span> R$ {cost}
            </p>
            <p>
              {descr}
            </p>
            <div className={styles.project_cards_actions}>
                <button onClick={remove}>
                    <Trash /> Excluir serviço
                </button>
            </div>
        </div>
     )
}

export default ServiceCard