import { useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NewProjects.module.css'

import { request } from "../../utils"

function NewProject() {

    const navigate = useNavigate()

    function createPost(project) {
        //initialize infoprojects and service
        request("/projetos", { method: 'POST', body: project })
            .then((data) => {
                console.log(data)
                //redirect
                navigate('/projects', { message: 'Projeto criado com sucesso!' })
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject