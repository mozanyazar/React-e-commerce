import React from "react";
import styles from "./Modal.module.scss";
import { HiOutlineXCircle } from "react-icons/hi";
import { MainStore } from "../../store/MainContext";
import { AuthStore } from "../../store/Auth";

const Modal = () => {
  const { modalHandler, modalToggle, addBasket } = MainStore();
  const { user } = AuthStore();
  return (
    <>
      {modalToggle.isOpen && (
        <div className={styles.modalWrapper}>
          <div
            onClick={() => modalHandler("close")}
            className={styles.modalOverlay}
          ></div>

          <div className={styles.modalBox}>
            <button onClick={() => modalHandler("close")}>
              <HiOutlineXCircle />
            </button>
            <div className={styles.productWrapper}>
              <div className={styles.imgWrapper}>
                <img src={`${modalToggle.items.image}`} alt="" />
              </div>
              <div className={styles.productDesc}>
                <p>{modalToggle.items.category}</p>
                <p>{modalToggle.items.title}</p>
                <p>
                  <span>Rate</span>: 5/{modalToggle.items.rating.rate}
                </p>
                <p>{modalToggle.items.description}</p>
              </div>
              <button
                onClick={() => addBasket(modalToggle.items)}
                className={styles.addBasket}
              >
                {user ? "add basket" : "Login"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
