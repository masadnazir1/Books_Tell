import React from "react";
import Styles from "../css/LikedPage.module.css";

import settings from "../assets/General/settings.png";

const LikedPage = () => {
  const empty = "https://cdn-icons-png.flaticon.com/128/982/982070.png";
  return (
    <div className={Styles.LikedPageContainer}>
      <div className={Styles.LikedPageHeader}>
        <h1 className={Styles.LikedPageHeading}>My BookShelf</h1>
        <img
          src={settings}
          alt=""
          className={Styles.settingsIcon}
          onClick={() => alert("Setting Button clicked")}
        />
      </div>
      <section className={Styles.LikedPageInfo}>
        <div className={Styles.LikedPictureBox}>
          <img src={empty} alt="User Icon" className={Styles.LikedPicture} />
        </div>
        <h1 className={Styles.LikedPageHeading}>Your Bookshelf looks empty</h1>
        <h2 className={Styles.LikedPageHeading}>
          Browse the homepage to find your next story
        </h2>
        <button className={Styles.LikedPageButton}>Browse</button>
      </section>
    </div>
  );
};

export default LikedPage;
