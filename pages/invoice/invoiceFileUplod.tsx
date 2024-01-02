import { size } from 'lodash'
import React, { useState, useEffect } from 'react'
import { Space, Table, Modal } from 'antd';
import { Button, Drawer } from 'antd';
import { Checkbox, Form, Input, Radio, message, Upload, Select } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, InboxOutlined } from "@ant-design/icons";
import axios from "axios"
import type { UploadProps } from 'antd';


const InvoiceFileUpload = () => {

  const [open, setOpen] = useState(false);
  const { Search } = Input;
  const [form] = Form.useForm();
  const [editRecord, setEditRecord] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState("Create Tax")
  const [viewRecord, setViewRecord] = useState(null)
  const [dataSource, setDataSource] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formFields, setFormFields] = useState([])

  // Model 
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


  // get Tax datas
  useEffect(() => {
    getFileUpload()
  }, [])

  const getFileUpload = (() => {
    const Token = localStorage.getItem("token")
    console.log("TokenTokenTokenToken", Token)

    axios.get("http://files.covaiciviltechlab.com/invoice_file_upload_list/", {
      headers: {
        "Authorization": `Token ${Token}`
      }
    }).then((res) => {
      setDataSource(res?.data?.invoice_files)
      setFilterData(res?.data?.invoice_files)
    }).catch((error: any) => {
      console.log(error)
    })
  })
  console.log("dataSourcedataSource", dataSource)



  useEffect(() => {
    const Token = localStorage.getItem("token")

    axios.get("http://files.covaiciviltechlab.com/create_invoice_file_upload/", {
      headers: {
        "Authorization": `Token ${Token}`
      }
    }).then((res) => {
      setFormFields(res?.data)
    }).catch((error: any) => {
      console.log(error)
    })
  }, [])


  useEffect(() => {
    if (editRecord) {
      setDrawerTitle("Edit Invoice File Upload");
    } else {
      setDrawerTitle("Create Invoice File Upload");
    }
  }, [editRecord, open]);



  // drawer
  const showDrawer = (record: any) => {
console.log('✌️record --->', record);
    if (record) {
      setEditRecord(record);
      form.setFieldsValue({
        invoice: record.invoice,
        file:
          [
            {
              uid: 'rc-upload-1',
              name: record.file_url, // Assuming 'file_url' is the field with the existing file name
              status: 'done',
              url: record.file_url, // Assuming 'file_url' is the field with the file URL
            },
          ]

      });
    } else {
      setEditRecord(null);
      form.resetFields();
    }

    setOpen(true);
  };


  const onClose = () => {
    setOpen(false);
    form.resetFields()
  };




  const columns = [
    {
      title: 'Invoice',
      dataIndex: 'invoice',
      key: 'invoice',
    },
    {
      title: 'file_url',
      dataIndex: 'file_url',
      key: 'file_url',
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



  const handleDelete = (record: any,) => {

    const Token = localStorage.getItem("token")

    Modal.confirm({
      title: "Are you sure, you want to delete this INVOICE FILE UPLOAD record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        console.log(record, "values")
        axios.delete(`http://files.covaiciviltechlab.com/delete_invoice_file_upload/${record.id}`, {
          headers: {
            "Authorization": `Token ${Token}`
          }
        }).then((res) => {
          console.log(res.data)
          getFileUpload()
        }).catch((err) => {
          console.log(err)
        })

      },
    });
  };



  // input search
const [filterData, setFilterData] = useState(dataSource)
  const inputChange = (e: any) => {
    setFilterData(
      dataSource.filter((item: any) => {
        return item.file_url.toLowerCase().includes(e.target.value.toLowerCase())
      })
    )
  }



  // form submit
  const onFinish = (values: any) => {
    console.log('✌️values --->', values);
    // console.log('Success:', editRecord, values);

    const Token = localStorage.getItem("token");
    console.log("TokenTokenTokenToken", Token);


    // Create a FormData object to send files
    const formData = new FormData();
    formData.append("file", values.file.file.originFileObj);
    formData.append('invoice', values.invoice);


    // Check if editing or creating
    if (editRecord) {
      axios.put(`http://files.covaiciviltechlab.com/edit_invoice_file_upload/${editRecord.id}/`, formData, {
        headers: {
          "Authorization": `Token ${Token}`,
          "Content-Type": "multipart/form-data",  // Set content type for file upload
        },
      }).then((res: any) => {
        // Successful response
        getFileUpload();
        console.log(res);
        setOpen(false);
      }).catch((error: any) => {
        // Error handling
        console.log(error);
      });
    } else {
      // Making a POST request using Axios
      axios.post("http://files.covaiciviltechlab.com/create_invoice_file_upload/", formData, {
        headers: {
          "Authorization": `Token ${Token}`,
          "Content-Type": "multipart/form-data",  // Set content type for file upload
        },
      }).then((res: any) => {
        getFileUpload();
        console.log(res);
        setOpen(false);
      }).catch((error: any) => {
        // Error handling
        console.log(error);
      });

      // Clear form fields
      form.resetFields();
    }

    // Close the drawer
    onClose();
  };



  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    invoice?: string;
    file?: string;
  };
  // console.log("viewRecordviewRecord", viewRecord)


  // Model Data
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

    console.log("viewRecord", viewRecord)

    const data = [
      {
        label: "invoice:",
        value: viewRecord?.invoice|| "N/A",
      },
      {
        label: "file_url:",
        value: viewRecord?.file_url || "N/A",
      },
    ];

    return data;
  };






  // file upload

  const { Dragger } = Upload;

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <>
      <div>
        <div className='tax-heading-main'>
          <div>
            <h1 className='tax-title'>Manage Invoice File Upload</h1>
          </div>
          <div>
            <Search placeholder="input search text" onChange={inputChange} enterButton className='search-bar' />
            <button type='button' onClick={() => showDrawer(null)} className='create-button'>+ Create Invoice File Upload</button>
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
            <Form.Item
              label="Invoice"
              name="invoice"
              required={false}
              rules={[{ required: true, message: 'Please select Expense User!' }]}
            >
              <Select
                placeholder="Select a Invoice">
                {formFields?.invoices?.map((val: any) => (
                  <Select.Option key={val.id} value={val.id}>
                    {val.id}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item<FieldType>
              label="File"
              name="file"
            >
              <Dragger {...props} >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined rev={undefined} />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
                </p>
              </Dragger>


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


        {/* Modal */}
        <Modal title="View Tax" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
          <div  style={{overflow:"scroll"}}>
          {
            modalData()?.map((value: any) => {
              return (
                <>
                  <div className='content-main'>
                    <p className='content-1'>{value?.label}</p>
                    <p className='content-2'>{value?.value}</p>
                  </div>
                </>
              )
            })
          }
          </div>
          
        </Modal>

      </div>
    </>
  )
}

export default InvoiceFileUpload