import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AttendenceCard from "./AttendenceCard";

import style from "./Student.module.css";

const Student = () => {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const [attendence, setAttendence] = React.useState([]);
  const [name, setName] = React.useState("Manan");
  const batch = searchParams.get("batch");
  const roll = searchParams.get("rollno");

  useEffect(() => {
    // axios
    //   .get(`http://localhost:8000/api/student/name/${batch}/${roll}`)
    //   .then((res) => {
    //     setName(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get(`http://localhost:8000/api/student/${batch}/${roll}`)
      .then((res) => {
        // console.log(res.data);
        setAttendence(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={style.Student}>
      <h1>{name}'s Attendence</h1>

      {attendence?.map((item, key) => {
        return <AttendenceCard key={key} attendence={item} />;
      })}
      {attendence?.map((item, key) => {
        return <AttendenceCard key={key} attendence={item} />;
      })}
      {attendence?.map((item, key) => {
        return <AttendenceCard key={key} attendence={item} />;
      })}
    </div>
  );
};

export default Student;
