import React from "react";
import styles from "../css/BookCarousel.module.css";
import { useNavigate } from "react-router-dom";
import Arrow from "../assets/Books/RightArrow.png";

const BookCarousel = ({ title, books }) => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    alert("Arrow Clicked");
  };

  const handleSelect = (book) => {
    console.log(book.title, book.id); // Log the book's name
    navigate("/SingleBook", { state: { book } }); // Passing the book to the detail page
  };

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
          <div
            key={index}
            className={styles.bookCard}
            onClick={() => handleSelect(book)}
          >
            <img
              src={book.cover_image_url}
              alt={book.name}
              className={styles.bookCover}
            />
            <p className={styles.bookName}>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCarousel;
