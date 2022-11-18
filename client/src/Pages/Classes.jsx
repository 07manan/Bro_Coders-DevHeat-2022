import React from "react";
import Class from "../Components/Class";
import styles from "./classes.module.css";
 import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Classes() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [classes, setClasses] = React.useState([
    "ECE 5th sem",
    "ECE 3rd Sem",
    "CSE 5th Sem",
    "CSE 3rd Sem",
  ]);
  return (
    <div className={styles.classes}>
      {classes.map((item, index) => {
        return <Class key={index} name={item} />;
      })}
      <div className={styles.addclasses}>
        <AiFillPlusCircle
          onClick={() => {
            navigate("/add-classes");
          }}
        />
      </div>
    </div>
  );
}

export default Classes;
