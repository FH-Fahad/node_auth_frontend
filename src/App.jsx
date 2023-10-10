import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import About from "./components/About/About";
import HomePage from "./Pages/HomePage/HomePage";
import Header from "./components/Header/Header.jsx";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
// import Account from "./components/Account/Account";
// import Settings from "./components/Settings/Settings";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <Header />
      <Routes>
        {token && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<Navigate replace to="/" />} />
            <Route path="/contact" element={<Navigate replace to="/" />} />
            <Route path="/login" element={<Navigate replace to="/" />} />
            <Route path="/register" element={<Navigate replace to="/" />} />
            <Route path="*" element={<Navigate replace to="/" />} />
            {/* <Route path="/account" element={<Account />} /> */}
            {/* <Route path="/settings" element={<Settings />} /> */}
          </>
        )}

        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
