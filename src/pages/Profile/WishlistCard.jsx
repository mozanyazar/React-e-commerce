import React, { useEffect, useState } from "react";
import { AuthStore } from "../../store/Auth";
import { MainStore } from "../../store/MainContext";
import { BsBookmarkXFill, BsBookmarkCheckFill } from "react-icons/bs";
import styles from "./Profile.module.scss";

export default function WishlistCard({ item }) {
  const { wishList } = AuthStore();
  const { removeToWishList } = MainStore();
  const [wishlistExist, setWishlistExist] = useState(true);

  useEffect(() => {
    const findItemtoWishList = wishList.find((e) => e.id === item.id);
    if (findItemtoWishList !== undefined) return setWishlistExist(false);
    return setWishlistExist(true);
  }, [wishList]);
  return (
    <div className={styles.wishCard} key={item.id}>
      <button
        onClick={() => removeToWishList(item)}
        className={styles.wishlistRemove}
      >
        <BsBookmarkCheckFill />
      </button>

      <div className={styles.imgWrapper}>
        <img src={item.image} alt={item.title} />
      </div>
      <div className={styles.cardTitle}>
        <p>{item.title}</p>
        <p>${item.price}</p>
      </div>
    </div>
  );
}
