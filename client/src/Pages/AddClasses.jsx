import React, { useState } from "react";
import * as xlsx from "xlsx";
import axios from "axios";

import style from "./AddClasses.module.css";
import { useNavigate } from "react-router-dom";

function AddClasses() {
  const navigate = useNavigate();
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [batch, setBatch] = useState(null);

  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      setExcelFileError("Please select your file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBatch(e.target.class.value);
    if (excelFile !== null) {
      const workbook = xlsx.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);
      // axios.post("http://localhost:8000/test", data);
      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    //post req to add class
    axios.post(
      `http://localhost:8000/api/addclasses/${localStorage.getItem("id")}`,
      {
        classname: batch,
        subject: "DSA",
        data: excelData,
      }
    );
    navigate(`/class?batch=${batch}`);
  };

  return (
    <div className={style.AddClasses}>
      <form onSubmit={handleSubmit} className={style.form}>
        <select name="class" id="class">
          <option value="ECE 5th sem">ECE 5th sem</option>
          <option value="ECE 3rd sem">ECE 3rd sem</option>
          <option value="CSE 3rd sem">CSE 3rd sem</option>
          <option value="CSE 5th sem">CSE 5th sem</option>
        </select>
        <input
          type="file"
          className=" uploadfile"
          onChange={handleFile}
          required
        />
        <input type="submit" value="SUBMIT" />
      </form>
      {excelFileError && "Please Select only excell files"}
      {excelData && (
        <table className={style.table}>
          <thead>
            <tr className={style.tablehead}>
              <th>Roll No</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <NamesTable excelData={excelData} />
          </tbody>
          <tfoot>
            <tr className={style.tableFooter}>
              <td colSpan={2} className={style.tftd}>
                <button style={{ cursor: "pointer" }} onClick={handleUpload}>
                  Add Class
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

export default AddClasses;

const NamesTable = ({ excelData }) => {
  return (
    <>
      {excelData.map((val, key) => {
        return (
          <tr key={key}>
            <th className={style.cell}>{val.roll}</th>
            <th className={style.cell}>{val.name}</th>
          </tr>
        );
      })}
    </>
  );
};
