import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/register.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const RegisterForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  let name, value;
  let navigate = useNavigate();
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const handleSign = async (e) => {
    e.preventDefault();

    const { username, email, password } = user;
    let fetchUrl = "/api/register";
    const res = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const json = await res.json();
    // console.log(json.authToken);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      window.alert("Created Successfull");
      navigate("/login");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="registration-form">
      <form>
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
            type="text"
            className="form-control item"
            onChange={handleInputs}
            id="email"
            name="email"
            value={user.email}
            placeholder="Email"
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
            onClick={handleSign}
          >
            Create Account
          </button>
        </div>
        <div>
          <span className="extra">
            Already have an account? <a href="/login">Login</a>
          </span>
        </div>
      </form>
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
    </div>
  );
};

export default RegisterForm;
