import { Spinner } from "@material-tailwind/react";
import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import img from '../../assets/01 (1).png'

const Login = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
      <div className="flex justify-center">
      <img src={img} alt="" className="w-40" />
      </div>
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
       Admin Panel
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
     onSubmit={async (values, { setSubmitting }) => {
      try {
      //   const response = await userAxios.post("/login", {
      //     email: values.email,
      //     password: values.password
      //   });
      //   console.log("Server response:", response.data);
      } catch (error) {
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
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner/> : 'Sign in'}
          </button>
        </div>
      </form>
      )}
      </Formik>
    </div>
  </div>
  );
};

export default Login;