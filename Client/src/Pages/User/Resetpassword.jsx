import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import userAxios from '../../Axios/Useraxios';
import toast from 'react-hot-toast';
import { Button } from 'antd';

const Resetpassword = ({setForget}) => {
    const axiosInstance = userAxios()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    // const token = queryParams.get('token');
    const email = queryParams.get('email');

    const [pass,setPass]=useState('')
    const [confirmpass,setConfirmPass]=useState('')
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState('')

    const verify=()=>{
        const err = {}
        if(pass.length < 6){
            err.message = 'Password must contain min 6 letters'
        }else if(pass !== confirmpass){
            err.message = 'Password not matched'
        }
        setError(err.message)
        console.log(error);
        if(Object.keys(err).length===0){
            handleSubmit()
        }
    }
    console.log(error);
    const handleSubmit = async() => {
        try {
            setLoading(true)
            console.log('Forget password request submitted for email:', email);
            await axiosInstance.patch('/forget-password',{ email : email ,newPass : pass})
            toast.success("Password changed successfully")
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Change Password
                </h2>
                <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                        <input onChange={(e)=>setPass(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <div>
                        <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input onChange={(e)=>setConfirmPass(e.target.value)} type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    {error && <p className='text-sm text-red-500'>{error}</p>}
                    <Button loading={loading} onClick={verify} type='primary' className='text-black'>Reset passwod</Button>
                </form>
            </div>
        </div>
        </section>
    );
};

export default Resetpassword;