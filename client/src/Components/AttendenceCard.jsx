import React from "react";
import style from "./AttendenceCard.module.css";

function AttendenceCard(props) {
  function getColor(percent) {
    //value from 0 to 1
    var hue = ((percent / 100) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }
  return (
    <div className={style.card}>
      <div className={style.cardHead}>
        <p>Subject:</p>
        <p>{props.attendence.subject}</p>
      </div>
      <div className={style.cardItem + " " + style.total}>
        <p>Total Lectures Conducted:</p>
        <p>{props.attendence.total}</p>
      </div>
      <div className={style.cardItem + " " + style.present}>
        <p>Total Lectures Present:</p>
        <p>{props.attendence.total - props.attendence.absent}</p>
      </div>
      <div
        percent={props.attendence.percent}
        className={style.cardItem + " " + style.percent}
      >
        <p>Percentage:</p>
        <p>{props.attendence.percent}%</p>
      </div>
      <div className={style.percentBar}>
        <div
          className={style.percentBarFill}
          style={{
            width: props.attendence.percent + "%",
            backgroundColor: getColor(props.attendence.percent),
          }}
        ></div>
      </div>
    </div>
  );
}

export default AttendenceCard;
