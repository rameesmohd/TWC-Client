import React, { useState } from 'react';
import { Button, Modal ,Input, Flex, message} from 'antd';
import {CopyOutlined} from '@ant-design/icons'

const UsdtPayModal = ({open,setOpen,amount}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [address, setAddress] = useState('TMxsxcRohW8wGPwW14mZXsBaQYYnQJ21cA');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    message.success('Address copied to clipboard');
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="Pay with USDT"
        open={open}
        onOk={handleOk}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
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
          <p>TRX</p>
        </Flex>
        <Flex align='center'>
          <p className=''>Address:</p>
          <Input readOnly className='rounded-lg mx-2' value={address}  style={{ border: 'none', boxShadow: 'none' }}/>
          <Button icon={<CopyOutlined />} onClick={copyToClipboard}/>
        </Flex>
      </Modal>
    </>
  );
};

export default UsdtPayModal
