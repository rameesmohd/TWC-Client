import { Spinner } from "@material-tailwind/react";
import { Formik } from "formik";
import React, { Suspense, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAxios from "../Axios/Useraxios";
import img from '../assets/01 (1).png'
import toast from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux'
import { setUser } from '../Redux/ClientSlice'
import { Flex, Spin } from "antd";
const ForgetPasswordForm = React.lazy(() => import('./ForgetPassForm'));

const Login = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const [forget, setForget] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const axiosInstance = userAxios();

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 animate-fade-right transition-opacity">
      {!forget ? (
        <div className="py-8 px-6 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
            <div className="flex justify-center">
              <Link to="/">
                <img src={img} alt="Company logo" className="w-40" />
              </Link>
            </div>
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mt-4">
              Sign in to your account
            </h2>
            <p className="text-center text-sm text-gray-500 mt-1">
              Welcome back — enter your details to continue
            </p>
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email is required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              if (!values.password) {
                errors.password = 'Password is required';
              } else if (values.password.length < 6) {
                errors.password = 'Password must contain min 6 characters';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setErrMsg('');
              try {
                const response = await axiosInstance.post('/login', {
                  email: values.email,
                  password: values.password,
                });
                const result = response.data.result;
                dispatch(
                  setUser({
                    user_id: result.user_id,
                    user_name: result?.user_name,
                    token: result.token,
                    email: result.email,
                    mobile: result.mobile,
                    is_purchased: result.is_purchased,
                  })
                );
                toast.success('Welcome back!');
                navigate('/my-course');
              } catch (error) {
                const message =
                  error?.response?.data?.message ||
                  'Something went wrong. Please try again.';
                toast.error(message);
                setErrMsg(message);
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
            }) => (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {errMsg.length > 0 && (
                  <div
                    role="alert"
                    className="border border-red-300 text-red-800 bg-red-50 text-sm p-3 rounded-md flex items-start gap-2 animate-fade-down"
                  >
                    <IoWarningOutline className="text-lg mt-0.5 flex-shrink-0" />
                    <p>{errMsg}</p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      disabled={isSubmitting}
                      aria-invalid={!!(errors.email && touched.email)}
                      aria-describedby="email-error"
                      className={`block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset
                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                        disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors
                        ${errors.email && touched.email ? 'ring-red-400' : 'ring-gray-300'}`}
                    />
                    {errors.email && touched.email && (
                      <p id="email-error" className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setForget(true)}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      disabled={isSubmitting}
                      aria-invalid={!!(errors.password && touched.password)}
                      aria-describedby="password-error"
                      className={`block w-full rounded-md border-0 py-1.5 pl-2.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset
                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                        disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors
                        ${errors.password && touched.password ? 'ring-red-400' : 'ring-gray-300'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                    </button>
                    {errors.password && touched.password && (
                      <p id="password-error" className="text-xs text-red-500 mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
                      leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                      focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed
                      transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="h-4 w-4" /> Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>
              </form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 mx-2 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      ) : (
        <Suspense fallback={<Flex justify="center" className="py-20"><Spin size="large" /></Flex>}>
          <ForgetPasswordForm setForget={setForget} />
        </Suspense>
      )}
    </div>
  );
};

export default Login;