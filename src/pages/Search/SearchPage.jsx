import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimationLoading from "../../Animation/AnimationLoading";
import { AuthStore } from "../../store/Auth";
import { MainStore } from "../../store/MainContext";
import styles from "./Search.module.scss";
function SearchPage() {
  const { addBasket } = MainStore();
  const { user } = AuthStore();
  const { search } = useParams();

  const [loading, setLoading] = useState(false);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [cat, setCat] = useState([
    "women's clothing",
    "men's clothing",
    "jewelery",
    "electronics",
  ]);
  const getFilteredItems = async () => {
    try {
      let res = await fetch("https://fakestoreapi.com/products");
      let data = await res.json();
      let searchText = search.toLowerCase;
      const checkTitleForFiltering = data.filter((product) =>
        product.title.toLowerCase().trim().includes(search.toLowerCase().trim())
      );
      if (checkTitleForFiltering.length > 0) {
        setfilteredProducts(checkTitleForFiltering);
        setLoading(true);
      } else if (checkTitleForFiltering.length === 0) {
        const checkDescForFiltering = data.filter((product) =>
          product.description
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim())
        );
        setfilteredProducts(checkDescForFiltering);
        setLoading(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  async function categoryFunc(category) {
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      let data = await res.json();
      setfilteredProducts(data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    let finder = cat.find((el) => el.includes(search));
    finder ? categoryFunc(finder) : getFilteredItems();
  }, [search]);

  if (!loading) {
    return (
      <div className={styles.loading}>
        <AnimationLoading />
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        {filteredProducts.length} <span>items found</span>
      </h1>
      <div className={styles.productsWrapper}>
        {filteredProducts.map((product) => {
          return (
            <div className={styles.cardWrapper} key={product.id}>
              <div className={styles.productImg}>
                <img src={product.image} alt={product.title} />
              </div>
              <div className={styles.productRight}>
                <h2 className={styles.pTitle}>{product.title}</h2>
                <p className={styles.pCategory}>
                  Category: <span>{product.category}</span>
                </p>
                <p className={styles.pDesc}>{product.description}</p>
                <p className={styles.price}>${product.price}</p>
                <button
                  disabled={!user}
                  onClick={() => addBasket(product)}
                  className={styles.addBasket}
                >
                  Add Basket
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchPage;
