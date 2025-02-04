import Template from "@/Components/Admin/Template";
import Breadcump from "@/Components/Breadcump";
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect } from "react";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useState } from "react";
import Swal from 'sweetalert2'
import { FaSearch } from "react-icons/fa";
import { IoAdd, IoAddCircle, IoAddCircleOutline, IoSearch, IoTrash } from "react-icons/io5";
import { Button, Divider, Input, Modal } from "antd";

export default function Menu({auth, roles, subroles, menus}) {

    const { props } = usePage() 
    const [add, setAdd] = useState(false)   
    const [open, setOpen] = useState(false)   
    
    useEffect(() => {
        if(props.errors[0]){
            handlerToast(props.errors[0])
            setAddMenu({
                menu_id: null,
                menu_name: null,
                menu_name_url: null,
                submenu_id: null,
                submenu_name: null,
                submenu_url: null,
                submenudua_name: null,
                submenudua_url: null,
            })

            setAdd(false)
            setOpen(false)
        }
    },[props])

    const [addmenu, setAddMenu] = useState({
        menu_id: null,
        menu_name: null,
        menu_url: null,
        submenu_id: null,
        submenu_name: null,
        submenu_url: null,
        submenudua_name: null,
        submenudua_url: null,
    })

    const [checkedMenus, setCheckedMenus] = useState({
        role_id: '',
        subrole_id: 0,
        data: []
    });
    const [role, setRole] = useState("")
    const [subrole, setSubrole] = useState([])

    function handlerRole(role){
        if(role == ""){
            setRole(null)
            setCheckedMenus({
                role_id: '',
                subrole_id: 0,
                data: []
            })
        }else{
            setRole(role)
            setCheckedMenus({...checkedMenus, role_id: role})
        }

        setSubrole(subroles.filter(e => e.role_id == role))
        
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

    const getDataMenu = (menu_id, submenu_id = null) => {
        const menu = menus.find((m) => m.id === menu_id);
        const submenu = submenu_id != null ? menus.find((m) => m.id === menu_id).submenu?.find((m) => m.id === submenu_id).name : null
        
        setAddMenu({...addmenu,
            menu_id: menu_id,
            menu_name: menu.name,
            submenu_name: submenu,
            submenu_id: submenu_id
        })

        setOpen(true)
    }

    const simpanmenubaru = () => {
        router.post(route('menu.simpan'),addmenu)
    }

    const handlerHapus = async (menu_id, submenu_id = null, submenu2_id = null) => {        
        Swal.fire({
            title: "Apa kamu yakin?",
            text: "Anda tidak akan bisa mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!"
        }).then((result) => {
            if (result.isConfirmed) {
              router.get(route('menu.hapus',[menu_id, submenu_id, submenu2_id]))
            }
        });
    }
    return (
        <Template user={auth}>

            <Breadcump nama={'Master Menu'}/>

            <div className="border p-5 rounded-md shadow-md mt-5">
                {/* <div className="flex justify-center mb-5">
                    <h1 className="text-2xl font-bold border-b-2">Master Menu</h1>
                </div> */}
                
                <div className="flex justify-between">
                    <div className="flex md:items-center items-top justify-center mb-5 gap-3 rounded-md">
                        <div className="md:flex grid gap-3">
                            <select className="rounded-md p-2 text-xs" onChange={(e) => handlerRole(e.target.value)}>
                                <option value="">-- PILIH ROLE --</option>
                                {
                                    roles.map((r, i) => (
                                        <option key={i} value={r.id }>{r.name}</option>
                                    ))
                                }
                            </select>
                            {
                                subrole.length > 0 ?
                                    <select onChange={(e) => setCheckedMenus({...checkedMenus, subrole_id: e.target.value})} className="rounded-md p-2 text-xs">
                                        <option value="">-- PILIH SUB ROLE --</option>
                                        {
                                            subrole.map((r, i) => (
                                                <option key={i} value={r.id }>{r.sub_role}</option>
                                            ))
                                        }
                                    </select>
                                :
                                    ""
                            }
                        </div>
                        <Button onClick={() => getMenuUser()} className="bg-slate-700 flex items-center text-white p-3 rounded-md"><IoSearch/></Button>
                        <Button onClick={() => setAdd(true)} className="bg-slate-700 flex items-center text-white p-3 rounded-md"><IoAdd/></Button>
                        
                    </div>
                    <Button onClick={() => handlerSimpanData()} className="bg-slate-700 text-white rounded-md p-3">Simpan</Button>
                </div>

                <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5">
                    {menus.map(menu => (
                        <div key={menu.id}>
                            <ul>
                                <li className="grid">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={checkedMenus?.data && checkedMenus?.data.some(item => item.id === menu.id)}
                                            onChange={() => tambahmenuutama(menu)}
                                        />
                                        {menu.name}
                                        <button onClick={() => getDataMenu(menu.id)} className="bg-slate-700 flex items-center text-white rounded-full"><IoAddCircle/></button>
                                        <button onClick={() => handlerHapus(menu.id)} className="bg-slate-700 flex items-center text-white rounded-full"><IoTrash/></button>
                                    </div>
                                    {menu.submenu && menu.submenu.length > 0 && (
                                        <ul className="ml-8 gap-2">
                                            {menu.submenu.map(submenu => {                                                
                                                const cekkhodam = checkedMenus?.data.filter(item => item.id === menu.id)
                                                const khodamsub = cekkhodam[0]?.submenu.some(item => item.id === submenu.id) ?? false
                                                   
                                                return (
                                                    <li key={submenu.id}>
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                type="checkbox"
                                                                checked={khodamsub}
                                                                onChange={() => tambahsubmenu1(submenu)}
                                                            />
                                                            {submenu.name}
                                                            <button onClick={() => getDataMenu(menu.id, submenu.id)} className="bg-slate-700 flex items-center text-white rounded-full"><IoAddCircle/></button>    
                                                            <button onClick={() => handlerHapus(menu.id, submenu.id)} className="bg-slate-700 flex items-center text-white rounded-full"><IoTrash/></button>
                                                        </div>
                                                        {submenu.submenu && submenu.submenu.length > 0 && (
                                                           <ul className="ml-8 gap-2">
                                                           {submenu.submenu.map(submenudua => {
                                                                const cekkhodam2 =  checkedMenus?.data.filter(item => item.id === menu.id)
                                                                const khodamsub2 = cekkhodam2[0]?.submenu.filter(item => item.id === submenu.id)[0]?.submenu.some(item => item.id === submenudua.id) ?? false
                                                                
                                                               return (
                                                                   <li key={submenudua.id}>
                                                                       <div className="flex items-center gap-3">
                                                                           <input
                                                                               type="checkbox"
                                                                               checked={khodamsub2}
                                                                               onChange={() => tambahsubmenu2(submenudua)}
                                                                           />
                                                                           {submenudua.name}
                                                                           
                                                                            <button onClick={() => handlerHapus(menu.id, submenu.id, submenudua.id)} className="bg-red-500 flex items-center text-white rounded-full"><IoTrash/></button>
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

            <Modal
                title="Tambah Menu"
                open={add}
                onCancel={() => setAdd(false)}
                footer={[
                    <Button key="kembali" onClick={() => setAdd(false)}>
                      Kembali
                    </Button>,
                    <Button key="sImpan" onClick={() => simpanmenubaru()}>
                      Simpan
                    </Button>
                ]}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex-col">
                        <label className="text-md" htmlFor="">Menu</label>
                        <Input placeholder="Menu " value={addmenu.menu_name} onChange={(e) => setAddMenu({...addmenu, menu_name: e.target.value})}  className="w-full rounded-md" />
                        <label className="text-md" htmlFor="">Menu Route</label>
                        <Input placeholder="Sub Menu Dua Route" value={addmenu.menu_url} onChange={(e) => setAddMenu({...addmenu, menu_url: e.target.value})} className="w-full rounded-md" />
                    </div>
                </div>
            </Modal>

            <Modal
                title="Tambah Menu"
                open={open}
                onCancel={() => setOpen(false)}
                footer={[
                    <Button key="kembali" onClick={() => setOpen(false)}>
                      Kembali
                    </Button>,
                    <Button key="sImpan" onClick={() => simpanmenubaru()}>
                      Simpan
                    </Button>
                ]}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex-col">
                        <label className="text-md" htmlFor="">Menu</label>
                        <Input placeholder="Menu " readOnly value={addmenu.menu_name} className="w-full rounded-md" />
                        <label className="text-md" htmlFor="">Sub Menu</label>
                        <Input placeholder="Sub Menu" readOnly={addmenu.submenu_id != null ? true : false} onChange={(e) => setAddMenu({...addmenu, submenu_name: e.target.value})} value={addmenu.submenu_name} className="w-full rounded-md" />
                        {
                            addmenu.submenu_id == null ?
                            <>
                                <label className="text-md" htmlFor="">Sub Menu Route</label>
                                <Input placeholder="Sub Menu Route" onChange={(e) => setAddMenu({...addmenu, submenu_url: e.target.value})} className="w-full rounded-md" />
                            </> : ""
                        }
                        {
                            addmenu.submenu_id != null ? 
                            <>
                                <label className="text-md" htmlFor="">Sub Menu Dua</label>
                                <Input placeholder="Sub Menu Dua" onChange={(e) => setAddMenu({...addmenu, submenudua_name: e.target.value})} className="w-full rounded-md" />
                                <label className="text-md" htmlFor="">Sub Menu Dua Route</label>
                                <Input placeholder="Sub Menu Dua Route" onChange={(e) => setAddMenu({...addmenu, submenudua_url: e.target.value})} className="w-full rounded-md" />
                            </>
                            : ""
                        }
                    </div>
                </div>
            </Modal>
            
        </Template>
    )
}
