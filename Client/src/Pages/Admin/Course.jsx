import React, { Suspense, useEffect, useState } from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import { DeleteOutlined, EditOutlined, FileAddOutlined, PlusOutlined } from '@ant-design/icons'
import ChapterModal from '../../Components/Admin/ChapterModal'
import toast from 'react-hot-toast'
import adminAxios from '../../Axios/Adminaxios'
import { Button, Card, Divider, Popconfirm } from 'antd'
import LessonModal from '../../Components/Admin/LessonModal'
import { Spin } from 'antd'

const Course = () => {
  const axiosInstance = adminAxios()
  const [chapters,setChapters]=useState([])
  const [title,setTitle] = useState('')
  const [titleHolder,setTitleholder] = useState('')
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalRole,setModaRole]=useState()
  const [editId,setEditId]= useState()
  const[selectedLesson,setSelectedLesson]=useState({})
  const [iframeLoading, setIframeLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setTitle('')
  };

  const handleModalView=({role,placeholder,id})=>{
    //role 0 for add modal
    //role 1 for edit modal
    setTitleholder(placeholder)
    setEditId(id)
    setModaRole(role)
    showModal()
  }
  
  const fetchChapters =async()=>{
    try {
      const response = await axiosInstance.get('/chapter')
      setChapters(response.data.result)
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const editChapter=async()=>{
    try {
      setLoading(true);
      await axiosInstance.patch('/chapter',{title,id:editId})
      toast.success('Chapter updated successfully');
    } catch (error) {
      console.error('Error editing chapter:', error);
      toast.error(error.response.data.error);
      if (error.response && error.response.status === 400) {
        console.log('Validation errors:', error.response.data);
      }
    } finally {
      fetchChapters()
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 1000);
    }
  } 

  const addChapter=async()=>{
    try {
      setLoading(true);
      await axiosInstance.post('/chapter', { title });
      toast.success('Chapter created successfully');
    } catch (error) {
      console.error('Error creating chapter:', error);
      toast.error(error.response.data.error);
      if (error.response && error.response.status === 400) {
        console.log('Validation errors:', error.response.data);
      }
    } finally {
      fetchChapters()
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 1000);
    }
  }

  const deleteChapter=async(id)=>{
    try {
      await axiosInstance.delete(`/chapter?id=${id}`);
      toast.success('Chapter deleted successfully');
      fetchChapters()
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const deleteLesson=async({chapterId,lessonId})=>{
    try {
      await axiosInstance.delete(`/lesson?chapterId=${chapterId}&lessonId=${lessonId}`);
      toast.success('Chapter deleted successfully');
      fetchChapters()
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  console.log(chapters.lesson);

  useEffect(()=>{
    fetchChapters()
  },[])

  return (
    <div>
      <Sidebar/>
      <div className='pl-16 md:pl-40'>
          <div className='p-2'>
          <Divider orientation="left" style={{fontSize : '30px'}}>Our Course</Divider>
            <div className='grid grid-cols-2 h-full'>
                <div className='col-span-1 border-r p-8 animate-fade-up'>
                  <div className=' flex items-center px-1 justify-between w-2/3'>
                  <p className='font-bold my-2 text-xl'>Chapters</p>
                  <Button onClick={()=>handleModalView(0)}>
                      Add Chapter
                  </Button>
                  </div>
                  { 
                    chapters.map((chapter,index)=>{
                      return (
                        <>
                        <div key={chapter._id} className='w-2/3 h-12 flex justify-between px-4 rounded-t-lg items-center  bg-gray-800 mt-2 text-white font-semibold'>
                          <p>{index+1}. {chapter.title}</p>
                          <div >
                          <EditOutlined onClick={()=>handleModalView({role : 1,placeholder : chapter.title,id : chapter._id})} className='mx-2 hover:scale-105 cursor-pointer'/>
                          <Popconfirm
                              title="Delete the chapter"
                              description="Are you sure delete this chapter?"
                              onConfirm={()=>deleteChapter(chapter._id)}
                              onCancel={'cancel'}
                              okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
                              okText={'Yes'}
                              style={{backgroundColor :'red'}}
                              cancelText="No"
                          >
                          <DeleteOutlined className='mx-2 hover:scale-105 cursor-pointer'/>
			                    </Popconfirm>
                          <LessonModal chapterId={chapter._id}/>
                          </div>
                        </div>
                        {chapter.lessons.map((lesson,i)=>  
                          <div 
                            key={lesson._id} 
                            onClick={()=>{setSelectedLesson(lesson),setIframeLoading(true);}} 
                            className={`w-2/3 h-12 flex ${ chapter.lessons.length===i+1 && 'rounded-b-lg '} ${selectedLesson._id === lesson._id && 'shadow-inner outline-1 outline bg-gray-200'} justify-between px-4 items-center border border-gray-300 text-black font-semibold`}>
                            {index+1}.{i+1} Video 
                          <div>
                          <Popconfirm
                              title="Delete the lesson"
                              description="Are you sure delete this lesson?"
                              onConfirm={()=>deleteLesson({chapterId : chapter._id,lessonId :lesson._id})}
                              onCancel={'cancel'}
                              okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
                              okText={'Yes'}
                              style={{backgroundColor :'red'}}
                              cancelText="No"
                          >
                          <DeleteOutlined className='mx-2 hover:scale-105 cursor-pointer'/>
			                    </Popconfirm>
                          </div>
                        </div>)}
                        </>
                      )
                    })
                  }
                </div>  
                <div className='col-span-1 p-8 animate-fade-up'>
                      <div className='text-3xl my-2 font-bold w-full'>1.1 Video</div>
                     <Card className='border w-full h-96 p-4 bg-slate-50'> 
                      <iframe
                          width='100%'
                          height='294px'
                          src={selectedLesson.lessonVideoUrl}
                          // frameBorder='0'
                          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                          allowFullScreen
                          className='animate-fade-left'
                          onLoad={handleIframeLoad}
                          ></iframe> 
                         {iframeLoading && <Spin tip="Loading" size="large">
                              <div className="content" />
                          </Spin>}
                      </Card>
                </div>
            </div>
          </div>
      </div>
      <ChapterModal 
        handleOk={!modalRole ? addChapter : editChapter}
        showModal={showModal}
        open={open}
        handleCancel={handleCancel}
        loading={loading}
        setTitle={setTitle}
        placeholder={titleHolder}
        role={modalRole}
      />
    </div>
  )
}

export default Course
