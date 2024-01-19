import React from 'react';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';

const Dropdownbtn = ({items,loading,handleSelect}) => {
  const handleMenuClick = (e) => {
    // message.info('Click on menu item.');
    console.log('click', e);
    handleSelect(e.key)
  };

  const menuProps = {
      items,
      onClick: handleMenuClick,
  };
      
  return (
    <div>
    <Dropdown.Button
      menu={menuProps}
      buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title="" key="leftButton">
          {leftButton}
        </Tooltip>,
        React.cloneElement(rightButton, {
          loading: loading,
        }),
      ]}
    >
      Filter
    </Dropdown.Button>
    </div>
  )
}

export default Dropdownbtn
