import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBookmarkXFill, BsBookmarkCheckFill } from "react-icons/bs";
import { AuthStore } from "../../store/Auth";
import { MainStore } from "../../store/MainContext";
import styles from "./Product.module.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ProductCard = ({ items }) => {
  const { user, wishList } = AuthStore();
  const { addToWishList, removeToWishList, modalHandler } = MainStore();
  const [wishlistExist, setWishlistExist] = useState(true);

  useEffect(() => {
    const findItemtoWishList = wishList.find((e) => e.id === items.id);
    if (findItemtoWishList !== undefined) return setWishlistExist(false);
    return setWishlistExist(true);
  }, [wishList]);

  return (
    <div className={styles.singleCard}>
      {wishlistExist ? (
        <button
          disabled={!user}
          onClick={() => addToWishList(items)}
          className={styles.favIcon}
        >
          <BsBookmarkXFill />
        </button>
      ) : (
        <button
          onClick={() => removeToWishList(items)}
          disabled={!user}
          className={styles.favIcon}
        >
          <BsBookmarkCheckFill color="orange" />
        </button>
      )}

      <img src={items.image} alt={items.title} />

      <p className={styles.cardTitle}>{items.title}</p>
      <p className={styles.cardPrice}>${items.price}</p>
      <button
        className={styles.seeMore}
        onClick={(e) => {
          e.preventDefault();
          modalHandler(items);
        }}
      >
        See more...
      </button>
    </div>
  );
};

export default ProductCard;
