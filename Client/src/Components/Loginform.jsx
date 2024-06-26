import { Spinner } from "@material-tailwind/react";
import { Formik } from "formik";
import React, { Suspense, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAxios from "../Axios/Useraxios";
import img from '../assets/01 (1).png'
import toast from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";
import { useDispatch} from 'react-redux'
import { setUser } from '../Redux/ClientSlice'
import { Flex, Spin } from "antd";
const ForgetPasswordForm = React.lazy(() => import('./ForgetPassForm'));

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const Login = () => {
  const navigate = useNavigate()
  const [errMsg,setErrMsg] = useState('')
  const [forget,setForget]=useState(false)
  const dispatch = useDispatch()
  const axiosInstance = userAxios()
  const [otpState,setOtpState]=useState('')
  const [enterOtp,setEnterOtp] = useState(false)

  return (
    <>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 animate-fade-right transition-opacity ">
    {!forget ?
      <div className="py-8 px-6 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
        <div className="flex justify-center">
          <Link to="/">
             <img src={img} alt="" className="w-40" />
          </Link>
        </div>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         setErrMsg('')
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
       onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await axiosInstance.post("/login", {
            email: values.email,
            password: values.password
          });
          const result = response.data.result
          console.log(result);
          dispatch(setUser({
              user_id : result.user_id,
              user_name : result?.user_name,
              token : result.token,
              email : result.email,
              mobile : result.mobile,
              is_purchased : result.is_purchased
          }))
          navigate('/my-course');
        } catch (error) {
          toast.error(error.response.data.message)
          setErrMsg(error.response.data.message)
        } finally {
          setSubmitting(false);
        }
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
        <form className="space-y-6" onSubmit={handleSubmit}>
          {errMsg.length>0 && <div className="border border-red-600 text-red-800 bg-red-200 text-sm p-2 flex justify-start">
            <div className="flex items-center"> 
              <IoWarningOutline className="text-xl "/>
              <p className="mx-2">{errMsg}</p>
            </div>
          </div>}
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
              <div className="text-sm">
                <a
                  onClick={()=>setForget(true)}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
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
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner/> : 'Sign in'}
            </button>
          </div>
        </form>
        )}
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            to={"/signup"}
            className="font-semibold leading-6 text-indigo-600 mx-2 hover:text-indigo-500"
          >
            Create an account
          </Link>
        </p>
      </div>
      : 
      <React.Suspense fallback={<Flex justify='center'><Spin size={'lg'}/></Flex>}>
          <ForgetPasswordForm setForget={setForget}/>
      </React.Suspense>
    }
    </div> 
    </>
  );
};

export default Login;