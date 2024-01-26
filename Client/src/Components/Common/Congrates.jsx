import React, { useState } from 'react';
import { Button, Flex, Modal } from 'antd';
import userAxios from '../../Axios/Useraxios';
import toast from 'react-hot-toast';
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosInstance = userAxios()
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchCertificate=async()=>{
    try {
        const response = await axiosInstance.get('/generatecertificate', {
            responseType: 'blob', // Tell Axios to expect a binary blob response
        });
        
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        window.open(pdfUrl, '_blank');
    } catch (error) {
         console.log(error);
         toast.error(error.message)  
    }
  }
  return (
    <>
      <Button className='bg-green-500 text-white' type="primary" onClick={showModal}>
           Click here
      </Button>
      <Modal
        title=""
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Set footer to null to remove OK and Cancel buttons
        >
        <Flex justify='center'>
            <img
            width="100%"
            height="64"
            src="https://cdn.dribbble.com/users/4358240/screenshots/14825308/media/84f51703b2bfc69f7e8bb066897e26e0.gif"
            alt="external-graduation-education-2-kmg-design-flat-kmg-design"
            />
        </Flex>
            <div className='text-center font-poppins text-xl my-2'>Congratulations on Your Achievement!</div>
            <div className='text-center font-poppins'>Your Certificate Awaits - <span className='underline text-blue-600 cursor-pointer' onClick={()=>fetchCertificate()}>Download Now!</span></div>
        </Modal>
    </>
  );
};
export default App;