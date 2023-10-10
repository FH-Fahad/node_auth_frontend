/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./Dropdown.css";

// import Dropdown from "../../assets/dropdown.svg";

// eslint-disable-next-line react/prop-types
const SingleButtonDropdown = ({ items, username, email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add an event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup by removing the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);

    if (item === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      window.location.href = "/login";
    } else if (item === "Account") {
      window.location.href = "/account";
    }
    // else if (item === "Settings") {
    //   window.location.href = "/settings";
    //   console.log("Settings");
    // }
  };

  return (
    <div className="single-button-dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedItem ? { selectedItem } : username}
        {/* <img
          src={Dropdown}
          alt="logo"
          className={`arrow ${isOpen ? "up" : "down"}`}
        /> */}
        {/* <i className={`arrow ${isOpen ? "up" : "down"}`} /> */}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {items.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SingleButtonDropdown;
