import React, { useEffect, useState } from 'react'
import OtpInput from "react-otp-input";
import { Spinner } from "@material-tailwind/react";
import toast from 'react-hot-toast';

const EmailVerification = ({otp,verify,setOtp,generateOTP,email}) => {
  const [code, setCode] = useState("");
  const [loading,setLoading ] = useState(false)
  const [count,setCount] = useState(30)

  useEffect(()=>{
    if(count>0){
      setTimeout(()=>{
          setCount(count-1)
      },1000)   
    }else{
      setOtp('')
    }
  },[count])

  const handleChange=(code) => {
    setCode(code)
    if(code.length===6 && code==otp){
        setLoading(true)
        setTimeout(()=>{
          setLoading(false)
          verify()
        },1000)
    }else if(code.length===6 && code!=otp){
        setLoading(true)
        setTimeout(()=>{
          setLoading(false)
          toast.error('Invalid OTP !!')
        },1000)
    }
  };

  return (
    <div className="relative flex  flex-col justify-center overflow-hidden bg-gray-50 sm:py-12">
    <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
      <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="font-semibold text-3xl">
            <p>Email Verification</p>
          </div>
          <div className="flex flex-row text-sm font-medium text-gray-400">
            <p>We have sent a code to your email</p>
          </div>
        </div>

        <div>
          <form action="" method="post">
            <div className="flex flex-col space-y-12">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <OtpInput
                value={code}
                onChange={handleChange}
                numInputs={6}
                separator={<span style={{ width: "8px" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                inputStyle={{
                border: "1px solid grey",
                borderRadius: "8px",
                width: "54px",
                height: "54px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "blue"
              }}
              focusStyle={{
                border: "1px solid #CFD3DB",
                outline: "none"
              }}
            />
              </div>
             {loading &&  <div className='flex justify-center'>
                  <Spinner/>
              </div>}
              {count>0 &&  <div className='flex justify-center'>
                  {count} seconds left
              </div>}
              <div className="flex flex-col space-y-5">
                <div>
                  { count>0 && <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                    Verify Account
                  </button> }
                  { count===0 && <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                    Resend OTP
                    </button> }
                </div>

                {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Didn't receive the code?</p>{" "}
                  <a
                    className="flex flex-row items-center text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resend
                  </a>
                </div> */}
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EmailVerification
