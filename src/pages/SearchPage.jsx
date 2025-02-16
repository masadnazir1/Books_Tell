import React from "react";
import Styles from "../css/ExplorePage.module.css";
import empty from "../assets/TabsIcons/Search.png";
import CategoriesBox from "../components/Explore/CategoriesBox";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  ///
  const Navigate = useNavigate();

  //
  return (
    <div className={Styles.ExplorePageContainer}>
      <div className={Styles.ExplorePageHeader}>
        <h1 className={Styles.ExplorePageHeading}>Explore</h1>
      </div>
      <section className={Styles.SearchSection}>
        <div className={Styles.SearchBar}>
          <button className={Styles.SearchButton}>
            <img src={empty} alt="" className={Styles.icon} />
          </button>
          <input
            type="text"
            placeholder="Search for books, authors, genres..."
            className={Styles.SearchInput}
            onClick={() => Navigate("/Find")}
          />
        </div>
      </section>
      <section className={Styles.ExplorePageInfo}>
        <CategoriesBox />
      </section>
    </div>
  );
};

export default SearchPage;
