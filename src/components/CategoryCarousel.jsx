import React from "react";
import styles from "../css/CategoryCarousel.module.css";

const CategoryCarousel = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.categoryList}>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`${styles.categoryButton} ${
              activeCategory === category ? styles.active : ""
            }`}
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
