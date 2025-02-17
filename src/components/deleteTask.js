'useClient'
import { userState } from "react";
import db from "@/config/firebase";
import { doc, deleteDoc } from "@firebase/firestore";
import { MdDelete } from "react-icons/md";

const DeleteTask = ({id, onClose}) => {
    const handleDelete = async () => {
        const taskRef = doc(db,'tasks',id)
        try{
            await deleteDoc(taskRef)
            if (onClose) onClose()
            window.location.reload()
        }catch (error) {
            console.log("Error :",error )
        }
    }
    return (
        <button onClick = {handleDelete} aria-label="Delete Task"><MdDelete size={18} color="red"/></button>
    )
}

export default DeleteTask;

