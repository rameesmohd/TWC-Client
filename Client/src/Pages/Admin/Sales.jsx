import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import { Button, Card, Divider, Flex, Modal, Radio, Table } from 'antd';
import Dropdownbtn from '../../Components/Common/Dropdownbtn'
import SearchInput from '../../Components/Common/SearchInput'
import toast from "react-hot-toast";
import adminAxios from '../../Axios/Adminaxios'
import { BoldOutlined, CheckCircleOutlined, CheckOutlined, ClockCircleOutlined, CloseCircleOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import { TfiReload } from "react-icons/tfi";
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const sales = () => {
  const axiosInstance = adminAxios()
  const [salesData,setSalesData]=useState([])
  const [loading,setloading] = useState(false)
  const [reloaded,setReloaded] = useState(false)
  const [screenshotUrl,setScreenshotUrl]=useState('')
  const [showImageModal,setShowImageModal]=useState(false)
  const [searchInput,setSearchInput]=useState('') 
  // const [filter,setFilter]= useState('')
  const [spin,setSpin] = useState({
    reload : false,
    filter : false,
  })

  // const fetchUserData=async()=>{
  //   try {
  //     setloading(true)
  //     const response = await axiosInstance.get(`/orders?search=${searchInput}&${filter}`)
  //     const userData = response.data.result
  //     const formattedData = userData.map(item => ({
  //       key: item._id,
  //       _id : item._id,
  //       name: item.username,
  //       email: item.email,
  //       date: item.date,
  //       mobile: item.mobile,
  //       location: item.location,
  //       purchased: item.purchased?<div align="center"><CheckOutlined/></div> : <CloseOutlined />,
  //       is_blocked : item.is_blocked,
  //       action: <Button className={`${!item.is_blocked ? 'bg-green-200' : 'bg-red-200'}`} onClick={()=>blockToggler(item._id,item.is_blocked)}>{item.is_blocked?'Resume':'Suspend'}</Button>
  //     }));

  //     setUserList(formattedData)
  //   } catch (error) {
  //     toast.error(error.message)
  //     console.log(error);
  //   } finally {
  //     setloading(false)
  //     setSpin((spin) => ({ ...spin, filter: false ,reload: false }));
  //   }
  // }

  const fetchOrderData=async()=>{
      try {
        setloading(true)
        const response = await axiosInstance.get('/order')
        setSalesData([...response.data.result,...response.data.result,...response.data.result,...response.data.result,])
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }finally {
        setloading(false)
        setSpin((spin) => ({ ...spin, filter: false ,reload: false }));
      }
  }

  const search=(input)=>{
    setScreenshotUrl(input)
  }

  const reload =async()=>{
    setSpin((spin) => ({ ...spin, reload: true }));
    setTimeout(()=>{
      fetchOrderData()
      setReloaded(true)
    },2000)
    setTimeout(()=>{
      setReloaded(false)
    },10000)
  }

  const handleViewImage = (imageUrl) => {
        setScreenshotUrl(imageUrl)
        setShowImageModal(true)

  };

  const columns = [
    { title: 'Trasanction Id', dataIndex: 'transaction_id', key: 'transaction_id' },
    { 
      title: 'Date', 
      dataIndex: 'date', 
      key: 'date',
      render: (date) => {
        const dateTime = new Date(date);
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
          timeZone: 'Asia/Kolkata',
        };
        return dateTime.toLocaleString('en-IN', options);
      },
    },
    { 
      title: 'Amount', 
      dataIndex: 'amount', 
      key: 'amount',
      render: (amount) => (<span style={{ fontSize: '16px' }}>{amount}</span>)
    },
    { title: 'Payment Mode', dataIndex: 'payment_method', key: 'payment_method' },
    { title: 'Email', dataIndex: 'user_email', key: 'user_email' },
    { 
      title: 'Status', 
      dataIndex: 'payment_status', 
      key: 'payment_status' ,
      render: (status) => 
      <>
        {status==='pending' && <span style={{ fontSize: '16px',color : 'orangered'}}><ClockCircleOutlined />Pending</span> }
        {status==='success' && <span style={{ fontSize: '16px',color: 'green' }}>Success</span>}
        {status==='rejected' && <span style={{ fontSize: '16px',color : 'red' }}>Rejected</span>}
      </>
    },
    {
      title: 'Uploads',
      dataIndex: 'screenshot',
      key: 'screenshot',
      render: (screenshot) => (
        <div className='relative'>
          <div className='border w-fit'>
              <img className='blur-sm' alt={screenshot} src={screenshot} style={{ height : 80 }} />
          </div>
        <EyeOutlined className='absolute top-8 left-12 text-2xl text-slate-300' key="view" onClick={() => handleViewImage(screenshot)} />
        </div>
      ),
    },
    { 
      title: 'Controls', 
      dataIndex: 'action', 
      key: 'action',
      render :(text,record)=> (
        <>
          {record.payment_status === 'pending' && <><Button className=' bg-green-300'>Approve</Button ><span className='mx-2'>|</span><Button className=' bg-red-300'>Reject</Button>  </>}
          {record.payment_status === 'success' && <p><CheckCircleOutlined />Approved</p>}
          {record.payment_status==='rejected' && <p><CloseCircleOutlined />Rejected</p>}
        </>
      )
    }
  ];

  const options = [
    {
      label: 'Pending',
      key: '1',
      icon: <ClockCircleOutlined style={{ color: 'orangered' }} />,
    },
    {
      label: 'Rejected',
      key: '2',
      icon: <UserOutlined style={{ color: '#f5222d' }} />,
    },
    {
      label: 'Approved',
      key: '3',
      icon: <UserOutlined style={{ color: '#1890ff' }} />,
      primary: true,
    }
  ];

  const handleFilter =(key)=>{
        setSpin((spin) => ({ ...spin, filter: true }));
        if(key==1){
          setFilter('is_purchased=true')
        }else if(key==2){
          setFilter('is_purchased=false')
        }else if(key==3){
          setFilter('is_completed=true')
        }
  }

  useEffect(()=>{
    fetchOrderData()
  },[])

  return (
    <>
      <Modal title="Transaction Proof" onCancel={()=>setShowImageModal(false)} okButtonProps={{hidden : true}} onOk={()=>setShowImageModal(false)} open={showImageModal} >
            <img src={screenshotUrl} alt="" />
      </Modal>
      <Sidebar/>
      <div className='pl-16 md:pl-40'>
        <div className=' py-8 px-2 sm:px-8'>
        <Divider orientation="left" style={{fontSize : '30px'}}>Our Sales</Divider>
          <Flex justify='space-between' className='my-5 w-full animate-fade-left'>
              <Radio.Group defaultValue="a" buttonStyle="outline">
                <Radio.Button value="a">Daily</Radio.Button>
                <Radio.Button value="b">Weekly</Radio.Button>
                <Radio.Button value="c">Monthly</Radio.Button>
                <Radio.Button value="d">Yearly</Radio.Button>
              </Radio.Group>
              <Flex>
                <Space  className='mx-2' direction="vertical" size={12}>
                  <RangePicker />
                </Space>
                <Dropdownbtn items={options} loading={spin.filter} handleSelect={handleFilter}/>
                <SearchInput search={search}/>
                <Button className='mx-2' disabled={reloaded} onClick={()=>reload()}><TfiReload  className={`${spin.reload ? 'animate-spin' : ''}`}/></Button>
              </Flex>
          </Flex>
            <Table className='animate-fade-up border-b shadow-md' 
              columns={columns.map((col) => ({
                ...col,
                onHeaderCell: (column) => ({
                style: { background: '	#383838', color: 'white' },
                })}))}
            dataSource={salesData} 
            loading={loading} 
            pagination={{
              pageSize: 5, 
              total: salesData.length, 
            }}
            scroll={{ x: true }}
            />
        </div>
      </div>
    </>
  )
  }

export default sales
