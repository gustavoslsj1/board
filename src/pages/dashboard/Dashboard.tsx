import Head from "next/head";
import styles from "./dashboard.module.css"
import TextBoard from "@/components/textboard";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/react";
import {FiShare2} from "react-icons/fi"
import { FaTrash } from "react-icons/fa";
export default function DashBoard(){
    return(
        <div className={styles.container}>
            <Head>
                <title>meu painel de tarefas</title>
            </Head>

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.content}>
                        <h1>qual a sua tarefa ?</h1>
                        <form>
                            <TextBoard placeholder="digite aqui sua tarefa ..."/>
                            <div className={styles.checkboxarea}>
                                <input
                                 type="checkbox"
                                className={styles.checkbox}>
                                </input>
                                <label className={styles.legenda}>deixar a postagem publica</label>
                            </div>
                            <button className={styles.button}>registrar</button>
                        </form>
                    </div>
                </section>

                <section className={styles.taskSection}>
                    <h1>Minhas tarefas  </h1>
                    
                    <article className={styles.taskArticle}>
                        <div className={styles.taskDiv}>
                            <label className={styles.labeltask}>PUBLICO</label>
                            <button className={styles.compartilha}>
                                <FiShare2 size={22} color="#3183ff"/>
                            </button>
                        </div >
                        <div className={styles.taskcontent}>
                            <p>minha primeira tarefa</p>
                            <FaTrash size={22} color="red"/>
                        </div>
                    </article>
                    <article className={styles.taskArticle}>
                        <div className={styles.taskDiv}>
                            <label className={styles.labeltask}>PUBLICO</label>
                            <button className={styles.compartilha}>
                                <FiShare2 size={22} color="#3183ff"/>
                            </button>
                        </div >
                        <div className={styles.taskcontent}>
                            <p>minha primeira tarefa</p>
                            <FaTrash size={22} color="red"/>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps= async({req}) => {
    const session =await getSession({req})

    if(!session?.user){
        return{
            redirect:{
                destination:"/",
                permanent: false
            }
        }
    }

    return{
        props:{}
    }
}
