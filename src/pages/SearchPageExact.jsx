import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import Styles from "../css/SearchPageExact.module.css";
import empty from "../assets/TabsIcons/Search.png";
import { useNavigate } from "react-router-dom";
import URL from "../utils/API";
import GlobalAudioPlayer from "../components/GlobalAudioPlayer";
import ActivityIndicator from "../components/Loading/ActivityIndicator";

const SearchPageExact = () => {
  const Navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  ///
  const handleSelect = (book) => {
    console.log(book.title, book.id); // Log the book's name
    Navigate("/SingleBook", { state: { book } }); // Passing the book to the detail page
  };

  useEffect(() => {
    // Check if GlobalAudioPlayer is rendered
    const playerElement = document.querySelector(".global-audio-player");
    setIsPlayerVisible(!!playerElement);
  }, []);
  // Debounced API call to reduce unnecessary requests

  const fetchBooks = debounce(async (searchQuery) => {
    if (searchQuery.length > 0) {
      SetLoading(true);
      try {
        const response = await axios.get(
          `${URL}/api/searchBook?query=${searchQuery}`
        );

        // Ensure response.data.results exists and is an array
        if (Array.isArray(response.data.results)) {
          const transformedData = response.data.results.map((item) => ({
            ...item,
            Category: item.Category ? item.Category.name : null,
            cover_image_url: `${URL}${item.cover_image_url}`, // Construct full URL
          }));
          SetLoading(false);
          setResults(transformedData);
        } else {
          SetLoading(false);
          console.error("Invalid data format:", response.data);
          setResults([]); // Avoid breaking the UI
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    } else {
      setResults([]); // Clear results when input is empty
    }
  }, 500); // Debounce delay (500ms)

  //
  // Effect to call API when query changes
  useEffect(() => {
    fetchBooks(query);
  }, [query]);
  //
  //
  const addtoShelf = async () => {
    const data = {
      user_id: "1234",
      book_id: "12345",
    };

    try {
      const response = await axios.post(`${URL}/api/AddToMyShelf/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        alert(response.data.ok);
      }
    } catch (error) {
      console.error("Error adding the book to the shelf");
    }
  };
  //
  //
  return (
    <div className={Styles.ExplorePageContainer}>
      <section className={Styles.SearchSection}>
        <div className={Styles.BackIconBox}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
            alt="Back"
            className={Styles.BackIcon}
            onClick={() => Navigate(-1)}
          />
        </div>
        <div className={Styles.SearchBar}>
          <button className={Styles.SearchButton}>
            <img src={empty} alt="" className={Styles.icon} />
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books, authors, genres..."
            className={Styles.SearchInput}
          />
        </div>
      </section>

      <section
        className={`${Styles.ExplorePageInfo} ${
          isPlayerVisible ? Styles.WithPlayer : ""
        }`}
      >
        {Loading && <ActivityIndicator color="#000" width="40px" />}
        {results.length > 0
          ? results.map((book) => (
              <div className={Styles.book} key={book.id}>
                <div className={Styles.bookBox}>
                  <div className={Styles.ImgageBox}>
                    <img
                      src={book.cover_image_url}
                      alt={book.title}
                      style={{
                        width: "100px",
                        height: "125px",
                        marginRight: "10px",
                      }}
                    />
                  </div>

                  <div className={Styles.bookDetailsBOX}>
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                  </div>
                </div>
                <div className={Styles.ActionBox}>
                  <button className={Styles.ActionButtons} onClick={addtoShelf}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                      className={Styles.PlayButton}
                      alt="Like"
                    />
                  </button>
                  <button
                    className={Styles.ActionButtons}
                    onClick={() => handleSelect(book)}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/483/483054.png"
                      className={Styles.PlayButton}
                      alt="Play"
                    />
                  </button>
                </div>
              </div>
            ))
          : query && <p>No results found</p>}

        <div className="global-audio-player">
          <GlobalAudioPlayer />
        </div>
      </section>
    </div>
  );
};

export default SearchPageExact;
