import Template from "@/Components/Backend/Template";
import Breadcump from "@/Components/Breadcump";
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect } from "react";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useState } from "react";

export default function Menu({auth, roles, subroles, menus}) {

    const { props } = usePage()    
    
    useEffect(() => {
        if(props.errors[0]){
            handlerToast(props.errors[0])
        }
    },[])

    const [checkedMenus, setCheckedMenus] = useState({
        role_id: '',
        subrole_id: 0,
        data: []
    });
    const [role, setRole] = useState("")

    function handlerRole(role){
        if(role == ""){
            setCheckedMenus([])
        }else{
            setRole(role)
            setCheckedMenus({...checkedMenus, role_id: role})
        }
    }

    const getMenuUser = async () => {
        if(checkedMenus.role_id == "") return handlerToast("Pilih role terlebih dahulu")
        await axios.get(route('menu.datamenurole',[checkedMenus.role_id, checkedMenus.subrole_id])).then((res) => {
            console.log(res.data.menu);
    
            setCheckedMenus({
                role_id: checkedMenus.role_id,
                subrole_id: checkedMenus.subrole_id,
                data: res.data.menu.data
            })
        })
    }

    const tambahmenuutama = (menu) => {  
           
        if(role != ""){            
            if(checkedMenus?.data && checkedMenus?.data.some(item => item.id === menu.id)){                            
                setCheckedMenus(prev => ({...prev, data: prev.data.filter(item => item.id !== menu.id)})) 
            }else{            
                setCheckedMenus(prev => ({...prev, data: [...prev.data, {id: menu.id, name: menu.name, url: menu.url, submenu: []}] }))
            }
        } else {
            handlerToast("Pilih role terlebih dahulu")
        }  
    }
    
    const tambahsubmenu1 = (menu) => {        
        if(role != ""){
            setCheckedMenus(prev => ({...prev, data: prev.data.map(item => {
                if (item.id === menu.menu_id) {
                    if (item.submenu && item.submenu.some(item => item.id === menu.id)) {
                        return {
                            ...item,
                            submenu: item.submenu.filter(item => item.id !== menu.id)
                        }
                    } 
                    return {
                        ...item,
                        submenu: [...item.submenu, {id : menu.id, name: menu.name, url: menu.url, submenu: []}],
                    }
                }
                return item
            })}))
        } else {
            handlerToast("Pilih role terlebih dahulu")
        }
    }   

    const tambahsubmenu2 = (menu) => {                  
        if(role != ""){    
            setCheckedMenus(prev => ({...prev, data: prev.data.map(item => {
                if (item.id === menu.menu_id) {
                    if (item.submenu && item.submenu.some(item => item.id === menu.submenu_id)) {
                        return {
                            ...item,
                            submenu: item.submenu.map(sub => {
                                if (sub.id === menu.submenu_id) {
                                    if (sub.submenu && sub.submenu.some(item => item.id === menu.submenu_id)) {
                                        return {
                                            ...sub,
                                            submenu: sub.submenu.filter(item => item.id !== menu.submenu_id)
                                        }
                                    }else{
                                        return {
                                            ...sub,
                                            submenu: [...sub.submenu, {id: menu.id, name: menu.name, url: menu.url, submenu: []}] 
                                        }
                                    }
                                }
                                return sub;
                            }),
                        }
                    } 
                    return {
                        ...item,
                        submenu: [...item.submenu, {id: menu.id, name: menu.name, url: menu.url, submenu: []}],
                    }
                }
                return item
            })}))
        } else {
            handlerToast("Pilih role terlebih dahulu")
        }
    }

    const handlerToast = (message) => {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right",
          }).showToast();
    }   

    const handlerSimpanData = () => {
        if(checkedMenus.role_id == "") return handlerToast("Pilih role terlebih dahulu")
        router.post(route('menu.store'), checkedMenus)
    }
    
    // console.log(checkedMenus);
    
    return (
        <Template user={auth}>

            <Breadcump nama={'Master Menu'}/>

            <div className="border p-5 rounded-md shadow-md mt-5">
                <div className="flex justify-center mb-5">
                    <h1 className="text-2xl font-bold border-b-2">Master Menu</h1>
                </div>
                
                <div className="flex mb-5 gap-3 rounded-md">
                    <select className="p-2 rounded-md" onChange={(e) => handlerRole(e.target.value)}>
                        <option value="">-- PILIH ROLE --</option>
                        {
                            roles.map((r, i) => (
                                <option key={i} value={r.id }>{r.name}</option>
                            ))
                        }
                    </select>
                    {
                        role == 3 ?
                            <select onChange={(e) => setCheckedMenus({...checkedMenus, subrole_id: e.target.value})} className="p-2 rounded-md">
                                <option value="">-- PILIH SUB ROLE --</option>
                                {
                                    subroles.map((r, i) => (
                                        <option key={i} value={r.id }>{r.sub_role}</option>
                                    ))
                                }
                            </select>
                        :
                            ""
                    }
                    <button onClick={() => getMenuUser()} className="bg-blue-500 text-white p-2 rounded-md">Cek Menu</button>
                </div>

                <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5">
                    {menus.map(menu => (
                        <div key={menu.id}>
                            <ul>
                                <li className="grid">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={checkedMenus?.data && checkedMenus.data.some(item => item.id === menu.id)}
                                            onChange={() => tambahmenuutama(menu)}
                                        />
                                        {menu.name}
                                    </div>
                                    {menu.submenus && menu.submenus.length > 0 && (
                                        <ul className="ml-8 gap-2">
                                            {menu.submenus.map(submenu => {                                                
                                                const cekkhodam =  checkedMenus.data.filter(item => item.id === menu.id)
                                                const khodamsub = cekkhodam[0]?.submenu.some(item => item.id === submenu.id)    
                                                return (
                                                    <li key={submenu.id}>
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                type="checkbox"
                                                                checked={khodamsub}
                                                                onChange={() => tambahsubmenu1(submenu)}
                                                            />
                                                            {submenu.name}
                                                        </div>
                                                        {submenu.submenusdua && submenu.submenusdua.length > 0 && (
                                                           <ul className="ml-8 gap-2">
                                                           {submenu.submenusdua.map(submenudua => {
                                                                const cekkhodam2 =  checkedMenus?.data.filter(item => item.id === menu.id)
                                                                const khodamsub2 = cekkhodam2[0]?.submenu.filter(item => item.id === submenu.id)[0]?.submenu.some(item => item.id === submenudua.id)
                                                                
                                                               return (
                                                                   <li key={submenudua.id}>
                                                                       <div className="flex items-center gap-3">
                                                                           <input
                                                                               type="checkbox"
                                                                               checked={khodamsub2}
                                                                               onChange={() => tambahsubmenu2(submenudua)}
                                                                           />
                                                                           {submenudua.name}
                                                                       </div>
                                                                   </li>
                                                               )
                                                           })}
                                                        </ul>
                                                        )}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        </div>
                    ))}

                </div>
                <div className="flex justify-end mt-5">
                    <button onClick={() => handlerSimpanData()} className="bg-blue-500 text-white p-3 rounded-md w-[20vw]">Simpan</button>
                </div>
            </div>
            
        </Template>
    )
}
