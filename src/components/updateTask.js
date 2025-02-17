import { useState } from "react";
import db from "@/config/firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import styles from "@/styles/index.module.css";
import DeleteTask from "./deleteTask";
import { FiEdit } from "react-icons/fi";

const UpdateTask = ({ id }) => {
    const [value, setValue] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showDateInput, setShowDateInput] = useState(false);
    const [taskDate, setTaskDate] = useState(""); 

    const fetchTaskName = async () => {
        try {
            const docRef = doc(db, "tasks", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const taskData = docSnap.data();
                setTaskName(taskData.name);
                setValue(taskData.detail || "");
                setTaskDate(taskData.date || "");
                setTaskStatus(taskData.status);
                
            } else {
                console.log("No such task!");
            }
        } catch (error) {
            console.log("Error fetching task:", error.message);
        }
    };

    const updateTaskDetail = async (newValue) => {
        setIsUpdating(true);
        try {
            const docRef = doc(db, "tasks", id);
            await updateDoc(docRef, { detail: newValue });
            console.log("Task updated successfully");
        } catch (error) {
            console.log("Error updating task:", error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);

        updateTaskDetail(newValue);
    };

    const togglePopup = async () => {
        if (!showPopup) {
            await fetchTaskName();
        }
        setShowPopup(!showPopup);

        if (showPopup) {
            window.location.reload();
        }
    };

    const markDone = async () => {
        const docRef = doc(db, "tasks", id);
        try {
            await updateDoc(docRef, { status: "completed" });
            console.log("Task marked as completed");
            window.location.reload();
        } catch (error) {
            console.log("Error marking task as completed:", error.message);
        }
    };

    const handleDateSubmit = async () => {
        const docRef = doc(db, "tasks", id);
        try {
            await updateDoc(docRef, { date: taskDate });
            console.log("Task date updated successfully");
            setShowDateInput(false);
        } catch (error) {
            console.log("Error updating task date:", error.message);
        }
    };

    return (
        <div>
            <button onClick={togglePopup} className={styles.updateBtn}>
                <FiEdit />
            </button>
            {showPopup && (
                <div className={styles.popupContainer}>
                    <div className={styles.popup}>
                        <div className={styles.popupHeader}>
                            <DeleteTask id={id} onClose={() => setShowPopup(false)} />
                            <button
                                onClick={togglePopup}
                                className={styles.closeBtn}
                                aria-label="Close Popup"
                            >
                                &times;
                            </button>
                        </div>
                        <h2 className={styles.taskTitle}>{taskName}</h2>
                        <textarea
                            value={value}
                            onChange={handleInputChange}
                            placeholder="Add details"
                            className={styles.textArea}
                        />
                        {isUpdating && <p className={styles.updatingMessage}>Updating...</p>}
                        <button
                            className={styles.popBtn}
                            onClick={() => setShowDateInput(true)}
                        >
                            Add Date
                        </button>
                        {showDateInput && (
                            <div className={styles.dateInputContainer}>
                                <input
                                    type="date"
                                    value={taskDate}
                                    onChange={(e) => setTaskDate(e.target.value)}
                                    className={styles.dateInput}
                                />
                                <button
                                    className={styles.saveDateBtn}
                                    onClick={handleDateSubmit}
                                >
                                    Save Date
                                </button>
                            </div>
                        )}
                        <button
                            className={styles.popBtn}
                            onClick={() => console.log("Move to another list")}
                        >
                            Move to another list
                        </button>
                        {taskStatus === "pending" && (
                            <button className={styles.popBtn} onClick={markDone}>
                                Mark Completed
                            </button>
                        )}
                    </div>
                    <div className={styles.overlay} onClick={togglePopup}></div>
                </div>
            )}
        </div>
    );
};

export default UpdateTask;
