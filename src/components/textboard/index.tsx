import { HTMLProps } from "react"
import styles from "./textboard.module.css"
export default function TextBoard({...rest}:HTMLProps<HTMLTextAreaElement>){
    return(
        <textarea className={styles.textarea} {...rest}></textarea>
    )
}