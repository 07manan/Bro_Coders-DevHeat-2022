import React from "react";
import { useSearchParams } from "react-router-dom";
import style from "./AddAttendence.module.css";
import AddAttendenceCell from "./AddAttendenceCell";

function AddAttendence() {
  const [searchParams, setSearchParams] = useSearchParams();
  const batch = searchParams.get("batch");
  const [absentRollnos, setAbsentRollnos] = React.useState([]);
  let dateToday = new Date();
  let date =
    dateToday.getDate() +
    "/" +
    (dateToday.getMonth() + 1) +
    "/" +
    dateToday.getFullYear();
  const data = [
    {
      name: "jim Patel",
      rollno: 47,
      Presence: [true, false, true, true, false],
    },
    {
      name: "Manan Patel",
      rollno: 48,
      Presence: [true, false, true, true, false],
    },
    {
      name: "Rahul Patel",
      rollno: 49,
      Presence: [true, false, true, true, false],
    },
    {
      name: "Raj Patel",
      rollno: 50,
      Presence: [true, false, true, true, false],
    },
    {
      name: "Rajesh Patel",
      rollno: 51,
      Presence: [true, false, true, true, false],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    absentRollnos.length = 0;
    for (let i = 0; i < data.length; i++) {
      if (e.target[i].checked === true) {
        absentRollnos.push(data[i].rollno);
      }
    }

    //data to be sent to server
    axios.patch(
      `http://localhost:8000/api/attendence/${localStorage.getItem("id")}`,
      {
        subject: batch,
        date: date,
      }
    );
    console.log(localStorage.getItem("id"));
    console.log(batch);
    console.log(date);
    console.log(absentRollnos);
  };

  return (
    <div className={style.addattendence}>
      <h1 className={style.heading}>Add Attendence ({date})</h1>
      <div className={style.table}>
        <div className={style.row + " " + style.topRow}>
          <div className={style.cellH}>Roll No.</div>
          <div className={style.cellH}>Name</div>
          <div className={style.cellH} style={{ borderRight: "none" }}>
            Attendence
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {data.map((item, key) => (
            <AddAttendenceCell key={key} data={item} />
          ))}
          <div className={style.row + " " + style.bottomRow}>
            <input className={style.button} type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAttendence;
