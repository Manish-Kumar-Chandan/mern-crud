import React,{useEffect, useState, useMemo} from 'react'
import { Button, Table, Form, Input, PageHeader, Modal, Alert } from "antd";
import TextArea from 'antd/lib/input/TextArea';
import { getAllEmployeesAction, addEmployeesAction ,updateEmployeesAction, deleteEmployeesAction } from '../../redux/actions/EmployeesActions';
import { useDispatch, useSelector } from 'react-redux';
import {nameSortAsc, nameSortDesc, salarySortDesc, salarySortAsc, departmentSortAsc, departmentSortDesc} from '../utils/Sorting'


function EmployeePage() {
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState();
    const [id, setid] = useState();
    const [newData, setNewData] = useState({
      name:"",
      department:"",
      salary:""
    });
    const [editingRow, setEditingRow] = useState(null);
    const [form] = Form.useForm();
    const [modal, setmodal] = useState({
      modalVisible: false,
      modalTitle: "",
      modalBtn: "",
    })

    let state = useSelector((state) => {
        return { 
            employeesData : state.getAllEmployeesReducer.allEmployees,
            isDeleted : state.deleteEmployeeReducer.deleted,
            isError : state.addEmployeesReducer.error,
            msg : state.addEmployeesReducer.payload,
            isAdded : state.addEmployeesReducer.isAdded
        }
    });
   
    useMemo(()=>{
        const empData = state.employeesData? state.employeesData : [];
        const data = []

        for (let index = 0; index < empData.length; index++) {
                data.push({
                id: empData[index]._id,
                key: `${index}`,
                name: `${empData[index].name}`,
                department: `${empData[index].department}`,
                salary: `${empData[index].salary}`
            });
        }

        setDataSource(data);
    },[state.employeesData])

    useEffect(() => {
        dispatch(getAllEmployeesAction());
    }, [state.isDeleted, state.isAdded]);


    const handleTableChange = (pagination, filters, sorter) => {
      // console.log(dataSource)
      console.log("sorting...",sorter ,filters)

      if(sorter.order==="ascend" && sorter.field==="name"){
        return nameSortAsc(dataSource)
      }
      if(sorter.order==="descend" && sorter.field==="name"){
        return nameSortDesc(dataSource);
      }

      if(sorter.order==="ascend" && sorter.field==="salary"){
        return salarySortAsc(dataSource);
      }
      if(sorter.order==="descend" && sorter.field==="salary"){
        return salarySortDesc(dataSource);
      }

      if(sorter.order==="ascend" && sorter.field==="department"){
        return departmentSortAsc(dataSource);
      }
      if(sorter.order==="descend" && sorter.field==="department"){
        return departmentSortDesc(dataSource);
      }
    };

    const onFinish = (values) => {
      console.log(values, editingRow, dataSource)
    
      dispatch(updateEmployeesAction(values, id));
      const updatedDataSource = [...dataSource];
      console.log(updatedDataSource)
      updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
      setDataSource(updatedDataSource);
      setEditingRow(null);
    };

    const toggleModal = ()=>{
      setmodal({ 
        modalTitle: "Add New Employee Data",
        modalBtn: "Add",
        modalVisible: true
      })
    }

    const handleCancel = ()=>{
      setmodal({
        modalVisible: false
      })
    }

    const handleOk = ()=>{
      dispatch(addEmployeesAction(newData))
      setNewData({
        name:"",
        department:"",
        salary:""
      })
    }

    const textChange = (e)=>{
      setNewData({...newData, [e.target.name]:e.target.value})
    }

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        sorter: true,
        render: (text, record) => {
          if (editingRow === record.key) {
            return (
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        title: "Department",
        dataIndex: "department",
        sorter: true,
        render: (text, record) => {
          if (editingRow === record.key) {
            return (
              <Form.Item name="department"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              > 
                <TextArea />
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        title: "Salary",
        dataIndex: "salary",
        sorter: true,
        render: (text, record) => {
          if (editingRow === record.key) {
            return (
              <Form.Item
                name="salary"
                rules={[
                  {
                    required: true,
                    message: "Please enter your salary",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        title: "Actions",
        render: (_, record) => {
          return (
            <>
              <Button
                type="link"
                onClick={() => {
                  setEditingRow(record.key);
                  console.log(record)
                  form.setFieldsValue({
                    name: record.name,
                    department: record.department,
                    salary: record.salary,
                    id: record.id
                  });
                }}
              >
                Edit
              </Button>
              <Button onClick={()=> setid(record.id)} type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={()=> {
                dispatch(deleteEmployeesAction(record.id));
              }} type="primary" danger>
                delete
              </Button>
            </>
          );
        },
      },
    ]

    return (
      <div className="App">
        <PageHeader
          title="Employee Data"
          ghost={false}
          extra={[
            <Button onClick={toggleModal} key="1" type="primary" size="large">
              Add
            </Button>,
          ]}
        >
        </PageHeader>

        <Modal
          title={modal.modalTitle}
          visible={modal.modalVisible}
          onOk={handleOk}
          okText={modal.modalBtn}
          onCancel={handleCancel}
        >
          <Alert type='success' message={state.msg} showIcon={true} style={state.isAdded? { display: 'flex' }:{ display: 'none' }} />
          <Alert type='error' message={state.msg} showIcon={true} style={state.isError? { display: 'flex' }:{ display: 'none' }} />
          Name:<Input placeholder='Enter Employee Name' name='name' value={newData.name} onChange={e=>textChange(e)} /><br /><br />
          Department:<Input placeholder='Enter Employee Department' name='department' value={newData.department} onChange={e=>textChange(e)}/><br /><br />
          Salary:<Input placeholder='Enter Employee Salary' name='salary' value={newData.salary} onChange={(e)=>textChange(e)}/><br /><br />
        </Modal>

        <div className="main">
          <Form form={form} onFinish={onFinish}>
            <Table columns={columns} dataSource={dataSource} onChange={handleTableChange} ></Table>
          </Form>
        </div>
      </div>
    );
}

export default EmployeePage