import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_BACKEND_URL;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch(`${API_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('user', JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                    }));
                    setSuccessMessage('Registration successful!');
                    setFormData({
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                    setErrors({});
                    setTimeout(() => {
                        navigate('/home');
                    }, 1000);
                } else {
                    setErrors({ general: data.message || 'An error occurred' });
                }
            } catch (error) {
                console.error('Username or Email Already Exists', error);
                setErrors({ general: 'Username or email already exists. Try again with a different one.' });
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative"
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

            {/* Register Form Container */}
            <div className="w-full max-w-md p-8 bg-white text-gray-900 rounded-lg shadow-lg mt-20">
                <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
                
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>

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

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all"
                    >
                        Register
                    </button>
                </form>

                {/* Redirect to Login */}
                <div className="mt-4 text-center text-gray-700">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
