import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Components/register.css";

const LoginForm = () => {
  const [userType, setUserType] = useState("teacher");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  let name, value;
  let navigate = useNavigate();
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = user;
    let fetchUrl = "http://localhost:8000/api/login";
    const res = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const json = await res.json();
    // console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("id", json.id);
      toast.success("Login Successfull", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/classes");
    } else {
      toast.error("Invalid Credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.rollno.value, e.target.class.value);
    navigate(
      "/check-attendence?rollno=" +
        e.target.rollno.value +
        "&batch=" +
        e.target.class.value
    );
    //send roll no and class in url to student attendence page
    toast.error("Invalid Credentials", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className="registration-form">
      {userType == "teacher" ? (
        <form>
          <button
            position="left"
            style={{
              marginLeft: "-50px",
              backgroundColor: "white",
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
            className="tab-button"
          >
            Teacher
          </button>
          <button
            position="right"
            style={{ marginRight: "-50px" }}
            className="tab-button"
            onClick={(e) => {
              e.preventDefault();
              setUserType("student");
            }}
          >
            Student
          </button>
          <div className="form-icon">
            <span>
              <i className="icon icon-user"></i>
            </span>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              onChange={handleInputs}
              id="username"
              name="username"
              value-={user.username}
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              onChange={handleInputs}
              id="password"
              name="password"
              value={user.password}
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-block create-account"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div>
            <span className="center">
              Don't have an account? <a href="/register">Create Account</a>
            </span>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <button
            position="left"
            style={{ marginLeft: "-50px" }}
            className="tab-button"
            onClick={(e) => {
              e.preventDefault();
              setUserType("teacher");
            }}
          >
            Teacher
          </button>
          <button
            position="right"
            style={{ marginRight: "-50px", backgroundColor: "white" }}
            onClick={(e) => {
              e.preventDefault();
            }}
            className="tab-button"
          >
            Student
          </button>
          <div className="form-icon">
            <span>
              <i className="icon icon-user"></i>
            </span>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              onChange={handleInputs}
              id="rollno"
              name="rollno"
              value-={user.username}
              placeholder="Roll No."
            />
          </div>

          <select
            className="form-control item"
            style={{ height: "auto" }}
            name="class"
            id="class"
          >
            <option value={null}>Select Batch</option>
            <option value="ECE 5th sem">ECE 5th sem</option>
            <option value="ECE 3rd sem">ECE 3rd sem</option>
            <option value="CSE 3rd sem">CSE 3rd sem</option>
            <option value="CSE 5th sem">CSE 5th sem</option>
          </select>

          <div className="form-group">
            <input
              type="submit"
              className="btn btn-block create-account"
              value="Submit"
            />
          </div>
        </form>
      )}
      <div className="social-media">
        {/* <h5>Sign up with social media</h5> */}
        <div className="social-icons">
          <a href="#">
            <i className="icon-social-facebook" title="Facebook"></i>
          </a>
          <a href="#">
            <i className="icon-social-google" title="Google"></i>
          </a>
          <a href="#">
            <i className="icon-social-twitter" title="Twitter"></i>
          </a>
        </div>
      </div>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
