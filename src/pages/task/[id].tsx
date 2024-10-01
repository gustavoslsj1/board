import Head from "next/head";
import styles from "./task.module.css"
import { GetServerSideProps } from "next";
import { db } from "@/services/firebaseconnection";
import {doc, collection, query, getDoc} from "firebase/firestore"

interface TaskProps{
    item:{
        tarefas:string,
        public:boolean,
        created:string,
        user:string,
        taskId:string
    }
}

export default function Task({item}:TaskProps){
    return(
        <div className={styles.container}>
            <Head> <title>{item.tarefas}</title></Head>

            <main className={styles.main}>
                <h1>tarefa</h1>
             <article className={styles.article}>
                <p className={styles.tarefa}>{item.tarefas}</p>
             </article>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async({params}) =>{
    const id = params?.id as string;

    const docRef = doc(db,"tarefas",id)
    const snapshot = await getDoc(docRef)

    if(snapshot == undefined){
        return{
            redirect:{
                destination:"/",
                permanent:false
            }
        }
    }

    if(!snapshot.data()?.public){
        return{
            redirect:{
                destination:"/",
                permanent:false
            }
        }
    }

    const miliseconds = snapshot.data()?.created?.seconds *1000;

    const task = {
        tarefas: snapshot.data()?.tarefas,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId:id
    }
    console.log(task)

    return{
        props:{
            item: task,
        },
    }
} 