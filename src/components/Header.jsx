import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../componentStyles/Header.module.scss";
import { Icon } from "@iconify/react";
import { MainStore } from "../store/MainContext";

export const Header = () => {
  const { sidebarToggleHandler, basket } = MainStore();
  const [toggle, setToggle] = useState(false);

  return (
    <header className={styles.headerWrapper}>
      <button
        onClick={() => setToggle(!toggle)}
        className={
          !toggle ? styles.toggle : `${styles.toggle} ${styles.active}`
        }
      >
        <Icon fontWeight={800} icon="quill:hamburger-sidebar" />
      </button>
      <nav
        className={
          !toggle
            ? styles.navigationLinksWrapper
            : `${styles.navigationLinksWrapper} ${styles.active}`
        }
      >
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>Products</Link>
          </li>
          <li>
            <Link to={"/"}>Log In</Link>
          </li>
          <li>
            <Link to={"/"}>About Us</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.headerRightWrapper}>
        <div className={styles.headerSearch}>
          <input placeholder="search..." type="text" />
          <Icon
            className={styles.searchIcon}
            icon="material-symbols:search-rounded"
          />
        </div>
        <div className={styles.iconsGroup}>
          <Icon
            className={styles.personIcon}
            fontSize={50}
            icon="material-symbols:person"
          />
          <button
            onClick={() => sidebarToggleHandler("open")}
            className={styles.basketItem}
          >
            <span>{basket.length}</span>
            <Icon fontSize={50} icon="ic:outline-shopping-cart" />
          </button>
        </div>
      </div>
    </header>
  );
};
