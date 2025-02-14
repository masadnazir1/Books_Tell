import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/CategoriesBox.module.css"; // Import CSS Module
import ActivityIndicator from "../Loading/ActivityIndicator";
import URL from "../../utils/API";

const CategoriesBox = () => {
  const [categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${URL}/api/categories`)
      .then((response) => {
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <>
      {Loading ? (
        <div className={styles.LoadingBox}>
          <ActivityIndicator size="30px" color="#000" />
        </div>
      ) : (
        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles.categoryBox}
              onClick={() => console.log(category.id)}
            >
              <img
                className={styles.categoryIcon}
                src="https://cdn-icons-png.flaticon.com/128/3047/3047859.png"
                alt={category.name}
              />
              {category.name}
            </div>
          ))}
          {categories.map((category) => (
            <div key={category.id} className={styles.categoryBox}>
              <img
                className={styles.categoryIcon}
                src="https://cdn-icons-png.flaticon.com/128/3047/3047859.png"
                alt={category.name}
              />
              {category.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoriesBox;
