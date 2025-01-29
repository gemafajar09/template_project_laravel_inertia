import Template from "@/Components/Backend/Template";
import Breadcump from "@/Components/Breadcump";
import React, { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Table, Input, Button, Space, Modal } from 'antd';
import axios from 'axios'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { usePage } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";
import { useRef } from "react";
import { IoAdd, IoTrash } from "react-icons/io5";

export default function Index({auth}) {
    const {props} = usePage()

    const [modal, setModal] = useState(false)
    const [modalRole, setModalRole] = useState(false)
    const [roles, setRoles] = useState("")
    const [dataSubrole, setDataSubRole] = useState([])
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [addSubRoles, setAddSubRoles] = useState({
        role_id: '',
        sub_role: '',
    })

    const searchInput = useRef(null);

    const [data, setData] = useState([])

    useEffect(() => {
        getDataInputan()
    },[])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{padding: 8,}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                    marginBottom: 8,
                    display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{
                        width: 90,
                    }}
                    >
                        Reset
                    </Button>
                    <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        confirm({
                        closeDropdown: false,
                        });
                        setSearchText(selectedKeys[0]);
                        setSearchedColumn(dataIndex);
                    }}
                    >
                        Filter
                    </Button>
                    <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        close();
                    }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
            style={{
                color: filtered ? '#1677ff' : undefined,
            }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
        searchedColumn === dataIndex ? (
            <Highlighter
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
    });
    
    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            rowScope: 'row',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            ...getColumnSearchProps('role')
        },
        {
            title: 'Sub Role',
            dataIndex: 'subrole',
            key: 'subrole',
            ...getColumnSearchProps('subrole')
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (_, record) => <button onClick={() => handlerRole(record.id)} className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-sm"><FaEdit/></button>,
        },
    ]

    const getDataInputan = async () => {
        await axios.get(route('role.ambil'))
        .then((res) => {
            setData(res.data.roles)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handlerRole = async (id) => {
        setModal(true)
        await panggildataRole(id)
    }

    const panggildataRole = async (id) => {
        setModal(true)
        await axios.get(route('role.get.id',id))
        .then((res) => {            
            setDataSubRole(res.data.role)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const hapusSubRole = async (id) => {
        await axios.get(route('role.hapus',id))
        .then((res) => {
            getDataInputan()
            panggildataRole(dataSubrole.id)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const updateSubrole = async (newSubrole) => {
        setDataSubRole((prevData) => {
            // Cek apakah subrole dengan id yang sama sudah ada
            const existingSubroleIndex = prevData.subrole.findIndex(
                (subrole) => subrole.id === newSubrole.id
            )
      
            if (existingSubroleIndex !== -1) {
                // Jika subrole dengan id yang sama sudah ada, update role-nya
                const updatedSubroles = [...prevData.subrole];
                updatedSubroles[existingSubroleIndex] = {
                    ...updatedSubroles[existingSubroleIndex],
                    sub_role: newSubrole.sub_role, // Update role
                }
      
                return {
                    ...prevData,
                    subrole: updatedSubroles,
                }
            }
        })
    }
    
    const addSubRole = async () => {
        if(addSubRoles.role_id == '' || addSubRoles.sub_role == '') {
            handlerToast('Harap lengkapi data terlebih dahulu')
            return
        }
        axios.post(route('role.tambah.submenu'),addSubRoles)
        .then((res) => {
            getDataInputan()
            panggildataRole(dataSubrole.id)
            setAddSubRoles({
                role_id: '',
                sub_role: ''
            })
        })
    }

    const updateRoleDanSubrole = async () => {
        await axios.post(route('role.update'),dataSubrole)
        .then((res) => {
            if(res.status == 200){
                getDataInputan()
                setModal(false)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handlerTambahRoleBaru = async () => {
        await axios.post(route('role.tambahrole'),{name: roles})
        .then((res) => {
            if(res.status == 200){
                getDataInputan()
                setModalRole(false)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handlerToast = (message) => {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
        }).showToast()
    }   

    return (
        <Template user={auth}>
            <Breadcump nama={'Role'}/>
            <div className="border p-5 rounded-md shadow-md mt-5">
                <div className="flex justify-center mb-5">
                    <h1 className="text-2xl font-bold border-b-2">Master Role</h1>
                </div>
                <div className="flex justify-end mb-5">
                    <button onClick={() => setModalRole(true)} className="p-2 bg-blue-500 text-white rounded">Tambah Role Baru</button>
                </div>
                <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={data} />
            </div>

            <Modal
                title="Tambah Role"
                open={modal}
                onCancel={() => setModal(false)}
                footer={[
                    <Button key="kembali" onClick={() => setModal(false)}>
                      Kembali
                    </Button>,
                    <Button key="sImpan" onClick={() => updateRoleDanSubrole()}>
                      Simpan
                    </Button>
                ]}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex-col">
                        <label className="text-md" htmlFor="">Role</label>
                        <Input placeholder="Role" value={dataSubrole.name} onChange={(e) => setDataSubRole({...dataSubrole, name : e.target.value})} className="w-full rounded-md" />
                    </div>
                    <div className="ml-5 flex gap-3 flex-col">
                        <label className="text-md" htmlFor="">Sub Role</label>
                        {
                            dataSubrole.subrole && dataSubrole.subrole.length > 0 
                            ? 
                                dataSubrole.subrole.map((item, index) => (
                                    <div key={index} className="flex items-center">
                                        <Input placeholder="Sub Role" onChange={(e) => updateSubrole({id: item.id, sub_role: e.target.value})} defaultValue={item.sub_role} className="w-full rounded-l-md" />
                                        <button onClick={() => hapusSubRole(item.id)} className="text-white bg-red-500 py-3.5 px-3 rounded-r-md text-sm"><IoTrash/></button>
                                    </div>
                                )) 
                            : 
                            ""
                        }
                        <div className="flex items-center">
                            <Input placeholder="Sub Role" onChange={(e) => setAddSubRoles({...addSubRoles, role_id: dataSubrole.id, sub_role: e.target.value})} value={addSubRoles.sub_role} className={`w-full rounded-l-md`} />
                            <button onClick={() => addSubRole()} className="text-white bg-blue-500 py-3.5 px-3 rounded-r-md text-sm"><IoAdd/></button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                title="Tambah Role"
                open={modalRole}
                onCancel={() => setModalRole(false)}
                footer={[
                    <Button key="kembali" onClick={() => setModalRole(false)}>
                      Kembali
                    </Button>,
                    <Button key="sImpan" onClick={() => handlerTambahRoleBaru()}>
                      Simpan
                    </Button>
                ]}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex-col">
                        <label className="text-md" htmlFor="">Role</label>
                        <Input placeholder="Role" onChange={(e) => setRoles(e.target.value)} className="w-full rounded-md" />
                    </div>
                </div>
            </Modal>

        </Template>
    )
}

