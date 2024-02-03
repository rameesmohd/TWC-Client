import React, { useEffect, useState } from 'react';
import { Button, Modal ,Input, Flex, message} from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios'
import userAxios from '../Axios/Useraxios';
import toast from 'react-hot-toast';

const PhonePay = ({open,setOpen,amount}) => {
  const email = useSelector((store)=>store.Client.email)
  const user_id = useSelector((store)=>store.Client.user_id)
  const [formData,setFormData]=useState({email , amount ,user_id})
  const axiosInstance = userAxios()
  const userAPI = import.meta.env.VITE_USER_API

  const handleSubmit=async()=>{
    await axiosInstance.post(`${userAPI}/phonepay/payment`,{
          data : formData
        }).then((response)=>{
          console.log(response.data , 'response');
          window.location.href = response.data
        }).catch((error)=>{
          console.log(error);
          toast.error(error.message)
        })
    }

  useEffect(()=>{
    handleSubmit()
  },[])

  return (
    <>
    </>
  );
};

export default PhonePay
