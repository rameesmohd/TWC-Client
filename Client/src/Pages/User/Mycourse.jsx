import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
// import Mainbody from '../../Components/Mycourse/Mainbody'
import Footer from '../../Components/Common/Footer'
import {Button, Card, Flex} from 'antd'
import userAxios from '../../Axios/Useraxios'
import {toast} from 'react-hot-toast'
import {CheckOutlined, LockOutlined, UnlockOutlined  } from '@ant-design/icons'
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { setCourseData } from '../../Redux/ClientSlice'
import Classroom from './Classroom'
import Congrates from '../../Components/Common/Congrates'
import { Progress } from 'antd';

const Mycourse = () => {
  const [ course,setCourse ]=useState([])
  const [loading,setLoading ] = useState(true)
  const [classroomChapter,setClassroomChapter]=useState({})
  const [chapterIndex,setChapterIndex]=useState('')  
  const [progress,setProgress]=useState(0)
  const axiosInstance = userAxios()
  const dispatch = useDispatch()
  const completedChapters = useSelector((store)=>store.Client.completed_chapters)

  const fetchCourseData=async()=>{
      try {
          setLoading(true)
          const response = await axiosInstance.get('/course')
          console.log(response.data);
          console.log(response.data.result.length);
          if(response.data.result.length){
            setCourse(response.data.result)
            dispatch(setCourseData({
              is_purchased : response.data.user.is_purchased,
              completed_chapters : response.data.user.completed_chapters 
            }))
          }
          setLoading(false)
      } catch (error) {
        toast.error(error.message)
        console.log(error);
        setLoading(false)
      } 
    }

  const handleChapterComplete=async()=>{
      try {
        const response = await axiosInstance.patch('/course',{chapterId : classroomChapter._id})
        console.log(response.data.result);
        dispatch(setCourseData({
          is_purchased : response.data.result.is_purchased,
          completed_chapters : response.data.result.completed_chapters 
        }))
        if(progress<100){
          toast.success('Next chapter unlocked')
        }
        setClassroomChapter({})
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
    }

  function calculateProgress(){
    if (completedChapters.length === 0 || course.length === 0) {
      return 0; 
    }
    return (completedChapters.length/course.length)*100 
  }

  useEffect(()=>{
    fetchCourseData()
  },[])

  useEffect(()=>{
    setProgress(calculateProgress())
  },[completedChapters,course])

  return (
    <div className='bg-slate-50'>
    <Navbar/>
     <div className='container mx-auto pt-28 px-4'>
        <div className='font-poppins text-2xl my-2 font-bold'>My Course</div>
        <hr />
        <div className='my-8 animate-fade-right'>
          {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} loading={loading} rows={20} active className='my-8' />
          ))}
        </div>
        { !Object.keys(classroomChapter).length?
         <section className='flex justify-center  my-8'>
          { !loading && course.length ? 
            <div className='w-full min-h-[500px] animate-fade-right'>
                 <div className=' h-full md:w-2/3'>
                 <Card className='bg-slate-300' title={<h3 style={{ fontSize: '20px',color : 'black' }}>Mastering Trading Essentials</h3>}>
                 <Progress percent={progress} />
                  { course.map((chapters,i)=>
                  <>
                    {completedChapters.includes(chapters._id) ? (  
                      <Card key={chapters._id} onClick={()=>{setClassroomChapter(chapters), setChapterIndex(i+1)}} className='font-semibold my-1 hover:bg-slate-100 cursor-pointer'> 
                        <Flex justify={'space-between'} align={'center'}>
                          <div className='text-lg text-black'>
                              {i+1+"."+chapters.title}  
                          </div>
                          <div >
                            {<CheckOutlined className='text-2xl text-white bg-green-500 rounded-full p-1'/> }
                          </div> 
                        </Flex>
                      </Card> ) :
                      ( i>0 && completedChapters.includes(course[i-1]._id) || i==0 ?
                       <Card key={chapters._id} onClick={()=>{setClassroomChapter(chapters), setChapterIndex(i+1)}} className='font-semibold my-1 hover:bg-slate-100 cursor-pointer'> 
                          <Flex justify={'space-between'} align={'center'}>
                          <div className='text-lg text-black'>
                              {i+1+"."+chapters.title}  
                          </div>
                          <div >
                            <UnlockOutlined className='text-2xl border rounded-full p-1'/>
                          </div> 
                        </Flex>
                      </Card> :
                      <Card key={chapters._id} className='font-semibold my-1 hover:bg-slate-100 cursor-pointer'> 
                      <Flex justify={'space-between'} align={'center'}>
                      <div className='text-lg text-black'>
                          {i+1+"."+chapters.title}  
                      </div>
                      <div >
                        <LockOutlined className='text-2xl border rounded-full p-1'/>   
                      </div> 
                    </Flex>
                    </Card>)}
                  </>
                  )}
                {completedChapters.includes(course[course.length-1]._id) && <Flex className='mt-4' justify='end' align='center'>
                  <div className='mx-2 font-bold text-green-700 text-xl'>
                      Congratulations !!
                  </div>
                    <Congrates/>
                </Flex>}
                </Card>
                </div>   
            </div>
          : ( !loading && <div className='my-8 sm:h-96 animate-fade-right'>
          <img className='h-72 ' src="https://img.freepik.com/free-vector/order-paying-contactless-payment-by-credit-card-order-basket-laptop-bank-card-male-online-customer-with-tablet-cartoon-character_335657-2563.jpg" alt="" />
          <p>My course cart is feeling pretty lonely.</p>
          <div className='flex justify-center mt-4 mb-2'>
            <Button type='primary' style={{backgroundColor :'blue'}} className={'animate-pulse border font-poppins'}>
                Purchase our course now
            </Button>
          </div>
        </div>)}
        </section>:
         <Classroom chapter={classroomChapter} chapterIndex={chapterIndex} goBack={()=>setClassroomChapter({})} handleChapterComplete={handleChapterComplete}/> }
        <Footer/>
      </div>
    </div>

  )
}

export default Mycourse
