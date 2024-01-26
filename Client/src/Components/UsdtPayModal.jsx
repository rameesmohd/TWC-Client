import React, { useState } from 'react';
import { Button, Modal ,Input, Flex, message, notification} from 'antd';
import {CopyOutlined, SmileOutlined, WarningOutlined} from '@ant-design/icons'
import UploadFile from '../Components/Common/Uploadfile'
import userAxios from '../Axios/Useraxios';

const UsdtPayModal = ({open,setOpen,amount}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [address, setAddress] = useState('TMxsxcRohW8wGPwW14mZXsBaQYYnQJ21cA');
  const [uploadedFile,setUploadedFile]=useState([])

  const axiosInstance = userAxios()
  const [api, contextHolder] = notification.useNotification();
  
  const openNotification = () => {
    api.open({
      message: 'Success' ,
      duration: 0,
      description: 'Please check the trasanction history for the status.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(async() => {
      try {
        const formData = {
         screenshot :  uploadedFile.originFileObj,
         amount : amount
        }
        const response = await axiosInstance.put('/order?method=usdt',formData, { headers: { 'Content-Type':'multipart/form-data' }})
        openNotification()
        console.log('API Response:', response.data);
      } catch (error) {
        toast.error(error.message)
        console.error('API Error:', error);
      } finally {
        setOpen(false);
        setConfirmLoading(false);
      }
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    message.success('Address copied to clipboard');
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Pay with USDT"
        open={open}
        onOk={handleOk}
        okText="Submit" 
        okButtonProps={
          {...(Object.keys(uploadedFile).length
            ? { style: { backgroundColor: 'blue', color: 'white' } }
            : { style: { backgroundColor: '#dbdbdb', color: '#868786' }, disabled: true }
          )}}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className='flex justify-center my-2'>
          <img src="https://switch2voip.us/wp-content/uploads/2021/07/Buy-VoIP-with-USDT-Tether-TRC20-wallet.png" alt="" />
        </div>
        <Flex align='center' justify='space-between' className='my-8'>
          <p className=''>Amount:</p>
          <p className='font-bold'>${amount}</p>
        </Flex>
        <Flex align='center' justify='space-between' className='my-8'>
          <p className=''>Network:</p>
          <p style={{ border: 'none', boxShadow: 'none' ,fontWeight : 'bold'}}>TRC 20</p>
        </Flex>
        <Flex align='center'>
          <p className=''>Address:</p>
          <Input readOnly className='rounded-lg mx-2' value={address}  style={{ border: 'none', boxShadow: 'none' ,fontWeight : 'bold'}}/>
          <Button icon={<CopyOutlined />} onClick={copyToClipboard}/>
        </Flex>
        <div className='w-full bg-red-100 border border-red-400 rounded p-4 my-2'>
                <p>
                  <WarningOutlined className='text-red-600 mx-1'/>
                  Please remit the exact amount to our 
                  designated USDT Address and proceed to 
                  upload the corresponding transaction screenshot. 
                  Upon successful verification,
                  you will gain access to our exclusive course content.
                </p>
                <div className='my-2'>
                    <UploadFile danger={true} setUploadedFile={setUploadedFile}/> 
                </div>
          </div>
      </Modal>
    </>
  );
};

export default UsdtPayModal
