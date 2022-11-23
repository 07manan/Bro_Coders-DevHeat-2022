import React from "react";
import style from "./AddAttendence.module.css";

function AddAttendenceCell(props) {
  const [absence, setAbsence] = React.useState(false);
  return (
    <div className={style.row}>
      <div className={style.cell}>{props.data.rollno}</div>
      <div className={style.cell}>{props.data.name}</div>
      <div className={style.cell + " " + style.cellAP}>
        <input
          onClick={() => setAbsence(!absence)}
          id={"checkbox" + props.data.rollno}
          className={style.checkbox}
          type="checkbox"
        />
        <label className={style.label} htmlFor={"checkbox" + props.data.rollno}>
          {absence ? "A" : "P"}
        </label>
      </div>
    </div>
  );
}

export default AddAttendenceCell;
