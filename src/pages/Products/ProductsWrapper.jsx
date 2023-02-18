import React from "react";
import { MainStore } from "../../store/MainContext";
import ProductCard from "./ProductCard";
import styles from "./Product.module.scss";
import { ApiStore } from "../../store/ProductApi";
import AnimationLoading from "../../Animation/AnimationLoading";

const ProductsWrapper = () => {
  const { initialProduct } = MainStore();
  const { loading } = ApiStore();

  return (
    <div className={styles.productsWrapper}>
      {!loading ? (
        <AnimationLoading />
      ) : (
        initialProduct?.map((items) => (
          <ProductCard key={items.id} items={items} />
        ))
      )}
    </div>
  );
};

export default ProductsWrapper;
