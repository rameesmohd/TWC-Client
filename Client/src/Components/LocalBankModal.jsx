import React, { useEffect, useState } from 'react';
import { Button, Collapse, Flex, Modal ,notification } from 'antd';
import { BankOutlined, WarningOutlined } from '@ant-design/icons';
import { PiCurrencyInr } from "react-icons/pi";
import Uploadfile from '../Components/Common/Uploadfile'
import userAxios from '../Axios/Useraxios'
import {toast} from 'react-hot-toast'
import { SmileOutlined } from '@ant-design/icons';

const LocalBankModal = ({open,setOpen,amount}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [uploadedFile,setUploadedFile]=useState({})
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
        const response = await axiosInstance.post('/order?method=localbank',formData, { headers: { 'Content-Type':'multipart/form-data' }})
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

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={<><BankOutlined className='mr-2' style={{fontSize : '24px'}} /> Local Bank Transfer </>}
        open={open}
        okText="Submit" 
        okButtonProps={
          {...(Object.keys(uploadedFile).length
            ? { style: { backgroundColor: 'blue', color: 'white' } }
            : { style: { backgroundColor: '#dbdbdb', color: '#868786' }, disabled: true }
          )}}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
      <div className='font-poppins'>We accept</div>
        <div className='px-12'>
          <img src="https://tourapna.com/wp-content/uploads/2020/09/payment-method-upi-imps-rtgs-neft.jpg" alt="" />
        </div>
        <p className='flex items-center text-lg'>Total : <PiCurrencyInr />{amount}<span className='text-sm mx-2'>(Including GST)</span></p>
        <div className='my-2 flex'> 
          <div className='w-full bg-red-100 border border-red-400 rounded p-4'>
                <p>
                  <WarningOutlined className='text-red-600 mx-1'/>
                  Please remit the exact amount to our 
                  designated bank account and proceed to 
                  upload the corresponding transaction screenshot. 
                  Upon successful verification,
                  you will gain access to our exclusive course content.
                </p>
          </div>
        </div>
        <Collapse
          size="large"
          items={[
            {
              key: '1',
              label: 'Account Details',
              children: 
              <>
                <div className='bg-slate-50 border p-1 px-2'>
                    <Flex justify='space-between'>
                      <div>Bank name</div>
                      <div>Federal Bank</div>
                    </Flex>
                    <Flex justify='space-between'>
                      <div>Account no.</div>
                      <div>12345678</div>
                    </Flex>
                    <Flex justify='space-between'>
                      <div>IFSC</div>
                      <div>FDRL001120</div>
                    </Flex>
                    <Flex justify='space-between'>
                      <div>Branch</div>
                      <div>Ernamkulam</div>
                    </Flex>
                </div>
                <div className='mt-4'>
                <Uploadfile setUploadedFile={setUploadedFile}/> 
                </div>
              </>,
            },
            
          ]}
          className='my-4'
        />
      </Modal>
    </>
  );
};
export default LocalBankModal
