import { Button, Card, Col, Flex, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { ArrowLeftOutlined, CheckCircleOutlined, LeftOutlined, LockOutlined, RightOutlined } from '@ant-design/icons';

const Classroom = ({chapter,goBack,chapterIndex,handleChapterComplete}) => {
    const [selectedLessonIndex,setSelectedLessonIndex]=useState(0)
    const [selectedLesson,setSelectedLesson]=useState(chapter.lessons[selectedLessonIndex])
    const [ifromeLoading,setIframeLoading]=useState({
        main : true,
        list : true
    })
    const handleSelectLesson=(lesson ,index)=>{
        setSelectedLessonIndex(index)
        setIframeLoading({...ifromeLoading , main : true})
        setSelectedLesson(lesson)
    }

    const handleNext =()=>{
        setSelectedLessonIndex(selectedLessonIndex+1) 
    }
    const handlePrev=()=>{
        setSelectedLessonIndex(selectedLessonIndex != 0 ? selectedLessonIndex-1 : selectedLessonIndex) 
    }

    useEffect(()=>{
        setSelectedLesson(chapter.lessons[selectedLessonIndex])
    },[selectedLessonIndex])
  return (
    <>
        <div className='w-full my-2 flex animate-fade-left'>
        <ArrowLeftOutlined onClick={()=>goBack()} className='border rounded-full p-1 text-2xl'/>
        <p className='text-lg font-semibold mx-2'>
        {chapterIndex+'.'+chapter.title}
        </p>
        </div>
        <div className='sm:grid grid-cols-8 animate-fade-right sm:mb-8'>
            <div className='col-span-6'>
                <div className='w-full sm:p-4'>
                <div style={{ position: 'relative' }}>
                        { ifromeLoading.main && (
                            <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: 'rgba(255, 255, 255, 0.8)', 
                            }}
                            >
                            <Spin size='large' />
                            </div>
                        )}
                   <video
                    className='w-full h-72 md:h-[564px]'
                    src={selectedLesson?.lessonVideoUrl}
                    controls
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    onLoadedData={() => setIframeLoading({ ...ifromeLoading, main: false })}
                    >
                    Your browser does not support the video tag.
                    </video>

                    </div>
                </div>
                <Flex justify='space-between' className='px-4 pb-4'>
                        <Button onClick={handlePrev} icon={<LeftOutlined />} align="center" size='large' style={{ width: '50px' ,backgroundColor : 'black' ,color : 'white'}}/>          
                    { 
                        selectedLesson?._id != chapter.lessons[chapter.lessons.length-1]?._id &&
                        <Button onClick={handleNext} icon={<RightOutlined />} align="center" size='large' style={{ width: '50px' ,backgroundColor : 'black' ,color : 'white'}}/> 
                    }
                    {
                         selectedLesson?._id === chapter.lessons[chapter.lessons.length-1]?._id &&
                        <Button onClick={handleChapterComplete} icon={<CheckCircleOutlined />} align="center" size='large' style={{ backgroundColor : 'black' ,color : 'white'}}>Completed</Button>
                    }
                </Flex>
            </div>
            <div className='col-span-2 '>
            {chapter.lessons.map((lesson,i)=>
                <Card onClick={()=>handleSelectLesson(lesson,i)} className={`animate-flip-up mb-1 ${selectedLesson._id === lesson._id && 'bg-slate-300'}`} hoverable>
                   <div style={{ position: 'relative' }}>
                        {ifromeLoading.list && (
                            <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: 'rgba(255, 255, 255, 0.8)', 
                            }}
                            >
                            <Spin size='large' />
                            </div>
                        )}
                        <video
                        width="100%"
                        height="auto"
                        controls
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        src={lesson.lessonVideoUrl}
                            onLoadedData={() => setIframeLoading({...ifromeLoading , list : false})}
                        />
                        <div className='font-semibold mx-4'>
                            {chapterIndex + '.' + (i + 1) + ' ' + chapter.title}
                        </div>
                    </div>
                </Card>  
            )}
            </div>
        </div>
    </>
  )
}

export default Classroom
