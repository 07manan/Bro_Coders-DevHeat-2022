import "./App.css";
import LoginForm from "./forms/LoginForm";
import { BrowserRouter , Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./forms/RegisterForm";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />

    </Routes>
    <Routes>
      <Route exact path="/login" element={<LoginForm />} />
    </Routes>
    <Routes>
      <Route exact path="/register" element={<RegisterForm />} />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
