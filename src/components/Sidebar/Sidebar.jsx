import React, { useEffect } from "react";
import styles from "./Sidebar.module.scss";
import { MainStore } from "../../store/MainContext";
import { AuthStore } from "../../store/Auth";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdRemoveCircle } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { sidebarToggleHandler, sidebarToggle, addBasket, removeBasket } =
    MainStore();
  const { basket, totalPrice, user, logOut } = AuthStore();
  const navigate = useNavigate();
  if (user) {
    return (
      <section
        className={
          !sidebarToggle
            ? styles.sidebarOverlay
            : `${styles.sidebarOverlay} ${styles.active}`
        }
      >
        <div className={styles.sidebarContent}>
          <button
            onClick={() => sidebarToggleHandler("close")}
            className={styles.closebtn}
          >
            <IoMdCloseCircle />
          </button>
          <h1>Basket</h1>
          <div className={styles.basketSide}>
            {basket.map((e) => (
              <div className={styles.basketItem} key={e.id}>
                <div className={styles.imgWrapper}>
                  <img src={e.image} alt={e.title} />
                </div>
                <div className={styles.productText}>
                  <p className={styles.pTitle}>{e.title}</p>
                  <div>
                    <span>Price: ${e.price}</span>
                  </div>
                  <div className={styles.buttonGroup}>
                    <button onClick={() => addBasket(e)}>
                      <BsFillPlusCircleFill />
                    </button>
                    <b>{e.quantity}</b>
                    <button onClick={() => removeBasket(e)}>
                      <MdRemoveCircle />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h2>Total Price: ${totalPrice}</h2>
          {user && (
            <div className={styles.profile}>
              <button
                onClick={() => {
                  navigate("/profile");
                  sidebarToggleHandler("profile");
                }}
              >
                Profile
              </button>
              <button onClick={() => logOut()}>
                Logout <CiLogout fontSize={60} />
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }
};

export default Sidebar;
