import styles from './Home.module.css'
import savings from '../../img/savings.svg'

function Home(){
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>InfoProjects</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <a href='/'>Criar Projeto</a>
            <img src={savings} alt='InfoProjects' />
        </section>
    )
}

export default Home

