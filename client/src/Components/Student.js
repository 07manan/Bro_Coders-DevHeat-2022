import React from "react";
import "./student.css";
const Student = () => {
  return (
    <div>
      <section className="content-info">
        <div className="container paddings-mini">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="text-center">UI20EC44</h3>
              <table className="table-hover ">
                <thead className="point-table-head">
                  <tr>
                    <th rowspan="5" className="text-center">Date</th>
                    <th colspan="6" className="text-center">Subjects</th>
                  </tr>
                </thead>
                <thead className="">
                  <tr className="">
                    <th className="text-center"></th>
                    <th className="text-center">DSP</th>
                    <th className="text-center">DIC</th>
                    <th className="text-center">CS</th>
                    <th className="text-center">NUMPY</th>
                    <th className="text-center">OOPS</th>
                    <th className="text-center">EBM</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td className="text-center date ">
                      20-11-2022
                    </td>
                    <td>A</td>
                    <td>P</td>
                    <td>A</td>
                    <td>A</td>
                    <td>A</td>
                    <td>A</td>
                  </tr>
                  <tr>
                    <td className="text-center date">
                    21-11-2022
                    </td>
                    <td>A</td>
                    <td>A</td>
                    <td>A</td>
                    <td>A</td>
                    <td>A</td>
                    <td>A</td>
                  </tr>
                  <tr>
                    <td className="text-center date ">
                    22-11-2022
                    </td>
                    <td>A</td>
                    <td>P</td>
                    <td>P</td>
                    <td>P</td>
                    <td>P</td>
                    <td>P</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Student;
