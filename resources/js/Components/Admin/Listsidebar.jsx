import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { RiRadioButtonLine } from "react-icons/ri";
import { MdCircle } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi"
import { HiOutlineDesktopComputer } from "react-icons/hi";
import Dropdown from '../Dropdown';
import Subdropdown from '../Subdropdown';

export default function ListSidebar({type}){
    const {props} = usePage()

    const [menus, setMenus] = useState([]);

    useEffect(() => {
        getMenu();
    }, [props]);

    function getMenu(){
        axios.get(route('menu.listmenu')).then(res => {
            setMenus(res.data.menu);
        });
    }
    
    return (
        <>
            <ul className="space-y-2 z-50 md:space-y-3 font-medium">
                <li className={`${type == 'web' ? 'block' : 'hidden'}`}>
                    <div className="bg-transparent flex gap-2 rounded-md p-3">
                        <div className="flex-1 items-center gap-4 flex-col">
                            <div className="font-bold">{props.auth.user.name}</div>
                            <div className="flex items-center gap-2"><RiRadioButtonLine className="text-blue-500"/>Online</div>
                        </div>
                    </div>
                </li>

                <li>
                    <div className="flex">
                        <input type="text" className="rounded-l-md opacity-40 border w-full ring-1 border-white" placeholder="Cari Informasi"/>
                        <button className="p-2 bg-blue-500 rounded-r-md ring-1 text-white"><IoSearch/></button>
                    </div>
                </li>

                {
                    menus.map((menu, i) => {
                        
                        return menu.submenu.length > 0 ?
                        (
                            <Dropdown key={i} icon={<HiOutlineDesktopComputer />} title={menu.name}>
                                {
                                    menu.submenu.map((submenu, x) => {
                                        return submenu.submenu.length > 0 ?
                                            <Subdropdown key={x} icon={<MdCircle/>} title={submenu.name}>
                                                {
                                                    submenu.submenu.map((subsubmenu, y) => (
                                                            <li key={y}>
                                                                <Link
                                                                    href={route(subsubmenu.url ?? 'admin.home')}
                                                                    className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-gray-700 group"
                                                                >
                                                                    <MdCircle />
                                                                    <span className="ms-3">{subsubmenu.name}</span>
                                                                </Link>
                                                            </li>
                                                    ))
                                                }
                                            </Subdropdown>
                                        :
                                            
                                            <li key={x}>
                                                <Link
                                                    href={route(submenu.url ?? 'admin.home')}
                                                    className="flex items-center p-2 text-gray-900 pl-5 rounded-lg hover:text-white hover:bg-gray-700 group"
                                                >
                                                    <MdCircle  />
                                                    <span className="ms-3">{submenu.name}</span>
                                                </Link>
                                            </li>
                                        
                                        })
                                }
                            </Dropdown>
                        )
                            :
                        (
                            <li key={i}>
                                <Link
                                    href={route(menu.url ?? 'admin.home')}
                                    className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-gray-700 group"
                                >
                                    <HiOutlineDesktopComputer  />
                                    <span className="ms-3">{menu.name}</span>
                                </Link>
                            </li>
                        )
                    })
                }
                
            </ul>
        </>
    )
}
