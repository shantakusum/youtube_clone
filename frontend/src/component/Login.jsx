import React, {useState} from 'react'
import { useNavigate , Link } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {
    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        UserEmail: "",
        Password: ""
    })
    const handleChange = (e) =>{
        const{name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/v1/login', formData);
            console.log(response.data);
            console.log(response.data.token);
            console.log(response.data.user);
            // Token ko save karo
            localStorage.setItem("token",  response.data.token);
            // User data save karo
            localStorage.setItem("user", JSON.stringify(response.data.user) );
            // Check karo token save hua ya nahi
            console.log("Token:", localStorage.getItem("token"));

            navigate("/home");
            setFormData({
                UserEmail: "",
                Password: ""
            });
        }
        catch(error){
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    }
 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6"> Login </h2>
            <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="UserEmail"
                        value={formData.UserEmail}
                        onChange={handleChange}
                        placeholder="Enter email"
                        autoComplete="off"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
                    />
                </div>
                {/* Password */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        autoComplete="new password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
                    />
                </div>
                {/* Login Button */}
                <button  type="submit" className="w-full bg-fuchsia-500 text-white py-2 rounded-md hover:bg-fuchsia-500 transition" >Login </button>
            </form>
            {/* Register Link */} 
            <div className="text-center mt-6"> 
                <span className="text-gray-600"> Don't have an account?{" "} </span>
                <Link to="/register" className="text-fuchsia-500 font-medium hover:underline" > Register </Link>
                 
                <Link to="/forgot-password" className="text-sm ml-3 text-fuchsia-500 hover:underline">  Forgot Password?</Link>
            </div>

        </div>

    </div>
);
}
