import React, { useState } from 'react';
import { IoAlbums, IoArrowBackCircleOutline, IoArrowDownCircleOutline, IoServerOutline } from 'react-icons/io5';

const Subdropdown = ({ children, icon, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
        <button onClick={() => toggleDropdown()} type="button" className="flex gap-1 items-center justify-between w-full p-1 text-black hover:text-white rounded-lg pl-5 group hover:bg-gray-700">
            <div className='flex gap-1 justify-between'>
                {icon}
                <span className="flex-1 ms-3 whitespace-nowrap">{title}</span>

            </div>
            {
                isOpen ? <IoArrowDownCircleOutline /> : <IoArrowBackCircleOutline />
            }
        </button>
        <ul className={`${isOpen ? 'block' : 'hidden'} py-2 space-y-2 pl-8`}>
            {children}
        </ul>
    </li>
  );
};

export default Subdropdown;
