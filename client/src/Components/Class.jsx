import React from "react";
import styles from "./class.module.css";
import { RiArrowRightSLine } from "react-icons/ri";

function Class(props) {
  return (
    <div className={styles.class}>
      {props.name}
      <RiArrowRightSLine />
    </div>
  );
}

export default Class;
