import React, { useEffect } from "react";
import { AuthStore } from "../../store/Auth";
import styles from "./Profile.module.scss";
import WishlistCard from "./WishlistCard";

export default function Wishlist() {
  const { wishList } = AuthStore();

  return (
    <div className={styles.wishlistWrapper}>
      <h2 className={styles.wishTitle}>Wishlist</h2>
      <div className={styles.cardWrapper}>
        {wishList?.map((el) => {
          return <WishlistCard item={el} key={el.id} />;
        })}
      </div>
    </div>
  );
}
