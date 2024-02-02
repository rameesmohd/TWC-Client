import { useState } from 'react';
import { Link } from 'react-router-dom';
import userAxios from '../Axios/Useraxios';
import toast from 'react-hot-toast';
import { Button } from 'antd';

const ForgetPasswordForm = ({setForget}) => {
    const [email, setEmail] = useState('')
    const [loading,setLoading]=useState(false)
    const [send,setSend]=useState(false)
    const axiosInstance = userAxios()

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            setLoading(true)
            console.log('Forget password request submitted for email:', email);
            await axiosInstance.post('/forget-password',{ email : email })
            setSend(true)
        } catch (error) {
            toast.error(error.message)
            console.log(error);
            setLoading(false)
        }
    };

    return (
            <div className="py-8 px-6 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Forget Password</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        onClick={handleSubmit}
                        loading={loading}
                        className="w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 
                        focus:outline-none focus:shadow-outline-blue"
                    >
                        Reset Password
                    </Button>
                </form>
                { send  && <p className='text-sm text-red-500'>Please check your email!!</p> }
                <div className="mt-4 text-sm">
                    <p onClick={()=>setForget(false)}>
                        Remember your password? <Link className="text-blue-500">Login here</Link>
                    </p>
                </div>
            </div>
    );
};

export default ForgetPasswordForm;