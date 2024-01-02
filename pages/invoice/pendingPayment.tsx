import { size } from 'lodash'
import React, { useState, useEffect } from 'react'
import { Space, Table, Modal } from 'antd';
import { Button, Drawer } from 'antd';
import { Checkbox, Form, Input, Radio } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios"


const PendingPayment = () => {

  // const [open, setOpen] = useState(false);
  const { Search } = Input;
  const [form] = Form.useForm();
  const [editRecord, setEditRecord] = useState(null);
  // const [drawerTitle, setDrawerTitle] = useState("Create Tax")
  // const [viewRecord, setViewRecord] = useState(null)
  const [dataSource, setDataSource] = useState([])
  // const [isModalOpen, setIsModalOpen] = useState(false);


  // Model 
  // const showModal = (record: any) => {
  //   setIsModalOpen(true);
  //   setViewRecord(record)
  //   // modalData()
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };


  // get Tax datas
  useEffect(() => {
    GetTaxData()
  }, [])

  const GetTaxData = (() => {
    const Token = localStorage.getItem("token")
    console.log("TokenTokenTokenToken", Token)

    axios.get("http://files.covaiciviltechlab.com/pending_payment", {
      headers: {
        "Authorization": `Token ${Token}`
      }
    }).then((res) => {
      setDataSource(res.data.pending_payments)
      setFilterData(res.data.pending_payments)
    }).catch((error: any) => {
      console.log(error)
    })
  })
  console.log("dataSourcedataSource", dataSource)

  //   useEffect(() => {
  //     axios.get("http://files.covaiciviltechlab.com/pending_payment", {
  //         headers:{
  //             "Authorization": `Token ${localStorage.getItem("token")}`
  //         }
  //     }).then((res) => {
  //         console.log("pendingPayment",res.data.pending_payments)
  //     }).catch((error:any) => {
  //         console.log(error)
  //     })
  //   })

  // useEffect(() => {
  //   if (editRecord) {
  //     setDrawerTitle("Edit Tax");
  //   } else {
  //     setDrawerTitle("Create Tax");
  //   }
  // }, [editRecord, open]);



  // // drawer
  // const showDrawer = (record: any) => {
  //   if (record) {
  //     setEditRecord(record);
  //     form.setFieldsValue(record); // Set form values for editing
  //   } else {
  //     setEditRecord(null);
  //     form.resetFields();
  //   }

  //   setOpen(true);
  // };

  // const onClose = () => {
  //   setOpen(false);
  //   form.resetFields()
  // };




  const columns = [
    // {
    //   title: 'S No',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'Customer Name',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name',
    },
    {
      title: 'Advance',
      dataIndex: 'advance',
      key: 'advance',
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (text: any, record: any) => (

    //     <Space size="middle">
    //       <EyeOutlined style={{ cursor: "pointer" }}
    //         onClick={() => showModal(record)} className='view-icon' rev={undefined} />
    //       <EditOutlined
    //         style={{ cursor: "pointer" }}
    //         onClick={() => showDrawer(record)}
    //         className='edit-icon' rev={undefined} />
    //       <DeleteOutlined
    //         style={{ color: "red", cursor: "pointer" }}
    //         onClick={() => handleDelete(record)} className='delete-icon' rev={undefined} />
    //     </Space>
    //   ),
    // }
  ];



  //   const handleDelete = (record: any,) => {

  //     const Token = localStorage.getItem("token")

  //     Modal.confirm({
  //       title: "Are you sure, you want to delete this PENDING PAYMENT record?",
  //       okText: "Yes",
  //       okType: "danger",
  //       onOk: () => {
  //         console.log(record, "values")
  //         axios.delete(`http://files.covaiciviltechlab.com/delete_tax/${record.id}`, {
  //           headers: {
  //             "Authorization": `Token ${Token}`
  //           }
  //         }).then((res) => {
  //           console.log(res)
  //           GetTaxData()
  //         }).catch((err) => {
  //           console.log(err)
  //         })

  //       },
  //     });
  //   };



  // input search
  const [filterData, setFilterData] = useState(dataSource)

  const inputChange = ((e: any) => {
    const SearchValue = e.target.value

    const filteredData = dataSource.filter((item: any) => {
      return (
        item.project_name.toLowerCase().includes(SearchValue.toLowerCase())

      )
    })
    setFilterData(filteredData)
  })

  // form submit
  // const onFinish = (values: any,) => {
  //   console.log('Success:', editRecord, values);


  //   const Token = localStorage.getItem("token")
  //   console.log("TokenTokenTokenToken", Token)

  //   // Check if editing or creating
  //   // if (editRecord) {
  //   //   axios.put(`http://files.covaiciviltechlab.com/edit_tax/${editRecord.id}/`, values, {
  //   //     headers: {
  //   //       "Authorization": `Token ${Token}`
  //   //     }
  //   //   }).then((res: any) => {
  //   //     // Successful response
  //   //     GetTaxData()
  //   //     console.log(res);
  //   //     setOpen(false);
  //   //   }).catch((error: any) => {
  //   //     // Error handling
  //   //     console.log(error);
  //   //   });
  //   // } else {
  //     // Making a POST request using Axios
  //     axios.post("http://files.covaiciviltechlab.com/create_tax/", values, {
  //       headers: {
  //         "Authorization": `Token ${Token}`
  //       }
  //     }).then((res: any) => {
  //       GetTaxData()
  //       console.log(res);
  //       setOpen(false);
  //     }).catch((error: any) => {
  //       // Error handling
  //       console.log(error);
  //     });

  //     // Clear form fields
  //     form.resetFields();
  //   // }
  //   // Close the drawer
  //   // onClose();
  // }


  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  // type FieldType = {
  //   tax_name?: string;
  //   tax_percentage?: string;
  //   tax_status?: string;
  // };
  // console.log("viewRecordviewRecord", viewRecord)


  // Model Data
  //   const modalData = () => {
  //     const formatDate = (dateString: any) => {
  //       if (!dateString) {
  //         return "N/A"; // or handle it according to your requirements
  //       }

  //       const date = new Date(dateString);

  //       if (isNaN(date.getTime())) {
  //         return "Invalid Date"; // or handle it according to your requirements
  //       }

  //       return new Intl.DateTimeFormat('en-US', {
  //         year: 'numeric',
  //         month: 'long',
  //         day: 'numeric',
  //       }).format(date);
  //     };

  //     const data = [
  //       {
  //         label: "Tax Name:",
  //         value: viewRecord?.tax_name || "N/A",
  //       },
  //       {
  //         label: "Tax Percentage:",
  //         value: viewRecord?.tax_percentage || "N/A",
  //       },
  //       {
  //         label: "Tax Status:",
  //         value: viewRecord?.tax_status || "N/A",
  //       },
  //       {
  //         label: "Created By:",
  //         value: viewRecord?.created_by || "N/A",
  //       },
  //       {
  //         label: "Created Date:",
  //         value: formatDate(viewRecord?.created_date),
  //       },
  //       {
  //         label: "Modified By:",
  //         value: viewRecord?.modified_by || "N/A",
  //       },
  //       {
  //         label: "Modified Date:",
  //         value: formatDate(viewRecord?.modified_date),
  //       },
  //     ];

  //     return data;
  //   };


  return (
    <>
      <div>
        <div className='tax-heading-main'>
          <div>
            <h1 className='tax-title'>Pending Payment</h1>
          </div>
          <div>
            <Search placeholder="input search text" onChange={inputChange} enterButton className='search-bar' />
            {/* <button type='button' onClick={() => showDrawer(null)} className='create-button'>+ Create Pending Payment</button> */}
          </div>
        </div>
        <div>
          <Table dataSource={filterData} columns={columns} pagination={false} />
        </div>

        {/* <Drawer title={drawerTitle} placement="right" width={600} onClose={onClose} open={open}>
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
              label="Tax Name"
              name="tax_name"
              required={false}
              rules={[{ required: true, message: 'Please input your Tax Name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Tax Percentage"
              name="tax_percentage"
              required={false}
              rules={[{ required: true, message: 'Please input your Tax Percentage!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Tax Status" name="tax_status"
              required={false}
              rules={[{ required: true, message: 'Please input your Tax Status!' }]}
            >
              <Radio.Group>
                <Radio value="E"> Enable </Radio>
                <Radio value="D"> Disable </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item >
              <div className='form-btn-main'>
                <Space>
                  <Button danger htmlType="submit" onClick={() => onClose()}>
                    cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Space>

              </div>

            </Form.Item>
          </Form>
        </Drawer> */}


        {/* Modal */}
        {/* <Modal title="View Tax" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
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
        </Modal> */}

      </div>
    </>
  )
}

export default PendingPayment