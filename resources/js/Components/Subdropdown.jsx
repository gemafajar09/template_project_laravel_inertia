import React, { useState } from "react";
import {
  IoAlbums,
  IoArrowBackCircleOutline,
  IoArrowDownCircleOutline,
  IoServerOutline,
} from "react-icons/io5";

const Subdropdown = ({ children, icon, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <button
        onClick={() => toggleDropdown()}
        type="button"
        className="justify-between flex gap-1 items-center w-full p-1 text-gray-900 rounded-lg pl-5 group hover:bg-gray-100">
        <div className="flex gap-1 items-center justify-between">
          {icon}
          <span className="flex-1 ms-3 whitespace-nowrap">{title}</span>
        </div>
        <div>
          {isOpen ? <IoArrowDownCircleOutline /> : <IoArrowBackCircleOutline />}
        </div>
      </button>
      <ul className={`${isOpen ? "block" : "hidden"} py-2 space-y-2 pl-5`}>
        {children}
      </ul>
    </li>
  );
};

export default Subdropdown;
