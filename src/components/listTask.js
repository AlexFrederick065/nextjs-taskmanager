'useClient'

import { useState,useEffect } from "react"
import db from "@/config/firebase"
import {collection, getDocs} from "@firebase/firestore"
import UpdateTask from "./updateTask"
import styles from "@/styles/index.module.css"
import { IoCheckmark } from "react-icons/io5";

const ListTask = () => {
    const [tasks,setItems] = useState([])

    useEffect(()=>{
        const fetchTasks = async () => {
            const querySnapshot = await getDocs(collection(db,'tasks'))
            setItems(querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))  
        }   
        fetchTasks()
    }, [])

    return (
        <div>
            <ul>
            {tasks.filter((task) => task.status === "pending").map((task) => (
                <li key={task.id} style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h2 >{task.name}</h2>
                        <UpdateTask id={task.id}/>
                    </div>
                    <p className={styles.taskDetail}>{task.detail}</p>
                    <p className={styles.taskDate}>{task.date}</p>
                </li>
                ))}
            </ul>
            <ul className={styles.completedTask}>
                <h2 style={{paddingBottom:"10px"}}>Completed Task</h2>
                {tasks.filter((task) => task.status === "completed").map((task) => (
                <li key={task.id} style={{ marginBottom: "10px" }}>
                    <div  style={{ display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <IoCheckmark color="green"/>
                        <h2 style={{paddingLeft:"10px"}}>{task.name}</h2>
                    </div>
                    <p className={styles.taskDetail}>{task.detail}</p>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default ListTask
