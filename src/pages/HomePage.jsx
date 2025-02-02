import { useState } from "react";
import BookCarousel from "../components/BookCarousel";
import { books } from "../utils/BooksArr";
import Styles from "../css/HomePage.module.css";
//
import CategoryCarousel from "../components/CategoryCarousel";
import { categories } from "../utils/BooksArr";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  //
  //
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  //
  const filteredBooks =
    activeCategory === "All"
      ? books
      : books.filter((book) => book.category === activeCategory);
  return (
    <div className={Styles.container}>
      <CategoryCarousel
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      <BookCarousel title="Popular Books" books={filteredBooks} />
      <BookCarousel title="Popular Books" books={filteredBooks} />
      <BookCarousel title="Popular Books" books={filteredBooks} />
      <BookCarousel title="Popular Books" books={filteredBooks} />
      <BookCarousel title="Popular Books" books={filteredBooks} />
      <BookCarousel title="Popular Books" books={filteredBooks} />
      <BookCarousel title="Popular Books" books={filteredBooks} />
      <BookCarousel title="Popular Books" books={filteredBooks} />
    </div>
  );
};

export default HomePage;
