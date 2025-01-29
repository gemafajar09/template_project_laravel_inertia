import React, { useState } from 'react';
import { IoArrowBackCircleOutline, IoArrowDownCircleOutline } from 'react-icons/io5';

const Dropdown = ({ children, icon, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
        <button onClick={() => toggleDropdown()} type="button" className="flex w-full items-center justify-between p-1 text-gray-900 rounded-lg hover:bg-gray-100 group">
            <div className='flex gap-1'>
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
