import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { TbJewishStar } from "react-icons/tb";

import styles from "./Product.module.scss";
import { AuthStore } from "../../store/Auth";
import { MainStore } from "../../store/MainContext";
const ProductCard = ({ items }) => {
  const { user, wishList, basket } = AuthStore();
  const {} = MainStore();

  // useEffect(() => {
  //   if(user && wishList.length > 0){

  //   }
  // }, []);

  return (
    <Link className={styles.singleCard}>
      <button className={styles.favIcon}>
        <TbJewishStar />
      </button>
      <img src={items.image} alt={items.title} />
      <p className={styles.cardTitle}>{items.title}</p>
      <p className={styles.cardPrice}>${items.price}</p>
    </Link>
  );
};

export default ProductCard;
