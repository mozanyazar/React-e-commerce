import React from "react";
import styles from "./Profile.module.scss";
import { CgProfile } from "react-icons/cg";
import { Link, Navigate } from "react-router-dom";
import { AuthStore } from "../../store/Auth";
import Wishlist from "./Wishlist";
export default function Profile() {
  const { user, logOut } = AuthStore();
  return (
    <>
      {!user ? (
        <Navigate to={"/"} />
      ) : (
        <main className={styles.profileWrapper}>
          <div className={styles.accTop}>
            <h1>My Account</h1>
            <div>
              <CgProfile />
            </div>
          </div>
          <div className={styles.profileOrder}>
            <p>My Orders</p>
            <Link to={"/myorders"}>View All...</Link>
          </div>
          <div className={styles.logoutWrapper}>
            <button onClick={() => logOut()}>Logout</button>
          </div>
          <Wishlist />
        </main>
      )}
    </>
  );
}
