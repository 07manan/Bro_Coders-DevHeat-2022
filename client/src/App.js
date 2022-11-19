import { Route, Routes } from "react-router-dom";
import AddClasses from "./Pages/AddClasses";

import Classes from "./Pages/Classes";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import Home from "./Components/Home";
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<LoginForm/>} />
      <Route path="/home" element={<Home/>} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/add-classes" element={<AddClasses />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>} />
      </Routes>
    </>
  );
}

export default App;
