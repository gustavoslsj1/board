import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css"
import hero from "../../public/hero.png"
import { GetServerSideProps } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseconnection";

interface HomeProps{
  coment: number,
  post:number,
}

export default function Home({coment, post}:HomeProps){
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
        <p className={styles.caixasFrase}> +{post} mil posts</p>
        <p className={styles.caixasFrase}> +{coment} mil comentarios </p>
      </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async()=>{
  
  const comentsRef = collection(db, "coments")
  const postRef = collection(db, "tarefas")

  const comentsSnapshot = await getDocs(comentsRef)
  const postSnapshot = await getDocs(postRef)
  return{
    props:{
      coment: comentsSnapshot.size || 0,
      post: postSnapshot.size || 0
    }
  }

}