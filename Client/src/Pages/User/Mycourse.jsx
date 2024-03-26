import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import {Button, Card, Flex} from 'antd'
import userAxios from '../../Axios/Useraxios'
import {toast} from 'react-hot-toast'
import {CheckOutlined, LockOutlined, UnlockOutlined  } from '@ant-design/icons'
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import Classroom from './Classroom'
import Congrates from '../../Components/Common/Congrates'
import { Progress } from 'antd';
import { useNavigate } from 'react-router-dom'
import { setCourseData } from '../../Redux/ClientSlice'
import { setFullData } from '../../Redux/CourseSlice'
import {logout} from '../../Redux/ClientSlice'

const Mycourse = () => {
  const [ course,setCourse ]=useState([])
  const [loading,setLoading ] = useState(true)
  const [classroomChapter,setClassroomChapter]=useState({})
  const [chapterIndex,setChapterIndex]=useState('')  
  const [progress,setProgress]=useState(0)
  const axiosInstance = userAxios()
  const dispatch = useDispatch()
  const completedChapters = useSelector((store)=>store.Client.completed_chapters)
  const course_data = useSelector((store)=>store.Course.course_data)
  const userId = useSelector((state)=>state.Client.user_id)
  const navigate = useNavigate()

  const signout=async()=>{
    await axiosInstance.patch('/logout',{id : userId})
    dispatch(logout())
  }

  console.log(course_data);
  const fetchCourseData=async()=>{
      try {
          setLoading(true)
          const response = await axiosInstance.get('/course')
          if(response.data.result && response.data.result.length){
            setCourse(response.data.result)
            dispatch(setCourseData({
              is_purchased : response.data.user.is_purchased,
              completed_chapters : response.data.user.completed_chapters 
            }))
            dispatch(setFullData(response.data.result))
          }
          setLoading(false)
      } catch (error) {
        toast.error(error.message)
        console.log(error);
        setLoading(false)
        signout()
      } 
  }

  const handleChapterComplete=async()=>{
      try {
        if(classroomChapter.title == 'Introduction'){
          setClassroomChapter({})
          return
        }
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
    return Math.floor((completedChapters.length/course.length)*100)
  }
  
  useEffect(()=>{
    if(course_data.length==0) {
      fetchCourseData()
    }else {
      console.log('course : ', course);
      setCourse(course_data)
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
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
           <>
            <div className='flex w-full min-h-[500px] animate-fade-right'>
                 <div className=' h-full md:w-2/3'>
                <Card onClick={()=>{setClassroomChapter({_id:'0129201',title : 'Introduction',lessons : [{lessonVideoUrl : 'https://player.vimeo.com/video/922543030?h=ae4282b8ad&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479' ,_id : '3425163723'}]})}} className='font-semibold my-1 bg-slate-300 hover:bg-slate-200 cursor-pointer'> 
                      <Flex justify={'space-between'} align={'center'}>
                        <div className='text-lg text-black'>
                            {'Introduction'}  
                        </div>
                      </Flex>
                </Card>
                 <Card className='bg-slate-300' title={<h3 style={{ fontSize: '20px',color : 'black' }}>Mastering Trading Essentials</h3>}>
                 <Progress percent={progress} />
                  { course.map((chapters,i)=>
                  <div key={chapters._id}>
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
                  </div>
                  )}
                {completedChapters.includes(course[course.length-1]._id) && <Flex className='mt-4' justify='end' align='center'>
                  <div className='mx-2 font-bold text-green-700 text-xl'>
                      Congratulations !!
                  </div>
                    <Congrates/>
                </Flex>}
                </Card>
                </div>  
                <div className='hidden md:block w-1/3'>
                      <img src="https://ih1.redbubble.net/image.1207220572.5615/st,small,507x507-pad,600x600,f8f8f8.u1.webp" alt="" />
                </div> 
            </div>
           </>
          : ( !loading && <div className='my-8 sm:h-96 animate-fade-right'>
          <img className='h-72 ' src="https://img.freepik.com/free-vector/order-paying-contactless-payment-by-credit-card-order-basket-laptop-bank-card-male-online-customer-with-tablet-cartoon-character_335657-2563.jpg" alt="" />
          <p>My course cart is feeling pretty lonely.</p>
          <div className='flex justify-center mt-4 mb-2'>
            <Button type='primary' onClick={()=>navigate('/checkout')} style={{backgroundColor :'blue'}} className={'animate-pulse border font-poppins'}>
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
