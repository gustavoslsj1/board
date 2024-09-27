import Link from "next/link";
import styles from "./header.module.css"
export default function Header(){
    return(
        <header className={styles.header}> 
            <section className={styles.content}>
                <nav className={styles.nav}>
                    <h1 className={styles.tarefas}>tarefas <span className={styles.span}>+</span></h1>
                    <Link href="/dashboard/Dashboard"> meu painel</Link>
                </nav>
                <button className={styles.button}>cadastre-se</button>
            </section>
        </header>
    )
}