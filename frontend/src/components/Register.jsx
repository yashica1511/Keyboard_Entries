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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:5000/api/auth/register', {
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
                    setErrors({ general: data.message });
                }
            } catch (error) {
                console.error('Username or Email Already Exist', error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="min-h-screen bg-blue-500 flex flex-col">
            <nav className="bg-blue-700 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white text-xl font-bold">Home</Link>
                </div>
            </nav>
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Register</h1>
                    {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                    {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
                        <p>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
