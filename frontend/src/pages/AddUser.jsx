    import React, {useState, useEffect} from 'react'
    import axios from "axios"
    import { useParams } from 'react-router-dom'


    export const AddUser = () => {
        const {id} = useParams();
        console.log("id =", id);
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
        useEffect(() => {
            if (id) {
                fetchUser();
            }
         }, []);
        const fetchUser = async () => {
        try {
            const response = await axios.get(
            `http://localhost:5000/v1/user/${id}`
            );

            console.log(response.data);

            setFormData(response.data);
        } catch (error) {
            console.log(error);
        }
        };

        // const handleSubmit = async(e) => {
        //     console.log(e.target);  // puri form field show hoti hai <form> <form> submit button ko hit kre pe
        //     e.preventDefault();
        //     console.log(FormData);
        //     const response = await axios.post(
        //          "http://localhost:5000/v1/register", FormData 
        //     );
        //     console.log(response.data);
        //     alert("user added successfully");
        //     setFormData({
        //         UserName:"",
        //         Phone:"",
        //         UserEmail:"",
        //         Password:"" 
        //     })
        // }    
        const handleSubmit = async (e) => {
            e.preventDefault();
        try {
            let response;
            if (id) {
            response = await axios.put(
                `http://localhost:5000/v1/user/${id}`,
                FormData
            );
            alert("User Updated Successfully");
            } else {
            response = await axios.post(
                "http://localhost:5000/v1/register",
                FormData
            );
            alert("User Added Successfully");
            }

            console.log(response.data);

            setFormData({
            FullName: "",
            UserName: "",
            Phone: "",
            UserEmail: "",
            Password: ""
            });

        } catch (error) {
            console.log(error);
        }
        };
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        {id ? "Update User" : "Add User"}
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input type="text" name="FullName" value={FormData.FullName} onChange={handleChange}  placeholder="Enter Full Name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"/>
                        </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input type="text" name="UserName" value={FormData.UserName} onChange={handleChange}  placeholder="@username" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"/> 
                        
                        </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input  type="number" name="Phone" value={FormData.Phone} onChange={handleChange}  placeholder="Phone Number"  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300" />
                         
                        </div>
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input  type="email" name="UserEmail" value={FormData.UserEmail} onChange={handleChange} placeholder="Enter Email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"/>
                         
                        </div>                                     
                                                                                                                                                                  
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                             <input type="password" name="Password" value={FormData.Password} onChange={handleChange}  placeholder="Enter Password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"/>
                        </div>
                       
                        <button  type="submit" className="w-full bg-fuchsia-500 text-white py-2 rounded-md hover:bg-fuchsia-500 transition"> {id ? "Update" : "Submit"}</button>
                    </form> 
                </div>
            </div>
        )
    }
