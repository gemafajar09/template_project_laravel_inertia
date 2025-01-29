import { useState } from 'react';
import ListSidebar from './Listsidebar';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full  border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto ">
            <ListSidebar type={'web'}/>
        </div>
    </aside>
  );
};

export default Sidebar;
