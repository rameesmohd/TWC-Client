import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import img from '../assets/01 (1).png'
import { Spinner } from "@material-tailwind/react";
import toast from "react-hot-toast";
import Useraxios from "../Axios/Useraxios";
import OTP from "../Components/Common/OTP"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const getPasswordStrength = (pw) => {
  if (!pw) return { label: '', score: 0 };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  return { label: labels[Math.max(score - 1, 0)], score };
};

const App = () => {
  const navigate = useNavigate();
  const axiosInstance = Useraxios();
  const [otpState, setOtpState] = useState('');
  const [enterOtp, setEnterOtp] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const approveSignup = async () => {
    try {
      await axiosInstance.post("/signup", formData);
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
      console.error("Error:", message);
    }
  };

  return (
    <div className="px-6 lg:px-8 flex min-h-full flex-col justify-center py-12 animate-fade-right transition-opacity">
      {!enterOtp ? (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm p-4 rounded-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-28 w-32" src={img} alt="Your Company" />
            <h2 className="text-center text-base font-semibold leading-9 tracking-tight text-gray-900">
              Create new account
            </h2>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mt-2 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-semibold">1</span>
                <span className="text-xs text-gray-700 font-medium">Details</span>
              </div>
              <div className="w-8 h-px bg-gray-300" />
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 text-xs flex items-center justify-center font-semibold">2</span>
                <span className="text-xs text-gray-400">Verify</span>
              </div>
            </div>
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmpass: "",
              mobile: "",
              name: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Required";
              } else if (values.password.length < 6) {
                errors.password = "Password must contain at least 6 characters";
              }

              if (!values.confirmpass) {
                errors.confirmpass = "Required";
              } else if (values.confirmpass !== values.password) {
                errors.confirmpass = "Passwords do not match";
              }

              if (!values.mobile) {
                errors.mobile = "Mobile number is required";
              } else if (!/^\d{10}$/.test(values.mobile)) {
                errors.mobile = "Mobile number must be exactly 10 digits";
              }

              if (!values.name) {
                errors.name = "Required";
              } else if (values.name.trim().length < 3) {
                errors.name = "Name must have at least 3 characters";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const newOtp = generateOTP();
                setOtpState(newOtp);
                setFormData({
                  email: values.email,
                  password: values.password,
                  mobile: values.mobile,
                  name: values.name,
                });
                await axiosInstance.post("/send-otp", {
                  email: values.email,
                  OTP: newOtp,
                });
                toast.success("OTP sent to your email");
                setEnterOtp(true);
              } catch (error) {
                const message = error?.response?.data?.message || "Couldn't send OTP. Please try again.";
                toast.error(message);
                console.error("Error:", message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
              const strength = getPasswordStrength(values.password);
              const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];

              return (
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  noValidate
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        disabled={isSubmitting}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className={`block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset
                          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                          disabled:bg-gray-100 transition-colors
                          ${errors.name && touched.name ? 'ring-red-400' : 'ring-gray-300'}`}
                      />
                      {errors.name && touched.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        disabled={isSubmitting}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={`block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset
                          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                          disabled:bg-gray-100 transition-colors
                          ${errors.email && touched.email ? 'ring-red-400' : 'ring-gray-300'}`}
                      />
                      {errors.email && touched.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                      Mobile number
                    </label>
                    <div className="mt-1">
                      <input
                        id="mobile"
                        name="mobile"
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        autoComplete="tel"
                        disabled={isSubmitting}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, '');
                          handleChange({ target: { name: 'mobile', value: digitsOnly } });
                        }}
                        onBlur={handleBlur}
                        value={values.mobile}
                        className={`block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset
                          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                          disabled:bg-gray-100 transition-colors
                          ${errors.mobile && touched.mobile ? 'ring-red-400' : 'ring-gray-300'}`}
                      />
                      {errors.mobile && touched.mobile && (
                        <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={`block w-full rounded-md border-0 py-1.5 pl-2.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset
                          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                          disabled:bg-gray-100 transition-colors
                          ${errors.password && touched.password ? 'ring-red-400' : 'ring-gray-300'}`}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <AiOutlineEyeInvisible size={16} /> : <AiOutlineEye size={16} />}
                      </button>
                    </div>
                    {values.password && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex gap-1 flex-1">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full ${
                                i < strength.score ? strengthColors[strength.score - 1] : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{strength.label}</span>
                      </div>
                    )}
                    {errors.password && touched.password && (
                      <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmpass" className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="confirmpass"
                        name="confirmpass"
                        type={showConfirm ? 'text' : 'password'}
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmpass}
                        className={`block w-full rounded-md border-0 py-1.5 pl-2.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset
                          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                          disabled:bg-gray-100 transition-colors
                          ${errors.confirmpass && touched.confirmpass ? 'ring-red-400' : 'ring-gray-300'}`}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowConfirm((s) => !s)}
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirm ? <AiOutlineEyeInvisible size={16} /> : <AiOutlineEye size={16} />}
                      </button>
                    </div>
                    {errors.confirmpass && touched.confirmpass && (
                      <p className="text-xs text-red-500 mt-1">{errors.confirmpass}</p>
                    )}
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
                          <Spinner className="h-4 w-4" /> Sending OTP...
                        </>
                      ) : (
                        'Sign up'
                      )}
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 mx-2 hover:text-indigo-500">
              Sign In
            </Link>
          </p>
        </div>
      ) : (
        <OTP verified={approveSignup} otp={otpState} setOtp={setOtpState} />
      )}
    </div>
  );
};

export default App;