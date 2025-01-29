import { useState } from 'react';
import { IoMenu, IoPerson, IoPowerSharp, IoNotificationsOutline, IoTime, IoCalendar  } from "react-icons/io5";
import Swal from 'sweetalert2'
import ListSidebar from "./ListSidebar";
import moment from "moment";
import { formatTanggal } from "@/Utils/TanggalIndo";
import { FaCogs } from "react-icons/fa";
import { usePage } from '@inertiajs/react';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const {props} = usePage()
    const [tgl, setTgl] = useState(moment().format('YYYY-MM-DD'))

    const [drop, setDrop] = useState(false)
    const [dropd, setDropd] = useState(false)

  return (
    <>
        <nav className="fixed p-4 top-0 z-50 w-full bg-[#eae9e9] border-b border-gray-200">
            <div className="px-3 py-1 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button onClick={() => setDropd(!dropd)} type="button" className="inline-flex items-center p-2 text-sm text-black rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700">
                            <span className="sr-only">Open sidebar</span>
                            <IoMenu className="w-6 h-6"/>
                        </button>

                        <a href="#" className="flex items-center ms-2 md:me-24">
                            <img src={`${props.rootUrl}/mediatama.png`} className="h-8 mr-3" alt="logo" />
                        </a>
                    </div>

                    <div className="flex items-center md:gap-5 gap-3">
                        {/*  */}
                        <div className="relative inline-flex items-center px-3 py-1.2 text-sm font-medium text-black rounded-full">
                            <IoNotificationsOutline className="text-black w-6 h-6 cursor-pointer"/>
                            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-3 h-3 text-xs font-semibold text-black bg-blue-600 rounded-full sm:w-4 sm:h-4 lg:w-4 lg:h-4 lg:text-xs">
                            1
                            </span>
                        </div>
                        <div className="flex flex-col items-center ms-3">
                            <div>
                                <button onClick={() => setDrop(!drop)} type="button" className="flex text-sm items-center gap-3 text-black">
                                    <span className="sr-only">Open user menu</span>
                                    {props.auth.user.name} <FaCogs />
                                </button>
                            </div>
                            <div className={`z-50 ${drop ? '' : 'hidden'} absolute top-10 right-5 border my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow`}>
                                
                                <ul className="py-1">
                                    <li>
                                        <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <IoPerson />Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a href={route('logout')} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <IoPowerSharp /> Keluar
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div className={`${dropd ? 'block' : 'hidden'} sm:hidden mt-16 p-3`}>
            <ListSidebar type={'mobile'}/>
        </div>
    </>
  );
};

export default Navbar;
