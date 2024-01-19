import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import { Button, Table } from 'antd';
import Dropdownbtn from '../../Components/Common/Dropdownbtn'
import SearchInput from '../../Components/Common/SearchInput'
import toast from "react-hot-toast";
import adminAxios from '../../Axios/Adminaxios'
import { CheckOutlined, UserOutlined ,CloseOutlined} from '@ant-design/icons';
import { Spin } from 'antd';
import { TfiReload } from "react-icons/tfi";

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     email : 'john@gmail.com',
//     date: 32,
//     mobile:8547822807,
//     place: 'New York No. 1 Lake Park',
//     action : <Button>Block</Button>
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     email : 'john@gmail.com',
//     date: 42,
//     mobile:8547822807,
//     place: 'London No. 1 Lake Park',
//     action : <Button>Block</Button>
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     email : 'john@gmail.com',
//     date: 32,
//     mobile:8547822807,
//     place: 'Sydney No. 1 Lake Park',
//     action : <Button>Block</Button>

//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     email : 'john@gmail.com',
//     date: 32,
//     mobile:8547822807,
//     place: 'London No. 2 Lake Park',
//     action : <Button>Block</Button>

//   },
// ];

const Users = () => {
  const [userList,setUserList] = useState([])
  const [loading,setloading] = useState(false)
  const [reloaded,setReloaded] = useState(false)
  const [searchInput,setSearchInput]=useState('') 
  const [filter,setFilter]= useState('')
  const [spin,setSpin] = useState({
    reload : false,
    filter : false,
    blocktoggler : false
  })

  const fetchUserData=async()=>{
    try {
      setloading(true)
      const response = await adminAxios.get(`/users?search=${searchInput}&${filter}`)
      const userData = response.data.result
      console.log(userData);
      const formattedData = userData.map(item => ({
          key: item._id,
          _id : item._id,
          name: item.username,
          email: item.email,
          date: item.date,
          mobile: item.mobile,
          location: item.location,
          purchased: item.purchased?<div align="center"><CheckOutlined/></div> : <CloseOutlined />,
          is_blocked : item.is_blocked,
          action: <Button className={`${!item.is_blocked ? 'bg-green-200' : 'bg-red-200'}`} onClick={()=>blockToggler(item._id,item.is_blocked)}>{item.is_blocked?'Resume':'Suspend'}</Button>
      }));
      console.log(formattedData ,'formated data');
      setUserList(formattedData)
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    } finally {
      setloading(false)
      setSpin((spin) => ({ ...spin, filter: false ,reload: false }));
    }
  }

  const blockToggler= async(id,currStatus)=>{
      try {
        await adminAxios.patch('/users',{id,currStatus}) 
        fetchUserData()
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
  }

  const search=(input)=>{
    setSearchInput(input)
  }

  const reload =async()=>{
    setFilter('')
    setSpin((spin) => ({ ...spin, reload: true }));
    setTimeout(()=>{
      fetchUserData()
      setReloaded(true)
    },2000)
    setTimeout(()=>{
      setReloaded(false)
    },10000)
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Mobile', dataIndex: 'mobile', key: 'mobile' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Puchased', dataIndex: 'purchased', key: 'purchased' },
    { title: 'Action', dataIndex: 'action', key: 'action' },
  ];

  const options = [
    {
      label: 'Purchased',
      key: '1',
      icon: <CheckOutlined style={{ color: '#52c41a' }} />,
    },
    {
      label: 'Non Purchased',
      key: '2',
      icon: <UserOutlined style={{ color: '#f5222d' }} />,
    },
    {
      label: 'Completed',
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
    fetchUserData()
  },[searchInput,filter])

  return (
    <div>
      <Sidebar/>
      <div className='pl-16 md:pl-40'>
        <div className=' py-8 px-2 sm:px-8'>
          <div className='my-5 w-full flex justify-end animate-fade-left'>
              <Dropdownbtn items={options} loading={spin.filter} handleSelect={handleFilter}/>
              <SearchInput search={search}/>
              <Button className='mx-2' disabled={reloaded} onClick={()=>reload()}><TfiReload  className={`${spin.reload ? 'animate-spin' : ''}`}/></Button>
          </div>
          {
            loading ?
            <div align="center" className='w-full bg-gray-50 animate-pulse items-center justify-center flex' >
              <Spin size="large" style={{margin : 20}}/>
              <Spin size="large" />
            </div> : 
            <Table className='animate-fade-up' columns={columns} dataSource={userList} pagination={false} scroll={{ x: true }}/>
          }
        </div>
      </div>
    </div>
  )
  }

export default Users
