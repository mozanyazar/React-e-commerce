import React from "react";
import { MainStore } from "../../store/MainContext";
import ProductCard from "./ProductCard";
import styles from "./Product.module.scss";
import { ApiStore } from "../../store/ProductApi";
import AnimationLoading from "../../Animation/AnimationLoading";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SkeletonCard from "../../components/Skeleton/SkeletonCard";

const ProductsWrapper = () => {
  const { initialProduct } = MainStore();
  const { loading } = ApiStore();

  return (
    <div className={styles.productsWrapper}>
      {!loading ? (
        <SkeletonCard cards={initialProduct.length} />
      ) : (
        initialProduct?.map((items) => (
          <ProductCard key={items.id} items={items} />
        ))
      )}
    </div>
  );
};

export default ProductsWrapper;
