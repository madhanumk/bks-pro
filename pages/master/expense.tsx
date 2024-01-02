import { size } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Space, Table, Modal } from 'antd';
import { Button, Drawer } from 'antd';
import { Checkbox, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios"

const Expense = () => {

  const [open, setOpen] = useState(false);
  const { Search } = Input;
  const [form] = Form.useForm();
  const [editRecord, setEditRecord] = useState(null)
  const [drawerTitle, setDrawerTitle] = useState("Create Expense")
  const [viewRecord, setViewRecord] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([])


  useEffect(() => {
    getExpense()
  }, [])

  const getExpense = (() => {

    const Token = localStorage.getItem("token")

    axios.get("http://files.covaiciviltechlab.com/expense_list/", {
      headers: {
        "Authorization": `Token ${Token}`
      }
    }).then((res) => {
      console.log(res.data)
      setDataSource(res.data)
      setFilterData(res.data)
    }).catch((error: any) => {
      console.log(error)
    })
  })


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


  // useEffect(() => {
  //   if (editRecord) {
  //     setDrawerTitle("Edit Expense")
  //   } else {
  //     setDrawerTitle("Create Expense")
  //   }
  // }, [])

  // drawer
  const showDrawer = (record: any) => {
    if (record) {
      setEditRecord(record)
      form.setFieldsValue(record)
      setDrawerTitle("Edit Expense")
    } else {
      setEditRecord(null)
      form.resetFields()
      setDrawerTitle("Create Expense")
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields()
  };

  const columns = [
    {
      title: 'Expense Name',
      dataIndex: 'expense_name',
      key: 'expense_name',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'created_date',
      key: 'created_date',
      render: (text: any, record: any) => {
        // Assuming created_date is in the format: 2023-12-12T08:41:09.567980Z
        const date = new Date(text);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(date);

        return <span>{formattedDate}</span>;
      },
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
      title: "Are you sure, you want to delete this EXPENSE record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        console.log(record, "values")
        axios.delete(`http://files.covaiciviltechlab.com/delete_expense/${record.id}/`, {
          headers: {
            "Authorization": `Token ${Token}`
          }
        }).then((res) => {
          console.log(res)
          getExpense()
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
      item?.expense_name?.toLowerCase().includes(searchValue)
    );
    setFilterData(searchValue ? filteredData : dataSource);
  };



  // form submit
  const onFinish = (values: any) => {

    if (editRecord) {
      axios.put(`http://files.covaiciviltechlab.com/edit_expense/${editRecord.id}/`, values, {
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`
        }
      }).then((res) => {
        console.log(res)
        getExpense()
        setOpen(false);
      }).catch((error: any) => {
        console.log(error)
      })
    } else {
      axios.post("http://files.covaiciviltechlab.com/create_expense/", values, {
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`
        }
      }).then((res) => {
        console.log(res)
        getExpense()
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
    expense_name?: string;
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
        label: "Expense Name:",
        value: viewRecord?.expense_name || "N/A",
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

  console.log("viewRecord", viewRecord)
  return (
    <>
      <div>
        <div className='tax-heading-main'>
          <div>
            <h1 className='tax-title'>Manage Expense</h1>
          </div>
          <div>
            <Search placeholder="input search text" onChange={inputChange} enterButton className='search-bar' />
            <button type='button' onClick={() => showDrawer(null)} className='create-button'>+ Create Expense</button>
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
              label="Expense Name"
              name="expense_name"
              required={false}
              rules={[{ required: true, message: 'Please input your Expense Name!' }]}
            >
              <Input />
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

export default Expense