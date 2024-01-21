import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
// import Mainbody from '../../Components/Mycourse/Mainbody'
import Footer from '../../Components/Common/Footer'
import {Button, Card, Flex} from 'antd'
import userAxios from '../../Axios/Useraxios'
import {toast} from 'react-hot-toast'
import {CheckOutlined, LockOutlined, UnlockOutlined  } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Mycourse = () => {
  const [ course,setCourse ]=useState([])
  const axiosInstance = userAxios()
  const navigate =useNavigate()

  const fetchCourseData=async()=>{
      try {
        const response = await axiosInstance.get('/course')
        setCourse(response.data.result)
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
    }
    
    console.log(course);
  useEffect(()=>{
    fetchCourseData()
  },[])

  return (
    <>
      <Navbar/>
      <div className='container mx-auto pt-28'>
        <div className='font-poppins text-2xl my-2 font-bold'>My Course</div>
        <hr />
        <section className=' flex justify-center animate-fade-right my-8'>
          {
          course.length ? 
            <div className='w-full h-[500px]'>
                 <div className=' h-full md:w-2/3'>
                 <Card className='bg-slate-200'    title={<h3 style={{ fontSize: '20px' }}>Mastering Trading Essentials</h3>}>
                  { course.map((chapters,i)=>
                    <Card onClick={()=>navigate('/chapter',{state : {chapters}})} className='font-semibold my-1 hover:bg-slate-100 cursor-pointer'> 
                      <Flex justify={'space-between'} align={'center'}>
                        <div className='text-lg text-black'>
                            {i+1+"."+chapters.title}  
                        </div>
                        <div>
                          <LockOutlined className='text-2xl border rounded-full p-1'/>   
                          <UnlockOutlined className='text-2xl border rounded-full p-1'/>   
                          <CheckOutlined className='text-2xl text-white bg-green-500 rounded-full p-1'/>
                        </div> 
                      </Flex>
                    </Card> 
                    )
                  }
                </Card>
                </div>   
            </div>
          :
          <div className='my-8 sm:h-96'>
                <img className='h-72 ' src="https://img.freepik.com/free-vector/order-paying-contactless-payment-by-credit-card-order-basket-laptop-bank-card-male-online-customer-with-tablet-cartoon-character_335657-2563.jpg" alt="" />
                <p>My course cart is feeling pretty lonely.</p>
                <div className='flex justify-center mt-4 mb-2'>
                    <Button type='primary' style={{backgroundColor :'blue'}} className={'animate-pulse border'}>
                          Purchase our course now
                    </Button>
                </div>
            </div>}
        </section>
        <Footer/>
      </div>
    </>
  )
}

export default Mycourse
