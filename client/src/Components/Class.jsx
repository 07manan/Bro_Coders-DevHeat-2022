import React from "react";
import styles from "./class.module.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Class(props) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.class}
      onClick={() => {
        navigate(`/class?batch=${props.name}`);
      }}
    >
      {props.name}
      <RiArrowRightSLine />
    </div>
  );
}

export default Class;
