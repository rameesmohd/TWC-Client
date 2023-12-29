import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import img from '../assets/01 (1).png'
import { Spinner } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-16 w-20 "
          src={img}
          alt="Your Company"
        />
        <h2 className="text-center text-base font-bold leading-9 tracking-tight text-gray-900">
          Create new account
        </h2>
      </div>

      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
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
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (values.password.length < 6) {
              errors.password = "Password must contain 6 characters";
            } else if (
              values.confirmpass.length > 0 &&
              values.confirmpass !== values.password
            ) {
              errors.confirmpass = "Password not match";
            }

            if (!values.mobile) {
              errors.mobile = "Mobile number is required";
            } else if (!/^\d+$/.test(values.mobile)) {
              errors.mobile =
                "Invalid mobile number. It must be 10 digits and contain only numbers";
            } else if (!/^\d{10}$/.test(values.mobile)) {
              errors.mobile = "Mobile number must contain only numeric digits";
            }

            if (!values.name ) {
              errors.name = "Required";
            }else if(values.name.length < 3){
              errors.name = "Name must have atleast 3 characters";
            }
            return errors;
          }}

          onSubmit={ async (values, { setSubmitting }) => {
            // try {
            //   const response = await userAxios.post("/signup", {
            //     email: values.email,
            //     password: values.password,
            //     mobile: values.mobile,
            //     name : values.name
            //   });
            //   console.log("Server response:", response.data);
            //   toast.success("Created successfully!")
            //   setTimeout(() => {
            //     setSubmitting(false);
            //     navigate('/login')
            //   }, 500);
            // } catch (error) {
            //   console.error("Error:", error.message);
            // } finally {
            //   setSubmitting(false);
            // }
          } }
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
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission
                handleSubmit(); // Manually call the Formik onSubmit function
              }}
            >
            <div>
            <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                User name
            </label>
            <div className="mt-2">
                <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {
                <p className="text-xs  text-red-500">
                    {" "}
                    {errors.name && touched.name && errors.name}{" "}
                </p>
                }
            </div>
            </div>

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
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
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
            <label
                htmlFor="mobile"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Mobile number
            </label>
            <div className="mt-2">
                <input
                id="mobile"
                name="mobile"
                type="mobile"
                autoComplete="mobile"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobile}
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {
                <p className="text-xs  text-red-500">
                    {errors.mobile && touched.mobile && errors.mobile}{" "}
                </p>
                }
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
            <div className="flex items-center justify-between">
                <label
                htmlFor="confirmpass"
                className="block text-sm font-medium leading-6 text-gray-900"
                >
                Confirm Password
                </label>
            </div>
            <div className="mt-2">
                <input
                id="confirmpass"
                name="confirmpass"
                type="password"
                autocomplete="current-confirmpass"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmpass}
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {
                <p className="text-xs  text-red-500">
                    {errors.confirmpass &&
                    touched.confirmpass &&
                    errors.confirmpass}
                </p>
                }
            </div>
            </div>

            <div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {isSubmitting ? <Spinner/> : 'Sign up'}
            </button>
            </div>
            </form>
          )}
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          already a member?
          <Link
            to={"/login"}
            className="font-semibold leading-6 text-indigo-600 mx-2 hover:text-indigo-500"
          >
            Login in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;