import { Button, Card, Col, Flex, Row } from 'antd';
import  Navbar  from '../../Components/Common/Navbar';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined, LeftOutlined, LockOutlined, RightOutlined } from '@ant-design/icons';

const Classroom = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const {chapters} = location.state;
    console.log(chapters );
  return (
    <>
    <Navbar/>
    <div className='w-full  bg-slate-50 h-screen'>
    <div className='container mx-auto pt-28 h-full '>
        <div className='w-full my-2'>
        <ArrowLeftOutlined className='border rounded-full p-1 text-2xl'/>
        </div>
        <div className='sm:grid grid-cols-6'>
            <div className='col-span-4'>
                <div className='w-full sm:p-4'>
                <iframe 
                src="https://player.vimeo.com/video/903206777?h=c7d2f4597a" 
                width="100%" height="564" 
                frameborder="0" 
                allow="autoplay; fullscreen" 
                allowfullscreen></iframe>
                </div>
                <Flex justify='space-between' className='px-4'>
                <Button icon={<LeftOutlined />} align="center" size='large' style={{ width: '50px' ,backgroundColor : 'black' ,color : 'white'}}/>          
                <Button icon={<RightOutlined />} align="center" size='large' style={{ width: '50px' ,backgroundColor : 'black' ,color : 'white'}}/>
                </Flex>
            </div>
            <div className='col-span-2 '>
            {chapters.lessons.map((lesson,i)=>
                <Card className='my-2'>
                    <div className=" absolute text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <LockOutlined className="text-5xl" />
                    </div>
                    <Flex className='opacity-40'>
                        <iframe src={`${lesson.lessonVideoUrl}&controls=0`}></iframe>
                        <div>1.1 What is Trading</div>
                    </Flex>
                </Card>  
            )}
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Classroom
