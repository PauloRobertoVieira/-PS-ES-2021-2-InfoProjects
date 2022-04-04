import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

const categories = [
    {
        id: "Infra",
        name: "Infra"
    },
    {
        id: "Desenvolvimento",
        name: "Desenvolvimento"
    },
    {
        id: "Design",
        name: "Design"
    },
    {
        id: "Planejamento",
        name: "Planejamento"
    }
]

function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [project, setProject] = useState(projectData || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placehoder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placehoder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <div>
                <Select
                    name="category_id"
                    text="Selecione a categoria"
                    options={categories}
                    handleOnChange={handleCategory}
                    value={project.category ? project.category.id : ''}
                />
            </div>
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm