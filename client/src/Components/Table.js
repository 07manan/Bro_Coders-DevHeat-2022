import React, { useState } from "react";

const Table = () => {
  const [status, setStatus] = useState(1);

  function handleClick() {
    //   setStatus("A");
  }
  const data = [
    {
      roll: "1",
      name: "Navdeep",
      status: 1,
    },
    {
      roll: "2",
      name: "Navdeep",
      status: "P",
    },
    {
      roll: "3",
      name: "Navdeep",
      status: "P",
    },
    {
      roll: "4",
      name: "Navdeep",
      status: "P",
    },
  ];
  return (
    <div>
      <h2 className="text-center">Attendance Table</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Roll No.</th>
              <th>Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr>
                <td className="text-center">{d.roll}</td>
                <td> {d.name}</td>
                <td>{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
