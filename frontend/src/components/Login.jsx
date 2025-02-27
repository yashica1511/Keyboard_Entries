import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form Data:', formData);
            const { email, password } = formData;
            const usernameOrEmail = email;
            try {
                const response = await fetch(`${API_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usernameOrEmail, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    console.log('Login successful:', data);
                    localStorage.setItem('authToken', data.token);
                    setSuccessMessage('Login successful! Redirecting...');
                    setTimeout(() => {
                        navigate('/home');
                    }, 500);
                } else {
                    console.error('Error response:', data);
                    setLoginError(data.msg || 'Unknown error occurred');
                }
            } catch (error) {
                console.error('Server error:', error);
                setLoginError('An error occurred while logging in. Please try again later.');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center text-white relative"
            style={{
                background: `url('/photo.jpeg') center/cover no-repeat, linear-gradient(to bottom right, #0a0f1e, #1b1f2a)`,
            }}
        >
            {/* Navbar */}
            <nav className="absolute top-0 left-0 w-full px-6 py-4 bg-black bg-opacity-40 backdrop-blur-md shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white text-xl font-bold">Home</Link>
                </div>
            </nav>

            {/* Login Form Container */}
            <div className="w-full max-w-md p-8 bg-white text-gray-900 rounded-lg shadow-lg mt-20"> 
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
                
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                {loginError && <p className="text-red-500 mb-4">{loginError}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all"
                    >
                        Login
                    </button>
                </form>

                {/* Redirect to Register */}
                <div className="mt-4 text-center text-gray-700">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
