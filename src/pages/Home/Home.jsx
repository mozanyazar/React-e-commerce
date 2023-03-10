import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import { Icon } from "@iconify/react";
import img1 from "../../assets/1.png";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.png";
import img5 from "../../assets/5.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { MainStore } from "../../store/MainContext";
import { async } from "@firebase/util";
AOS.init();

function Home() {
  const navigate = useNavigate();
  return (
    <main className={styles.homeWrapper}>
      <div className={styles.homeFirstRow}>
        <div className={styles.homeFirstInner}>
          <div
            data-aos-delay="100"
            data-aos="fade-right"
            className={styles.leftSide}
          >
            <h1>
              <span>Lorem Ipsum</span> dolor <br /> sit amet <br />{" "}
              consectetur...
            </h1>
            <button onClick={() => navigate("/products")}>
              Shop Now
              <Icon icon="material-symbols:arrow-circle-right" />
            </button>
          </div>
          <div
            data-aos-delay="550"
            data-aos="fade-left"
            className={styles.rightSide}
          >
            <img src={img1} alt="Placeholder" />
          </div>
        </div>
      </div>
      <div className={styles.homeSecondRow}>
        <div className={styles.secondInner}>
          <div className={styles.leftWrapper}>
            <div data-aos="fade-right" className={styles.firstBox}>
              <img src={img3} alt="placeholder" />
            </div>
            <div data-aos="fade-right" className={styles.firstBox}>
              <img src={img3} alt="placeholder" />
            </div>
          </div>
          <div className={styles.rightWrapper}>
            <Link to={"/"}>
              <h2>Best Sellers</h2>
            </Link>
            <div data-aos="fade-left" className={styles.secondBox}>
              <img src={img4} alt="placeholder" />
            </div>
            <div data-aos="fade-left" className={styles.secondBox}>
              <img src={img5} alt="placeholder" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeThirdRow}>
        <div className={styles.thirdInner}>
          <Link className={styles.categoriesTitle} to={"/"}>
            Categories
          </Link>
          <div className={styles.catagoriesButtons}>
            <Link
              to={"/search/jewelery"}
              data-aos-duration="1000"
              data-aos="flip-left"
            >
              jewelery
            </Link>
            <Link
              to={"/search/men's clothing"}
              data-aos-duration="1000"
              data-aos="flip-right"
            >
              men's clothing
            </Link>
            <Link
              to={"/search/women's clothing"}
              data-aos-duration="1000"
              data-aos="flip-left"
            >
              women's clothing
            </Link>
            <Link
              to={"/search/electronics"}
              data-aos-duration="1000"
              data-aos="flip-right"
            >
              electronics
            </Link>
          </div>
          <button onClick={() => navigate("/products")} data-aos="fade-left">
            Shop Now...
            <Icon icon="material-symbols:arrow-circle-right" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;
