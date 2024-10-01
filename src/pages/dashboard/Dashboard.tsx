import Head from "next/head";
import styles from "./dashboard.module.css"
import TextBoard from "@/components/textboard";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/react";
import {FiShare2} from "react-icons/fi"
import { FaTrash } from "react-icons/fa";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { db } from "@/services/firebaseconnection";
import { addDoc, collection, onSnapshot, orderBy, query ,where} from "firebase/firestore";

interface HomeProps{
    user:{
        email:string;
        //necessita especificar o user/email para string 
    }
}
interface TaskProps{
    id:string,
    user:string,
    created:Date,
    public:boolean,
    tarefas:string,
}

export default function DashBoard({ user }:HomeProps){
    const[input, setinput]= useState("")
    const[publicTask,setpublicTask]=useState(false)
    const[task, settask]= useState<TaskProps[]>([])

    useEffect(()=>{
        async function loadTarefas() {
            const tarefasRef= collection(db,"tarefas")
            const q = query(
                tarefasRef,
                orderBy("created", "desc"),
                where("user", "==", user?.email)
            )

            onSnapshot(q, (snapshot)=>{
                let lista = [] as TaskProps[];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        tarefas:doc.data().tarefas,
                        created: doc.data().created,
                        user: doc.data().user,
                        public: doc.data().public          
                    })
                }) 

                settask(lista);
            })
        }

        loadTarefas()
    },[user?.email])

    function handleChangePublic(event:ChangeEvent<HTMLInputElement>){
        console.log(event.target.checked)
        setpublicTask(event.target.checked)
    }
    async function handlenewtask(event:FormEvent){
        event.preventDefault()

        if(input === '') return;

       
        try{
            await addDoc(collection(db,"tarefas"),{
                tarefas:input,
                created:new Date(),
                user: user?.email ,
                public:publicTask
            })
        }catch(err){
            console.log(err)
        }
        // cria a tarefa no banco de dados

        setinput('')
        setpublicTask(false)
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>meu painel de tarefas</title>
            </Head>

            <main className={styles.main}>
                oii
                <section className={styles.section}>
                    <div className={styles.content}>
                        <h1>qual a sua tarefa ?</h1>
                        <form onSubmit={handlenewtask}>
                            <TextBoard 
                            placeholder="digite aqui sua tarefa ..."
                            value={input}
                            onChange={(event:ChangeEvent<HTMLTextAreaElement>)=>
                                setinput(event.target.value)}
                            />
                            <div className={styles.checkboxarea}>
                                <input
                                 type="checkbox"
                                className={styles.checkbox}
                                checked={publicTask}
                                onChange={handleChangePublic}
                                >
                                </input>
                                <label className={styles.legenda}>deixar a postagem publica</label>
                            </div>
                            <button className={styles.button}>registrar</button>
                        </form>
                    </div>
                </section>

                <section className={styles.taskSection}>
                    <h1>Minhas tarefas  </h1>
                    
                   {task.map((item)=>(
                     <article key={item.id} className={styles.taskArticle}>
                     {item.public &&(
                        <div className={styles.taskDiv}>
                        <label className={styles.labeltask}>PUBLICO</label>
                        <button className={styles.compartilha}>
                            <FiShare2 size={22} color="#3183ff"/>
                        </button>
                    </div >
                     )}
                     <div className={styles.taskcontent}>
                         <p>{item.tarefas}</p>
                         <FaTrash size={22} color="red"/>
                     </div>
                 </article>
                   ))}
                   
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
        props:{
            user:{
                email: session?.user?.email,
                //retorna user/email
            }
        }
    }
}
