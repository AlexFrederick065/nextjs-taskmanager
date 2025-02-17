"use client";
import { useState } from "react";
import { FiPlus } from "react-icons/fi"; // + icon
import { IoClose } from "react-icons/io5"; // Close (X) icon
import AddTask from "@/components/addTask";
import ListTask from "@/components/listTask";
import Header from "@/components/header";
import styles from "@/styles/index.module.css";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false); // Popup visibility state
  const [newCollection, setNewCollection] = useState(""); // Input value state

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleAddCollection = () => {
    if (newCollection.trim() !== "") {
      console.log("New Collection Added:", newCollection);
      setNewCollection("");
      togglePopup();
    } else {
      alert("Please enter a collection name.");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section className={styles.tasks}>
          <div className={styles.taskCard}>
            <div className={styles.taskHeader}>
              <h2>Tasks</h2>
            </div>
            <div className={styles.taskBody}>
              <div className={styles.addTask}>
                <AddTask />
              </div>
              <div className={styles.taskItem}>
                <ListTask />
              </div>
            </div>
          </div>
        </section>
      </main>

      <button onClick={togglePopup} className={styles.addCollectionBtn}>
        <FiPlus size={24} />
      </button>

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <div className={styles.popupHeader}>
              <h3>New List</h3>
              <button className={styles.closeBtn} onClick={togglePopup}>
                <IoClose size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter List Name"
              value={newCollection}
              onChange={(e) => setNewCollection(e.target.value)}
              className={styles.inputField}
            />
            <button onClick={handleAddCollection} className={styles.addBtn}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
