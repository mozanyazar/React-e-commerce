import React from "react";
import styles from "../componentStyles/Sidebar.module.scss";
import { MainStore } from "../store/MainContext";
const Sidebar = () => {
  const { sidebarToggleHandler, sidebarToggle } = MainStore();
  return (
    <section
      onClick={() => sidebarToggleHandler("close")}
      className={
        !sidebarToggle
          ? styles.sidebarOverlay
          : `${styles.sidebarOverlay} ${styles.active}`
      }
    >
      <div className={styles.sidebarContent}></div>
    </section>
  );
};

export default Sidebar;
