import "../style.css";
import React, { useState } from "react";
import { FiHome } from "react-icons/fi";
import Add from "./add";
import profileImage from '../images/unnamed.jpg'
function Side() {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  return (
    <div className="h-screen rounded-tr-[80px] flex flex-row bg-dblack">
      <div className="flex flex-col rounded-r-3xl overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl text-white uppercase text-indigo-500 sidebar-title">
            Esi-check
          </h1>
        </div>
        <div className="line"></div>
        <ul className="flex flex-col py-4">
        <li className="flex flex-col items-center mb-2 mr-5">
            <div className="image-sidebare-wrapper mb-2">
              <img
                className="image-sidebare rounded-full"
                src={profileImage}
                alt="Profile Picture"
              />
            </div>
            <div className="profileInfo">
              <p className="text-white center mb-0.5">Serhane</p>
              <p className="text-white">o.serhane@gmail.com</p>
            </div>
          </li>
          <li>
            <a
              href="#"
              className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 sidebar-link ${
                activeLink === 0 ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick(0)}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <FiHome />
              </span>
              <span className="text-sm font-medium">Dashboard</span>
            </a>
          </li>

          <li>
            <Add/>
          </li>
        
        
       
        </ul>
      </div>
    </div>
  );
}

export default Side;
