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

    const [checkedMenus, setCheckedMenus] = useState([]);
    const [role, setRole] = useState("")

    function handlerRole(role){
        if(role == ""){
            setCheckedMenus([])
        }else{
            setRole(role)
            getMenuUser(role)
        }
    }

    // const getMenuUser = async (id) => {
    //     await axios.get(route('menu.getbyrole',id)).then((res) => {
    //         setCheckedMenus(res.data.menu)
    //     })
    // }
    const getMenuUser = async (id) => {
        await axios.get(route('menu.datamenurole',id)).then((res) => {
            setCheckedMenus(res.data.menu)
        })
    }

    const tambahmenuutama = (menuid) => {     
        if(role != ""){
            if(checkedMenus && checkedMenus.some(item => item.id === menuid)){            
                setCheckedMenus(checkedMenus.filter(item => item.id !== menuid)) 
            }else{            
                setCheckedMenus(prevData => [...prevData, { id: menuid, submenu1: [] }])
            }
        } else {
            handlerToast("Pilih role terlebih dahulu")
            setCheckedMenus([])
        }  
    }
    
    const tambahsubmenu1 = (idmenu, idsubmenu1) => {
        if(role != ""){
            setCheckedMenus(prevData =>
              prevData.map(item => {
                if (item.id === idmenu) {
                  if (item.submenu1 &&item.submenu1.some(item => item.id === idsubmenu1)) {
                      return {
                          ...item,
                          submenu1: item.submenu1.filter(item => item.id != idsubmenu1)
                        }
                    }else{
                      return {
                        ...item,
                        submenu1: [...item.submenu1, {id : idsubmenu1, submenu2: []}],
                      }
                  }
                }
                return item
              })
            )
        } else {
            handlerToast("Pilih role terlebih dahulu")
            setCheckedMenus([])
        }
    }    
    const tambahsubmenu2 = (idmenu, idsubmenu1, idsubmenu2) => {    
        if(role != ""){    
            setCheckedMenus(prevData =>
            prevData.map(item => {
                if (item.id === idmenu) {
                    return {
                        ...item,
                        submenu1: item.submenu1.map(sub => {
                            if (sub.id === idsubmenu1) {
                                if (sub.submenu2 && sub.submenu2.some(item => item === idsubmenu2)) {
                                    return {
                                        ...sub,
                                        submenu2: sub.submenu2.filter(item => item != idsubmenu2)
                                    }
                                }else{
                                    return {
                                        ...sub,
                                        submenu2: [...sub.submenu2, idsubmenu2] 
                                    }
                                }
                            }
                            return sub;
                        }),
                    }
                }
                return item
            })
            )
        } else {
            handlerToast("Pilih role terlebih dahulu")
            setCheckedMenus([])
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
    
    console.log(checkedMenus);
    
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
                            <select className="p-2 rounded-md">
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
                </div>

                <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5">
                    {menus.map(menu => (
                        <div key={menu.id}>
                            <ul>
                                <li className="grid">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={checkedMenus && checkedMenus.some(item => item.id === menu.id)}
                                            onChange={() => tambahmenuutama(menu.id)}
                                        />
                                        {menu.name}
                                    </div>
                                    {menu.submenus && menu.submenus.length > 0 && (
                                        <ul className="ml-8 gap-2">
                                            {menu.submenus.map(submenu => {
                                                const cekkhodam =  checkedMenus.filter(item => item.id === menu.id)    
                                                const khodamsub = cekkhodam[0]?.submenu1.some(item => item.id === submenu.id)                                           
                                                return (
                                                    <li key={submenu.id}>
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                type="checkbox"
                                                                checked={khodamsub}
                                                                onChange={() => tambahsubmenu1(menu.id, submenu.id)}
                                                            />
                                                            {submenu.name}
                                                        </div>
                                                        {submenu.submenusdua && submenu.submenusdua.length > 0 && (
                                                           <ul className="ml-8 gap-2">
                                                           {submenu.submenusdua.map(submenudua => {
                                                                const cekkhodam2 =  checkedMenus.filter(item => item.id === menu.id)
                                                                const khodamsub2 = cekkhodam2[0]?.submenu1[0]?.submenu2.some(item => item === submenudua.id)
                                                                
                                                               return (
                                                                   <li key={submenudua.id}>
                                                                       <div className="flex items-center gap-3">
                                                                           <input
                                                                               type="checkbox"
                                                                               checked={khodamsub2}
                                                                               onChange={() => tambahsubmenu2(menu.id, submenu.id, submenudua.id)}
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
            </div>
            
        </Template>
    )
}
