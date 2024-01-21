import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import adminAxios from '../../Axios/Adminaxios';
import toast from 'react-hot-toast';

const LessonModal = ({chapterId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [videoUrl,setVideoUrl]=useState('')
  const axiosInstance = adminAxios()

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk=async()=> {
    setConfirmLoading(true);
    try {
      await axiosInstance.post('/lesson',{videoUrl,chapterId})
      toast.success('Lesson created successfully');
    } catch (error) {
      console.error('Error creating chapter:',error);
      toast.error(error.message);
      if (error.response && error.response.status === 400) {
        console.log('Validation errors:', error.response.data);
      }
    }finally{
      setIsModalOpen(false);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <PlusOutlined  className='mx-2 hover:scale-105 cursor-pointer'  onClick={showModal}/>
      <Modal 
      title="Add Lesson Video" 
      open={isModalOpen} 
      okButtonProps={{ style: { background: 'blue' } }}
      onOk={handleOk} 
      onCancel={handleCancel} 
      >
      <Input 
          className='rounded-md' 
          onChange={(e)=>setVideoUrl(e.target.value)} 
          placeholder={'Paste video url'}/>
      </Modal>
    </>
  );
};
export default LessonModal;