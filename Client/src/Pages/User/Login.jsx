import React from "react";
import LoginForm from "../../Components/Loginform";

const Login = () => {
  return (
    <div className="md:grid grid-cols-2">
      <div className="col-span-1 h-full ">
        <LoginForm />
      </div>
      <div className="hidden md:block col-span-1 bg-blue-gray-100 relative ">
        <img
          src={'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYWRpbmd8ZW58MHx8MHx8fDA%3D'}
          className="transition-opacity object-cover h-screen w-full "
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;