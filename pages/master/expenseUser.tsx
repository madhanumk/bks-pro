import { size } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Space, Table, Modal } from 'antd';
import { Button, Drawer } from 'antd';
import { Checkbox, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axios from 'axios';

const ExpenseUser = () => {

    const [open, setOpen] = useState(false);
    const { Search } = Input;
    const [form] = Form.useForm();
    const [editRecord, setEditRecord] = useState(null)
    const [drawerTitle, setDrawerTitle] = useState("Create Expense User")
    const [viewRecord, setViewRecord] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState([])


    useEffect(() => {
        getExpenseUser()
    }, [])

    const getExpenseUser = (() => {
        axios.get("http://files.covaiciviltechlab.com/expense_user_list/", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setDataSource(res.data)
            setFilterData(res.data)
        }).catch((error: any) => {
            console.log(error)
        })
    })
    console.log("dataSource", dataSource)

    const showModal = (record: any) => {
        setIsModalOpen(true);
        setViewRecord(record)
        modalData()
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (editRecord) {
            setDrawerTitle("Edit Expense User")
        } else {
            setDrawerTitle("Create Expense User")
        }
    }, [editRecord])

    // drawer
    const showDrawer = (record: any) => {
        if (record) {
            setEditRecord(record)
            form.setFieldsValue(record)
        } else {
            setEditRecord(null)
            form.resetFields()
        }
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        form.resetFields()
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'CreatedAt',
            dataIndex: 'created_date',
            key: 'created_date',
        },
        // {
        //     title: 'Flag',
        //     dataIndex: 'flag',
        //     key: 'flag',
        // },
        {
            title: "Actions",
            key: "actions",
            render: (text: any, record: any) => (

                <Space size="middle">
                    <EyeOutlined style={{ cursor: "pointer" }}
                        onClick={() => showModal(record)} className='view-icon' rev={undefined} />
                    <EditOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => showDrawer(record)}
                        className='edit-icon' rev={undefined} />
                    <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleDelete(record)} className='delete-icon' rev={undefined} />
                </Space>
            ),
        }
    ];



    const handleDelete = (record: any) => {
        // Implement your delete logic here
        console.log(`Delete record with key ${record}`);
        const Token = localStorage.getItem("token");

        Modal.confirm({
            title: "Are you sure, you want to delete this EXPENSE USER record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                console.log(record, "values")
                axios.delete(`http://files.covaiciviltechlab.com/delete_expense_user/${record.id}/`, {
                    headers: {
                        "Authorization": `Token ${Token}`
                    }
                }).then((res) => {
                    console.log(res)
                    getExpenseUser()
                }).catch((err) => {
                    console.log(err)
                })

            },
        });
    };

    const [filterData, setFilterData] = useState(dataSource)

    const inputChange = (e: any) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredData = dataSource.filter((item: any) =>
            item?.name?.toLowerCase().includes(searchValue)
        );
        setFilterData(searchValue ? filteredData : dataSource);
    };

    // form submit
    const onFinish = (values: any) => {

        if (editRecord) {
            axios.put(`http://files.covaiciviltechlab.com/edit_expense_user/${editRecord.id}/`, values, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                console.log(res)
                getExpenseUser()
                setOpen(false);
            }).catch((err) => {
                console.log(err)
            })
        } else {
            axios.post(`http://files.covaiciviltechlab.com/create_expense_user/`, values, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                console.log(res)
                getExpenseUser()
                setOpen(false);
            }).catch((err) => {
                console.log(err)
            })
        }



        console.log('Success:', values);
        form.resetFields();

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        name?: string;
        phone?: Number;
        address?: string;
        flag?: string;
    };

    // modal data
    const modalData = () => {
        const formatDate = (dateString: any) => {
            if (!dateString) {
              return "N/A"; // or handle it according to your requirements
            }
          
            const date = new Date(dateString);
          
            if (isNaN(date.getTime())) {
              return "Invalid Date"; // or handle it according to your requirements
            }
          
            return new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(date);
          };

        const data = [
            {
                label: "Name:",
                value: viewRecord?.name || "N/A",
            },
            {
                label: "Phone:",
                value: viewRecord?.phone || "N/A",
            },
            {
                label: "Address:",
                value: viewRecord?.address || "N/A",
            },
            {
                label: "Created By:",
                value: viewRecord?.created_by || "N/A",
            },
            {
                label: "Created Date:",
                value: formatDate(viewRecord?.created_date),
            },
            {
                label: "Modified By:",
                value: viewRecord?.modified_by || "N/A",
            },
            {
                label: "Modified Date:",
                value: formatDate(viewRecord?.modified_date),
            },
        ];

        return data;
    };


    return (
        <>
            <div>
                <div className='tax-heading-main'>
                    <div>
                        <h1 className='tax-title'>Manage Expense User</h1>
                    </div>
                    <div>
                        <Search placeholder="input search text" onChange={inputChange} enterButton className='search-bar' />
                        <button type='button' onClick={() => showDrawer(null)} className='create-button'>+ Create Expense User</button>
                    </div>
                </div>
                <div>
                    <Table dataSource={filterData} columns={columns} pagination={false} />
                </div>

                <Drawer title={drawerTitle} placement="right" width={600} onClose={onClose} open={open}>
                    <Form
                        name="basic"
                        layout="vertical"
                        form={form}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Name"
                            name="name"
                            required={false}
                            rules={[{ required: true, message: 'Please input your Name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Phone"
                            name="phone"
                            required={false}
                            rules={[{ required: true, message: 'Please input your Phone!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Address"
                            name="address"
                            required={false}
                            rules={[{ required: true, message: 'Please input your Tax Address!' }]}
                        >
                            <Input />
                        </Form.Item>

                        {/* <Form.Item<FieldType>
                            label="Flag"
                            name="flag"
                            required={false}
                            rules={[{ required: true, message: 'Please input your Tax Status!' }]}
                        >
                            <Input />
                        </Form.Item> */}

                        <Form.Item >
                            <div className='form-btn-main'>
                                <Space>
                                    <Button danger htmlType="submit" onClick={() => onClose()}>
                                        Cancel
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Space>

                            </div>

                        </Form.Item>
                    </Form>
                </Drawer>


                {/* modal */}
                <Modal title="View Expense" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                    {
                        modalData()?.map((value: any) => {
                            return (
                                <>
                                    <div className='content-main' >
                                        <p className='content-1'>{value?.label}</p>
                                        <p className='content-2'>{value?.value}</p>
                                    </div>
                                </>
                            )
                        })
                    }
                </Modal>


            </div>
        </>
    )
}

export default ExpenseUser