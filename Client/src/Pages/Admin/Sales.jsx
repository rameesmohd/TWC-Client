import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import { Button, Divider, Flex, Modal, Popconfirm, Radio, Table, message } from 'antd';
import Dropdownbtn from '../../Components/Common/Dropdownbtn'
import SearchInput from '../../Components/Common/SearchInput'
import toast from "react-hot-toast";
import adminAxios from '../../Axios/Adminaxios'
import {  CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, EyeOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
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
  const [spin,setSpin] = useState({
    reload : false,
    filter : false,
    orderHandle : false
  })
  const [orderBy,setOrderBy]=useState({
      timeframe : 'weekly',
      filter  : '',
      searchInput : '',
      dateRangeFrom : '',
      dateRangeTo : ''
  })

  const fetchOrderData=async()=>{
      try {
        setloading(true)
        const response = await axiosInstance
        .get(
          `/order?timeframe=${orderBy.timeframe}&
          filter=${orderBy.filter}&
          search=${orderBy.searchInput}&
          from=${orderBy.dateRangeFrom}&
          to=${orderBy.dateRangeTo}`
        )
        setSalesData([...response.data.result])
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }finally {
        setloading(false)
        setSpin((spin) => ({ ...spin, filter: false ,reload: false }));
      }
  }

  const orderHandle=async(orderId,action)=>{
    try {
      // action 1=accept/success 
      // action 2=reject
      setSpin((spin) => ({ ...spin, orderHandle  :true }));
      const response = await axiosInstance.patch('/order',{orderId,action})
      const updatedData = response.data.result
      console.log(updatedData);
      setSalesData((salesData)=>salesData.map((value,i)=>value._id===updatedData._id ? updatedData : value ))
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }finally {
      setSpin((spin) => ({ ...spin, orderHandle  :true }));
    }
  }

  const search=(input)=>{
    setOrderBy({...orderBy , searchInput : input})
  }

  const reload =async()=>{
    setSpin((spin) => ({ ...spin, reload: true }));
    setTimeout(()=>{
      fetchOrderData()
      message.success('Data Reloaded')
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
      render: (amount,record) => 
      (<span style={{ fontSize: '16px' }}>
        {record.payment_method === 'local_bank' && <>₹ {amount}</>}
        {record.payment_method === 'phonepe' && <>₹ {amount}</>}
        {record.payment_method === 'usdt' && <>$ {amount}</>}
      </span>)
    },
    { title: 'Payment Mode', dataIndex: 'payment_method', key: 'payment_method' },
    { title: 'Email', dataIndex: 'user_email', key: 'user_email' },
    { 
      title: 'Status', 
      dataIndex: 'payment_status', 
      key: 'payment_status' ,
      render: (status) => 
      <>
        {status==='pending' && <span style={{ fontSize: '16px',color : 'orangered'}}><ClockCircleOutlined className='mx-1'/>Pending</span> }
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
          {screenshot ? <>
          <div className='border w-fit'>
              <img className='blur-sm object-cover' alt={screenshot} src={screenshot} style={{ height : 80 ,width : 100 }} />
          </div>
          <EyeOutlined className='absolute top-8 left-12 text-2xl text-slate-300' key="view" onClick={() => handleViewImage(screenshot)} />
          </> : <div>--</div>}
        </div>
      ),
    },
    { 
      title: 'Controls', 
      dataIndex: 'action', 
      key: 'action',
      render :(text,record)=> (
        <>
          {record.payment_status === 'pending' && 
          <>
          	<Popconfirm
                title="Approve Order"
                description="Are you sure to Approve?"
                onConfirm={()=>orderHandle(record._id,1)}
                onCancel={'cancel'}
                okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
                okText={'Yes'}
                style={{backgroundColor :'red'}}
                cancelText="No"
			      >
                <Button className=' bg-green-300'>Approve</Button >
            </Popconfirm>
              <span className='mx-2'>|</span>
            <Popconfirm
                title="Reject Order"
                description="Are you sure to Reject?"
                onConfirm={()=>orderHandle(record._id,2)}
                onCancel={'cancel'}
                okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
                okText={'Yes'}
                style={{backgroundColor :'red'}}
                cancelText="No"
			      >
                <Button className=' bg-red-300'>Reject</Button>  
            </Popconfirm>
          </>}
          {record.payment_status === 'success' && <p><CheckCircleOutlined className='mx-1' />Approved</p>}
          {record.payment_status==='rejected' && <p><CloseCircleOutlined className='mx-1'/>Rejected</p>}
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
        setOrderBy({...orderBy, filter : 'pending'})
      } else if(key==2){
        setOrderBy({...orderBy, filter : 'rejected'})
      } else if(key==3){
        setOrderBy({...orderBy, filter : 'approved'})
      }
  }

  const handleDateRangeChange = (dates, dateStrings) => {
    setOrderBy({...orderBy ,timeframe : '',dateRangeFrom : dateStrings[0],dateRangeTo : dateStrings[1]})
  };

  const handleDateRangeFetch=()=>{
    orderBy.dateRangeFrom && orderBy.dateRangeTo && fetchOrderData()  
  }

  useEffect(()=>{
    fetchOrderData()
  },[
    orderBy.timeframe,
    orderBy.searchInput,
    orderBy.filter
  ])

  return (
    <>
      <Modal title="Transaction Proof" onCancel={()=>setShowImageModal(false)} okButtonProps={{hidden : true}} onOk={()=>setShowImageModal(false)} open={showImageModal} >
            <img src={screenshotUrl} alt="" />
      </Modal>
      <Sidebar/>
      <div className='pl-16 md:pl-40'>
        <div className='py-8 px-2 sm:px-8'>
        <Divider orientation="left" style={{fontSize : '30px'}}>Our Sales</Divider>
          <Flex justify='space-between ' className='my-5 w-full animate-fade-left'>
              <div className='flex justify-between'>
              <Radio.Group className='my-2' defaultValue="weekly" onChange={(e)=>setOrderBy({...orderBy,timeframe : e.target.value})} buttonStyle="outline">
                <Radio.Button value="daily">Daily</Radio.Button>
                <Radio.Button value="weekly">Weekly</Radio.Button>
                <Radio.Button value="monthly">Monthly</Radio.Button>
              </Radio.Group>
              <div className='sm:flex'>
                <Flex className='flex my-2' direction="vertical" size={12}>
                  <RangePicker onChange={handleDateRangeChange} />
                  <Button icon={<SearchOutlined />} onClick={()=>handleDateRangeFetch()} className='mx-1 p-1'/>
                </Flex>
                <Flex  align='center' direction="vertical">
                  <Dropdownbtn items={options} loading={spin.filter} handleSelect={handleFilter}/>
                </Flex>
                <Flex className='my-2' align='center' direction="vertical" >
                  <Button className='' disabled={reloaded} onClick={()=>reload()}><TfiReload  className={`${spin.reload ? 'animate-spin' : ''}`}/></Button>
                  <SearchInput className="mx-0" search={search}/>
                </Flex>
              </div>
              </div>
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
              pageSize: 20, 
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
