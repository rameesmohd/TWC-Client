import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPasswordForm = ({setForget}) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Forget password request submitted for email:', email);
    };

    return (
            <div className="py-8 px-6 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Forget Password</h2>
                <form onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                        Reset Password
                    </button>
                </form>
                <div className="mt-4 text-sm">
                    <p onClick={()=>setForget(false)}>
                        Remember your password? <Link className="text-blue-500">Login here</Link>
                    </p>
                </div>
            </div>
    );
};

export default ForgetPasswordForm;