import { Spinner } from "@material-tailwind/react";
import { Formik } from "formik";
import React, { useState } from "react";
import img from '../../assets/01 (1).png'
import Adminaxios from '../../Axios/Adminaxios'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {setTemp ,setUser} from '../../Redux/AdminSclice'
const OTPVerification = React.lazy(() => import( "../../Components/Admin/EmailOtpVerification"));

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const Login = () => {
  const [otpState,setOtpState]=useState('')
  const [enterOtp,setEnterOtp] = useState(false)
  const [email,setEmail] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const axiosInstance = Adminaxios()
  
  const redirectFunc=()=>{
    const data = useSelector((store)=>store.Admin.tempStore)
    console.log('Redux Store:', store);
    console.log(data,'temporary stored data');
    dispatch(setUser(data.token))
    navigate('/twc/admin/users')
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6  lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
      <div className="flex justify-center">
      <img src={img} alt="" className="w-32" />
      </div>
    </div>
    { !enterOtp ?
    <Formik
     initialValues={{ email: '', password: '' }}
     validate={values => {
       const errors = {};
       if (!values.email) {
         errors.email = 'Required';
       } else if (
         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
       ) {
         errors.email = 'Invalid email address';
       }
       if (values.password.length < 6) {
        errors.password = "Password must contain min 6 characters";
      }
       return errors;
     }}
     onSubmit={ async (values, {setSubmitting}) => {
      try {
        const newOtp = generateOTP()
        setOtpState(newOtp)
        const response = await axiosInstance.post("/login", {
          email: values.email,
          password: values.password,
          OTP : newOtp
        });
        setEmail(values.email)
        dispatch(setTemp(response.data))
        console.log("Server response:", response.data);
        setEnterOtp(true)
      } catch (error) {
        toast.error(error.response.data.message)
        toast.error(error.message)
        console.error("Error:", error.message);
      } finally {
        setSubmitting(false);
      }
       setTimeout(() => {
         alert(JSON.stringify(values, null, 2));
         setSubmitting(false);
       }, 400);
     }}
   >
     {({
       values,
       errors,
       touched,
       handleChange,
       handleBlur,
       handleSubmit,
       isSubmitting,
       /* and other goodies */
     }) => (
    <div className="relative flex  flex-col justify-center overflow-hidden  sm:py-12">
    <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
      <div className="mx-auto flex w-full max-w-md flex-col space-y-16 sm:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="font-semibold text-3xl">
            <p>Admin Panel</p>
          </div>
        </div>
        <div>
        <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            for="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              required
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
             {
                  <p className="text-xs  text-red-500">
                    {errors.email && touched.email && errors.email}{" "}
                  </p>
             }
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              for="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
           
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              required
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
              {
                <p className="text-xs  text-red-500">
                  {errors.password && touched.password && errors.password}
                </p>
              }
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center mb-10 rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner/> : 'Sign in'}
          </button>
        </div>
      </form>
      </div>
      </div>
      </div>
      </div>
      )}
    </Formik> : <OTPVerification otp={otpState} setOtp={setOtpState} verify={redirectFunc} generateOTP={generateOTP} email={email}/> }      
    </div> 
  );
};

export default Login;