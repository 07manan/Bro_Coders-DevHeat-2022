import React from "react";
import { useSearchParams } from "react-router-dom";

import style from "./ClassPage.module.css";

function ClassPage() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const batch = searchParams.get("batch");
  const data = [
    { name: "jim Patel", roll: 47 },
    { name: "Manan Patel", roll: 48 },
    { name: "Rahul Patel", roll: 49 },
    { name: "Raj Patel", roll: 50 },
    { name: "Rajesh Patel", roll: 51 },
  ];
  return (
    <div className={style.ClassPage}>
      <h1 className={style.heading}>{batch}</h1>
      <table className={style.table}>
        <thead className={style.tablehead}>
          <tr>
            <th>Name</th>
            <th>Roll</th>
          </tr>
        </thead>
        {data.map((item, key) => (
          <tr key={key}>
            <td className={style.cell}>{item.name}</td>
            <td className={style.cell}>{item.roll}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
export default ClassPage;
