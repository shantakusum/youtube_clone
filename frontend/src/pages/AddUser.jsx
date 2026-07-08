    import React, {useState, useEffect} from 'react'
    import axios from "axios"
    import { useParams } from 'react-router-dom'


    export const AddUser = () => {
        const {id} = useParams();
        console.log("id =", id);
        const[FormData, setFormData] = useState({
            UserName:"",
            Phone:"",
            UserEmail:"",
            Password:""
        })
        const handleChange = (e) =>{
            console.log(e)
            console.log(e.target)    //input field jis field me data fill karege <input value="" /> input field hit krne pe
            setFormData({
                ...FormData, [e.target.name]: e.target.value
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
            <div className="flex justify-center mt-10">
                <div>
                    <h1 className="text-2xl font-bold mb-4">
                        {id ? "Update User" : "Add User"}
                    </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 ">
                        <input type="text" name="UserName" value={FormData.UserName} onChange={handleChange}  placeholder="Enter Name" className="border p-2"/> 
                        <input  type="number" name="Phone" value={FormData.Phone} onChange={handleChange}  placeholder="Phone Number"  className="border p-2" />                                     
                                                                                                                                                                  
                        <input  type="email" name="UserEmail" value={FormData.UserEmail} onChange={handleChange} placeholder="Enter Email" className="border p-2"/>
                        <input type="password" name="Password" value={FormData.Password} onChange={handleChange}  placeholder="Enter Password" className="border p-2"/> 

                        <button  type="submit" className="bg-black text-white p-2"> {id ? "Update" : "Submit"}</button>
                    </form> 
                </div>
            </div>
        )
    }
