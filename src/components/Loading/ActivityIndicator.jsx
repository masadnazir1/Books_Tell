import React from "react";
import styles from "./ActivityIndicator.module.css";

const ActivityIndicator = ({ size = "40px", color = "#3498db" }) => {
  return (
    <div
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} transparent`,
      }}
    ></div>
  );
};

export default ActivityIndicator;
