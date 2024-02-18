

const Container = (props) => {
    // A props.children faz com que seja exibido o conteudo entre as tags container lá no file onde chama o container: Projects.jsx
    return <div>{props.children}</div>
}

export default Container