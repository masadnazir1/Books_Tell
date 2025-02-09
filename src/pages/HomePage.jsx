import { useState, useEffect } from "react";
import BookCarousel from "../components/BookCarousel";
import Styles from "../css/HomePage.module.css";
import axios from "axios";
import CategoryCarousel from "../components/CategoryCarousel";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [apiBooks, setbapiBooks] = useState([]);
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    const categories = async () => {
      try {
        const api = "http://localhost:5000/api/categories";
        const response = await axios.get(api);
        // Extract category names
        const categoryNames = response.data.map((category) => category.name);
        setcategories(["All", ...categoryNames]);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    categories();

    const books = async () => {
      try {
        const api = "http://localhost:5000/api/GetAllBooks";
        const res = await axios.get(api);

        // Transform the data to include the category name if exists
        const transformedData = res.data.map((item) => ({
          ...item,
          Category: item.Category ? item.Category.name : null,
          // Constructing the full URL for the cover image
          cover_image_url: `http://localhost:5000${item.cover_image_url}`,
        }));
        setbapiBooks(transformedData);
        console.log(transformedData);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };

    books();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Filter books based on active category
  const filteredBooks =
    activeCategory === "All"
      ? apiBooks
      : apiBooks.filter((book) => book.Category === activeCategory);

  return (
    <div className={Styles.container}>
      <CategoryCarousel
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      <BookCarousel title="Popular Books" books={filteredBooks} />
    </div>
  );
};

export default HomePage;
