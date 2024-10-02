import Head from "next/head";
import styles from "./task.module.css"
import { GetServerSideProps } from "next";
import { db } from "@/services/firebaseconnection";
import {doc, collection, query, getDoc, addDoc, where, getDocs, deleteDoc} from "firebase/firestore"
import TextBoard from "@/components/textboard";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

import { FaTrash } from "react-icons/fa";
interface TaskProps{
    item:{
        tarefas:string,
        public:boolean,
        created:string,
        user:string,
        taskId:string
    },
    allcoments:ComentsProps[]
}

interface ComentsProps{
      comentario:string,
      id: string,
      name:string,
      taskId:string,
      user:string 
}

export default function Task({item, allcoments}:TaskProps){

    const{data:Session}= useSession()
    const[input, setinput]= useState("")

    const[comentario, setcomentario] = useState<ComentsProps[]>(allcoments || [])
    
    async function handlecoment(event: FormEvent){
        event.preventDefault();0

        if(input === "") return;

        if(!Session?.user?.name || !Session?.user.email) return

        try{
            const docRef = await addDoc(collection(db,"coments"),{
                comentario: input,
                created:new Date(),
                user: Session?.user?.email,
                name: Session?.user?.name,
                taskId: item.taskId
            })

            const Data={
                id: docRef.id,
                comentario: input,
                user: Session?.user?.email,
                name: Session?.user?.name,
                taskId: item?.taskId
            }

            setcomentario((oldcomentario)=>[...oldcomentario , Data])
            setinput('')
        }catch{
            console.log('')
        }


    }
    async function handleDelet(id:string){
        try{
            const docRef = doc(db,"coments", id)
            await deleteDoc(docRef)
            const deletComent = comentario.filter((item)=> item.id !== id )
            setcomentario(deletComent)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className={styles.container}>
            <Head> <title>comentarios tarefas</title></Head>

            <main className={styles.main}>
                <h1>tarefa</h1>
             <article className={styles.article}>
                <p className={styles.tarefa}>{item.tarefas}</p>
             </article>

            <section className={styles.divcomentarios}>
                <h3>deixar comentario</h3>
                <form onSubmit={handlecoment}>
                    <TextBoard placeholder="digite seu comentario"
                    value={input}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>)=> setinput(event.target.value)}/>
                    <button className={styles.button}
                    disabled={!Session?.user}>enviar comentario</button>
                </form>
            </section>

            <section className={styles.sectionComents}>
                <h2>comentarios</h2>
                {comentario.length === 0 &&(
                    <span className={styles.span}>sem comentarios </span>
                )}

                {comentario.map((item)=>(
                    <article key={item.id} className={styles.articlecoments}>
                        <div className={styles.headerComents}>
                            <label className={styles.label} >{item.name}</label>
                          {item.user === Session?.user?.email &&(
                            <button className={styles.trash} onClick={()=>handleDelet(item.id)}>
                              <FaTrash size={18} color="red" />
                            </button>
                          )}
                        </div>
                        <p className={styles.usercoments}>{item.comentario}</p>
                    </article>
                ))}
            </section>
            
            
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async({params}) =>{
    const id = params?.id as string;

    const docRef = doc(db,"tarefas",id)

    const q = query(collection(db,"coments"), where("taskId", "==", id))

    const snapshotComments = await getDocs(q);

    let allcoments:ComentsProps[] =[]

    snapshotComments.forEach((doc) => {
        allcoments.push({
            id: doc.id,
            comentario: doc.data().comentario,
            user: doc.data().user,
            name: doc.data().name,
            taskId: doc.data().taskId,
        })
    });
    console.log(allcoments)

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
            allcoments: allcoments,
        },
    }
} 