import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { RiRadioButtonLine } from "react-icons/ri";
import { MdCircle } from "react-icons/md";
import { CgDatabase } from "react-icons/cg";
import Dropdown from '../Dropdown';

export default function ListSidebar({type}){
    const {props} = usePage()
    
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

                <Dropdown icon={<CgDatabase />} title={"Data Master"}>
                    <li>
                        <Link href={route('role')} className="flex gap-1 items-center w-full p-2 text-black hover:text-white rounded-lg pl-5 group hover:bg-gray-700">
                            <MdCircle  />
                            <span className="ms-3">Role</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={route('menu')} className="flex gap-1 items-center w-full p-2 text-black hover:text-white rounded-lg pl-5 group hover:bg-gray-700">
                            <MdCircle  />
                            <span className="ms-3">Menu</span>
                        </Link>
                    </li>
                </Dropdown>
                
            </ul>
        </>
    )
}
