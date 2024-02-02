import React from "react";
import Signupform from "../../Components/SignupCard.jsx";
import img from '../../assets/adam-nowakowski-D4LDw5eXhgg-unsplash-825bba2f.jpg'

const Signup = () => {
  return (
    <div className="md:grid grid-cols-2">
      <div className="hidden md:block col-span-1  ">
        <img
          src={img}
          className="transition-opacity object-cover w-full h-screen"
          alt=""
        />
      </div>
      <div className="col-span-1 h-full">
        <Signupform />
      </div>
    </div>
  );
};

export default Signup;