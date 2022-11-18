import React, { useState } from "react";
import * as xlsx from "xlsx";
import axios from "axios";

function AddClasses() {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [examname, setExamName] = useState(null);

  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
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
    if (excelFile !== null) {
      const workbook = xlsx.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const rawdata = xlsx.utils.sheet_to_json(worksheet);
      const data = xlsx.utils.sheet_to_json(worksheet);
      let i = 0;
      while (i < data.length) {
        data[i].en_no = rawdata[i].en_no.toUpperCase();
        i++;
      }
      console.log(data);
      axios.post("http://localhost:8000/test", data);
      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Class Name" />
        <input
          type="file"
          className=" uploadfile"
          onChange={handleFile}
          required
        />
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
}

export default AddClasses;
