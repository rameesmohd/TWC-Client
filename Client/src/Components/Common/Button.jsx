import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ className, text ,action}) => {
  return <div className={className} onClick={action}>{text}</div>;
};

export default Button;