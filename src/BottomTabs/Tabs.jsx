import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./Tabs.module.css";
import HomeIcon from "../assets/TabsIcons/Home.png";
import SearchIcon from "../assets/TabsIcons/Search.png";
import FavIcon from "../assets/TabsIcons/Heart.png";
import ProfileIcon from "../assets/TabsIcons/user.png";

const Tabs = () => {
  const navigate = useNavigate();

  return (
    <div className={Styles.TabsContainer}>
      <div
        className={Styles.Tab}
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={HomeIcon} alt="Home Tab" className={Styles.TabIcon} />
      </div>
      <div className={Styles.Tab} onClick={() => navigate("/Explore")}>
        <img src={SearchIcon} alt="Search Tab" className={Styles.TabIcon} />
      </div>
      <div className={Styles.Tab} onClick={() => navigate("/Liked")}>
        <img src={FavIcon} alt="Liked Tab" className={Styles.TabIcon} />
      </div>
      <div className={Styles.Tab} onClick={() => navigate("/Profile")}>
        <img src={ProfileIcon} alt="Home Tab" className={Styles.TabIcon} />
      </div>
    </div>
  );
};

export default Tabs;
