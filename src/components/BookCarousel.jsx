import React from "react";
import styles from "../css/BookCarousel.module.css"; // Import CSS Module
import Arrow from "../assets/Books/RightArrow.png"; // Import Image
//
//

const BookCarousel = ({ title, books }) => {
  const handleArrowClick = () => {
    alert("Arrow Clicked");
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2 className={styles.carouselTitle}>{title}</h2>
        <img
          src={Arrow}
          alt="more books"
          className={styles.Arrow}
          onClick={handleArrowClick}
        ></img>
      </div>

      <div className={styles.carousel}>
        {books.map((book, index) => (
          <div key={index} className={styles.bookCard}>
            <img
              src={book.cover}
              alt={book.name}
              className={styles.bookCover}
            />
            <p className={styles.bookName}>{book.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCarousel;
