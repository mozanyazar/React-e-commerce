import React from "react";
import styles from "./Footer.module.scss";
import { BsLinkedin } from "react-icons/bs";
import { ImGithub } from "react-icons/im";

import img1 from "../../assets/1.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.leftWrapper}>
          <img src={img1} alt="placeholder" />
          <span>A passionate frontend developer from Turkey</span>
        </div>
        <div className={styles.rightWrapper}>
          <span>Contact Info</span>
          <p>mahmutozanyazar@gmail.com</p>
          <div className={styles.socialButtons}>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/mahmutozanyazar/"
            >
              <BsLinkedin />
            </a>

            <a href="https://github.com/mozanyazar" target="_blank">
              <ImGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
