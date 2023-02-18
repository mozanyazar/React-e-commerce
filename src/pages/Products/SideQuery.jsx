import React, { useState } from "react";
import { MainStore } from "../../store/MainContext";
import { ApiStore } from "../../store/ProductApi";
import styles from "./Product.module.scss";

function SideQuery() {
  const { sideCategory, price, setPrice } = MainStore();
  const { sideCategoryUpdate } = ApiStore();

  return (
    <div className={styles.sideQueryWrapper}>
      <div className={styles.categoryWrapper}>
        <p className={styles.catTitle}>Category</p>
        <div>
          {sideCategory?.map((category) => {
            return (
              <button
                className={category.isClicked ? styles.active : undefined}
                onClick={() => sideCategoryUpdate(`${category.menu}`)}
                key={category.menu}
              >
                {category.menu}
              </button>
            );
          })}
        </div>
      </div>
      <div className={styles.priceWrapper}>
        <p className={styles.catTitle}>Price</p>

        <input
          className={styles.priceInput}
          onChange={(e) => setPrice(e.target.value)}
          type="range"
          min={0}
          max={1200}
          value={price}
        />
        <p>${price}</p>
      </div>
    </div>
  );
}

export default SideQuery;
