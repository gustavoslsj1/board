import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css"
import hero from "../../public/hero.png"

export default function Home(){
  return(
    <div className={styles.container}>
      <Head><title>tarefas+| organize suas tarefas de forma facil</title></Head>

      <main className={styles.main}> 
        <div className={styles.content}>
        <Image 
        src={hero}
        alt="hero"
        className={styles.image}
        priority/>
           <h2 className={styles.frase}> sistema feito para voce organizar seus estudos e tarefas </h2>
        </div>
     
        <div className={styles.caixa}>
        <p className={styles.caixasFrase}> +1 mil posts</p>
        <p className={styles.caixasFrase}> +7 mil comentarios </p>
      </div>
      </main>
    </div>
  )
}