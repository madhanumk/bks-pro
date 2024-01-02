import { size } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Space, Table, Modal } from 'antd';
import { Button, Drawer } from 'antd';
import { Checkbox, Form, Input, InputNumber, Select } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios"

const Test = () => {

    const [open, setOpen] = useState(false);
    const { Search } = Input;
    const [form] = Form.useForm();
    const [editRecord, setEditRecord] = useState(null)
    const [drawertitle, setDrawerTitle] = useState("Create Test")
    const [viewRecord, setViewRecord] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState([])
    const [formFields, setFormFields] = useState([])

    // get test 
    useEffect(() => {
        getTest()
    }, [])

    const getTest = (() => {
        const Token = localStorage.getItem("token")

        axios.get("http://files.covaiciviltechlab.com/test_list/", {
            headers: {
                "Authorization": `Token ${Token}`
            }
        }).then((res: any) => {
            console.log(res.data)
            setDataSource(res.data)
            setFilterData(res.data)
        }).catch((error: any) => {
            console.log(error)
        })
    })
    console.log("dataSource", dataSource)


    useEffect(() => {
        const Token = localStorage.getItem("token")

        axios.get("http://files.covaiciviltechlab.com/create_test/", {
            headers: {
                "Authorization": `Token ${Token}`
            }
        }).then((res) => {
            setFormFields(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    console.log("formFields", formFields)


    const showModal = (record: any) => {

        const testRecord = {
            material_name: record?.material_name?.id, // Use the primary key of the material_name field
            test_name: record.test_name,
            price_per_piece: record.price_per_piece,
            id: record.id,
            created_by: record.created_by.username,
            created_date: record.created_date,
            modified_by: record.modified_by.username,
            modified_date: record.modified_date
        };

        setIsModalOpen(true);
        setViewRecord(testRecord)
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
            setDrawerTitle("Edit Test")
        } else {
            setDrawerTitle("Create Test")
        }
    })


    // drawer
    const showDrawer = (record: any) => {
        if (record) {
            console.log("usdhfshdfhsu", record);

            const testRecord = {
                material_name: record?.material_name?.id, // Use the primary key of the material_name field
                test_name: record.test_name,
                price_per_piece: record.price_per_piece,
                id: record.id,
            };

            setEditRecord(testRecord);
            form.setFieldsValue(testRecord);
        } else {
            setEditRecord(null);
            form.resetFields();
        }

        setOpen(true)
    };

    const onClose = () => {
        setOpen(false);
        form.resetFields()
    };


    const columns = [
        {
            title: 'Test Name',
            dataIndex: 'test_name',
            key: 'test_name',
        },
        {
            title: 'Material Name',
            dataIndex: 'material_name',
            key: 'material',
            render: (material: any) => (material && material?.material_name) || 'N/A',
        },
        {
            title: 'Price',
            dataIndex: 'price_per_piece',
            key: 'price_per_piece',
        },
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
        const Token = localStorage.getItem("token")

        Modal.confirm({
            title: "Are you sure, you want to delete this TEST record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                console.log(record, "values")
                axios.delete(`http://files.covaiciviltechlab.com/delete_test/${record.id}/`,
                    {
                        headers: {
                            "Authorization": `Token ${Token}`
                        }
                    }).then((res) => {
                        console.log(res)
                        getTest()
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
            item.test_name.toLowerCase().includes(searchValue)
        );
        setFilterData(searchValue ? filteredData : dataSource);
    };


    // form submit
    const onFinish = (values: any) => {

        const Token = localStorage.getItem("token")

        if (editRecord) {

            console.log("editRecordeditRecoreeditRecord", editRecord)

            axios.put(`http://files.covaiciviltechlab.com/edit_test/${editRecord.id}/`, values, {
                headers: {
                    "Authorization": `Token ${Token}`
                }
            }).then((res: any) => {
                console.log(res)
                getTest()
                setOpen(false);
            }).catch((err: any) => {
                console.log(err)
            })
        } else {
            axios.post("http://files.covaiciviltechlab.com/create_test/", values, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                console.log(res)
                getTest()
                setOpen(false);
                form.resetFields()
            }).catch((err) => {
                console.log(err)
            })
        }

        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        material_name?: string;
        test_name?: string;
        price_per_piece?: Number;
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

        console.log("viewRecordviewRecord", viewRecord)

        const data = [
            {
                label: "Test Name:",
                value: viewRecord?.test_name || "N/A",
            },
            {
                label: "Material Name:",
                value: viewRecord?.material_name || "N/A",
            },
            {
                label: "price Per Piece:",
                value: viewRecord?.price_per_piece || "N/A",
            },
            {
                label: "Created By:",
                value: viewRecord?.created_by?.username || "N/A",
            },
            {
                label: "Created Date:",
                value: formatDate(viewRecord?.created_date),
            },
            {
                label: "Modified By:",
                value: viewRecord?.modified_by?.username || "N/A",
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
                        <h1 className='tax-title'>Manage Test</h1>
                    </div>
                    <div>
                        <Search placeholder="input search text" onChange={inputChange} enterButton className='search-bar' />
                        <button type='button' onClick={() => showDrawer(null)} className='create-button'>+ Create Test</button>
                    </div>
                </div>
                <div>
                    <Table dataSource={filterData} columns={columns} pagination={false} />
                </div>

                <Drawer title={drawertitle} placement="right" width={600} onClose={onClose} open={open}>
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
                            label="Material Name"
                            name="material_name"
                            required={false}
                            rules={[{ required: true, message: 'Please input your Material Name!' }]}
                        >
                            <Select>
                                {formFields?.materials?.map((val: any) => (
                                    <Select.Option key={val.material_name} value={val.id} >
                                        {val.material_name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Test Name"
                            name="test_name"
                            required={false}
                            rules={[{ required: true, message: 'Please input your Test Name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Price"
                            name="price_per_piece"
                            required={false}
                            rules={[{ required: true, message: 'Please input your Price!' }]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>


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
                <Modal title="View Test" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                    {
                        modalData()?.map((value: any) => {
                            console.log("valuevaluevalue", value)
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

export default Test