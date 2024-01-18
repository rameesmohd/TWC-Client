import React from "react";

const Button = ({ className, text ,action}) => {
  return <div className={className} onClick={action}>{text}</div>;
};

export default Button;