import React from "react";
import SideQuery from "./SideQuery";
import ProductsWrapper from "./ProductsWrapper";
import styles from "./Product.module.scss";

const Products = () => {
  return (
    <div className={styles.productsPageWrapper}>
      <SideQuery />
      <ProductsWrapper />
    </div>
  );
};

export default Products;
