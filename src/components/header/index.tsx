import Link from "next/link";
import styles from "./header.module.css"
import { signIn, signOut, useSession } from "next-auth/react";
import Google from "next-auth/providers/google";
export default function Header(){
    const {data:session , status} = useSession();
    return(
        <header className={styles.header}> 
            <section className={styles.content}>
                <nav className={styles.nav}>
                    <Link href="/">
                    <h1 className={styles.tarefas}>tarefas <span className={styles.span}>+</span></h1>
                    </Link>
                    
                   {session?.user &&(
                         <Link href="/dashboard/Dashboard" className={styles.painel}> meu painel</Link>
                   )}
                </nav>
                {status === "loading" ?(
                        <></>
                    ): session?(
                        <button className={styles.button} onClick={()=> signOut()}>olá {session?.user?.name}</button>
                    ):(
                    <button className={styles.button} onClick={()=>signIn("google")}>cadastre-se</button>
                    )}
            </section>
        </header>
    )
}