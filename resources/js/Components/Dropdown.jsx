import React, { useState } from 'react';
import { IoArrowBackCircleOutline, IoArrowDownCircleOutline } from 'react-icons/io5';

const Dropdown = ({ children, icon, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
        <button onClick={() => toggleDropdown()} type="button" className="flex w-full items-center justify-between p-2 text-gray-600 hover:text-white rounded-lg hover:bg-gray-700 group">
            <div className='flex gap-1 items-center'>
                {icon}
                <span className="flex-1 ms-3">{title}</span>

            </div>
            {
                isOpen ? <IoArrowDownCircleOutline /> : <IoArrowBackCircleOutline />
            }
        </button>
        <ul className={`${isOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
            {children}
        </ul>
    </li>
  );
};

export default Dropdown;
