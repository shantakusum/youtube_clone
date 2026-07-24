    import React, {useState, useEffect} from 'react'
    import axios from "axios"
    import { useNavigate } from 'react-router-dom'
    import { toast } from "react-toastify";


    export const Register = () => {
        const navigate = useNavigate();
        const[FormData, setFormData] = useState({
            FullName:"",
            UserName:"",
            Phone:"",
            UserEmail:"",
            Password:""
        })
        const handleChange = (e) =>{
            console.log(e)
            console.log(e.target)    //input field jis field me data fill karege <input value="" /> input field hit krne pe
            setFormData({
                ...FormData,
                [e.target.name]: e.target.value
            });
        };
        
        const handleSubmit = async (e) => {
            console.log(e.target);   //puri form field show hoti hai <form> <form> submit button ko hit kre pe
            e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/v1/register",  FormData );
            alert("User Added Successfully");
            console.log(response.data);
            setFormData({
            FullName: "",
            UserName: "",
            Phone: "",
            UserEmail: "",
            Password: ""
            });
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
        };
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Register
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input type="text" name="FullName" autoComplete="off" value={FormData.FullName} onChange={handleChange}  placeholder="Enter Full Name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"/>
                        </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                User Name
                            </label>
                            <input type="text" name="UserName" autoComplete="off" value={FormData.UserName} onChange={handleChange}  placeholder="@username" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"/> 
                        
                        </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone
                            </label>
                            <input  type="number" name="Phone" autoComplete="off" value={FormData.Phone} onChange={handleChange}  placeholder="Phone Number"  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300" />
                         
                        </div>
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input  type="email" name="UserEmail" autoComplete="off" value={FormData.UserEmail} onChange={handleChange} placeholder="Enter Email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"/>
                        </div>                                     
                                                                                                                                                                  
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                             <input type="password" name="Password" autoComplete="new Password" value={FormData.Password} onChange={handleChange}  placeholder="Enter Password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"/>
                        </div>
                       
                        <button  type="submit" className="w-full bg-fuchsia-500 text-white py-2 rounded-md hover:bg-fuchsia-500 transition"> Submit</button>
                    </form> 
                </div>
            </div>
        )
    }
