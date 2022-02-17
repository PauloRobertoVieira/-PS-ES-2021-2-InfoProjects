import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({btnText}){
    return(
        <form className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name" 
                placehoder="Insira o nome do projeto"
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget" 
                placehoder="Insira o orçamento total"
            />
            <div>
                <Select name="category_id" text="Selecione a categoria" />
            </div>
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm