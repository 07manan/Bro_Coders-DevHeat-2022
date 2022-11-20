import React, { useEffect } from "react";
import Class from "../Components/Class";
import styles from "./classes.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Classes() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [classes, setClasses] = React.useState([]);
  let uid = localStorage.getItem("id");
  useEffect(() => {
    axios.get(`http://localhost:8000/api/classes/${uid}`).then((res) => {
      setClasses(res.clas);
    });
  }, []);
  return (
    <div className={styles.classes}>
      {classes?.map((item, index) => {
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
