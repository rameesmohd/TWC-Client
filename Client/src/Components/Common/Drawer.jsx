import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';

const App = ({Body,btnText,btnClassname}) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const showDefaultDrawer = () => {
    setSize('default');
    setOpen(true);
  };
  const showLargeDrawer = () => {
    setSize('large');
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <Space>
        <Button className={btnClassname} onClick={showLargeDrawer}>
          {btnText}
        </Button> 
      </Space>
      <Drawer
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
      >
       {Body}
      </Drawer>
    </>
  );
};
export default App;