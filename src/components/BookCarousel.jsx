import React from "react";
import styles from "../css/BookCarousel.module.css"; // Import CSS Module
import { useNavigate } from "react-router-dom";
import Arrow from "../assets/Books/RightArrow.png"; // Import Image
//
//

const BookCarousel = ({ title, books }) => {
  const navigate = useNavigate();
  const handleArrowClick = () => {
    alert("Arrow Clicked");
  };
  //
  const handleSelect = (e) => {
    console.log(books.name);
    e.preventDefault();
    navigate("/SingleBook");
  };
  //

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2 className={styles.carouselTitle}>{title}</h2>
        <div className={styles.seeAllContainer} onClick={handleArrowClick}>
          <strong>See All</strong>
          <img src={Arrow} alt="more books" className={styles.Arrow}></img>
        </div>
      </div>

      <div className={styles.carousel}>
        {books.map((book, index) => (
          <div key={index} className={styles.bookCard} onClick={handleSelect}>
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
