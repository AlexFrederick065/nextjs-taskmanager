import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/index.module.css";

const Header = () => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch("https://picsum.photos/id/77/info");
        const data = await response.json();
        setProfileImage(data.download_url);
      } catch (error) {
        console.error("Failed to fetch profile image:", error);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo-placeholder.png" alt="Logo" className={styles.logoImg} />
        <h1>Tasks Board</h1>
      </div>
      <div className={styles.profile}>
        <img src={profileImage} alt="Profile Picture" className={styles.profileImg} />
      </div>
    </header>
  );
};

export default Header;
