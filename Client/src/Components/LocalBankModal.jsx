import React, { useEffect, useState } from 'react';
import { Button, Collapse, Flex, message, Modal ,notification } from 'antd';
import { BankOutlined, CopyOutlined, WarningOutlined } from '@ant-design/icons';
import { PiCurrencyInr } from "react-icons/pi";
import Uploadfile from '../Components/Common/Uploadfile'
import userAxios from '../Axios/Useraxios'
import {toast} from 'react-hot-toast'
import { SmileOutlined } from '@ant-design/icons';
import UpiScanner from '../assets/photo_2025-08-12_11-34-03.jpg'

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

  const UpiId = '0799289a0220872.bqr@kotak';
  const BankDetails = [
    { label: "Bank name", value: "Kotak Bank" },
    { label: "Name", value: "FourCapedu" },
    { label: "Account no.", value: "7450489300" },
    { label: "IFSC", value: "KKBK0009289" },
    { label: "Branch", value: "Palarivattom,Kochi" },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success("Copied to Clipboard");
    });
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
                <div className="bg-slate-50 border p-1 px-2">
                    {BankDetails.map((item) => (
                      <Flex key={item.label} justify="space-between" align="center">
                        <div>{item.label}</div>
                        <Flex align="center" gap={4}>
                          <div>{item.value}</div>
                          <CopyOutlined
                            onClick={() => handleCopy(item.value)}
                            style={{ cursor: 'pointer', color: '#1890ff' }}
                          />
                        </Flex>
                      </Flex>
                    ))}
                  </div>
                  <div className='mt-4'>
                    <Uploadfile setUploadedFile={setUploadedFile}/> 
                </div>
              </>,
            },
            
          ]}
          className='my-4'
        />
        <Collapse
          size="large"
          items={[
            {
              key: '2',
              label: 'UPI Details',
              children: 
              <>
                <div className='bg-slate-50 border p-1 px-2'>
                    <Flex justify='space-between'>
                      <img src={UpiScanner} alt="" />
                    </Flex>
                    <Flex justify="center" align="center" gap={8}>
                      <div>{UpiId}</div>
                      <CopyOutlined
                        onClick={()=>handleCopy(UpiId)}
                        style={{ cursor: 'pointer', color: '#1890ff' }}
                      />
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
