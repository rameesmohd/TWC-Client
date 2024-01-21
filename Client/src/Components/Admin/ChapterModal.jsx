import React, { useState } from 'react';
import { Button, Modal ,Input } from 'antd';
const ChapterModal = ({role,handleOk,open,handleCancel,loading,setTitle,placeholder}) => {
    return (
      <>
        <Modal
          open={open}
          title="Title"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
              <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
              style={{ backgroundColor: 'blue' }}
          >
          {!role ? 'Add' : 'Update'}
        </Button>
          ]}
        >
        <Input 
          className='rounded-md' 
          onChange={(e)=>setTitle(e.target.value)} 
          placeholder={placeholder ? placeholder : 'Enter the title '}/>
        </Modal>
      </>
    );
};
export default ChapterModal;