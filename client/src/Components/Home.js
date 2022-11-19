import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import Student from "./Student";
import Table from "./Table";
const Home = () => {
  return (
    <div>
      {/* <h5>Home</h5>  */}
      <div>
        <Table/>
        {/* <Student /> */}
      </div>
    </div>
  );
};

export default Home;
