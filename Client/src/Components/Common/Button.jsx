import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ className, text ,action}) => {
  const navigate = useNavigate()
  return <div className={className} onClick={()=>navigate(action)}>{text}</div>;
};

export default Button;