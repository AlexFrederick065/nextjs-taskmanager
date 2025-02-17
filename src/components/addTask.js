'useClient'
import { useState } from "react"
import db from "@/config/firebase"
import { collection, addDoc } from "@firebase/firestore"
import styles from "@/styles/index.module.css";

const AddTask = () => {
    const [value,setValue] = useState('')

    const handleSubmit = async(event) => {
        event.preventDefault()

        try {
            const doc = await addDoc(collection(db,'tasks'),
            {
                name:value,
                detail:"",
                status:"pending",
                date:""
            })
            console.log("Success", doc)
            setValue("")
            window.location.reload()
        } catch (error) {
            console.log("Error :",error )
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.inlineForm}>
            <input
                type = 'text'
                value = {value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="New Task"
                className={styles.inputBox}
            />
            <button className={styles.addTaskBtn} 
                    disabled={!value.trim()} 
                    type="submit" 
                    aria-label="Add Task">+</button>
        </form>
    );

}

export default AddTask;
