import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import style from "./ClassPage.module.css";

function ClassPage() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const batch = searchParams.get("batch");
  //use batch to fetch data of absent students

  const lecdates = ["01/11/22", "02/11/22", "03/11/22", "04/11/22", "05/11/22"];
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
  return (
    <div className={style.ClassPage}>
      <h1 className={style.heading}>{batch}</h1>
      <table className={style.table}>
        <thead>
          <tr className={style.tablehead}>
            <th>Name</th>
            <th>Roll No.</th>
            {lecdates.map((date, key) => (
              <th style={{ fontSize: "1rem" }} key={key}>
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => (
            <tr key={key}>
              <td className={style.cell}>{item.name}</td>
              <td className={style.cell}>{item.rollno}</td>
              {item.Presence.map((pr, key) => (
                <td
                  key={key}
                  className={style.cell}
                  style={
                    pr
                      ? { color: "green", fontWeight: "600" }
                      : { color: "red", fontWeight: "600" }
                  }
                >
                  {pr ? "P" : "A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className={style.tableFooter}>
            <td colSpan={data[0].Presence.length + 2} className={style.tftd}>
              <button
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/add-attendence");
                }}
              >
                Add Attendence
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
export default ClassPage;
