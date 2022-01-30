import React from "react";
import "./App.css";
//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./screens/Navbar";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ForgotPassword from "./screens/ForgotPassword";
import Splash from "./screens/Splash";
import ErrorPage from "./screens/ErrorPage";
import ProfileSetting from "./screens/ProfileSetting";
//

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<Splash />} />
          <Route path="/profile" element={<ProfileSetting />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
