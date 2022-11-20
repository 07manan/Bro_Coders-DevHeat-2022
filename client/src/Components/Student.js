import React from "react";
import { useSearchParams } from "react-router-dom";
import "./student.css";
const Student = () => {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const batch = searchParams.get("batch");
  const roll = searchParams.get("rollno");
  return (
    <div>
      <section className="content-info">
        <div className="container paddings-mini">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="text-center">Roll No.:{roll}</h3>
              <div className="card">Subject:{}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Student;
