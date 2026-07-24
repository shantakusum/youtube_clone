
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate(); 
    const [users, setUsers] = useState([]);
    const fetchUser = async() => {
        try{
            const response = await axios.get("http://localhost:5000/v1/user");
            console.log(response)
            console.log(response.data);
            setUsers(response.data);
        }catch(error){
            console.log(error)
        }
    }
    useEffect( () => {
        fetchUser();
    }, []);
    const handleEdit = () => {
        console.log("Edit");
    };


    const handleDelete = async (e) => {
    const id = e.currentTarget.getAttribute("data-key");                           // data-key = user.UserId   =>  id = user.UserId
    const userConsent = window.confirm(                                     // it return true and false...
        "Are you sure you want to delete this user?"
    );
    if (userConsent) {
        console.log("User clicked OK");
        await axios.delete(`http://localhost:5000/v1/user/${id}`);
        fetchUser();
    } else {
        console.log("User clicked Cancel");
    }
    };
    return (
        <>
            <div>
                <table className="border border-collapse border-gray-300 text-center my-15 w-full">
                    <thead>
                        <tr>
                            <th className="border p-2 border-gray-200"> Name </th>
                            <th className="border p-2  border-gray-200"> Role  </th>
                            <th className="border p-2  border-gray-200"> Email </th>
                            <th className="border p-2  border-gray-200"> Phone  </th>
                            <th colSpan= "2" className="border p-2  border-gray-200"> Action  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                        <tr key= {user.UserId}>
                            <td className="border p-2  border-gray-200">{user.FullName}</td> 
                            <td className="border p-2  border-gray-200">{user.Role}</td>
                            <td className="border p-2  border-gray-200">{user.UserEmail || '-'}</td>
                            <td className="border p-2  border-gray-200">{user.Phone || '-'} </td>
                            <td className="border p-2  border-gray-200">
                                <button className="bg-green-300 text-white px-4 py-2 rounded-4xl" onClick={() => navigate(`/user/${user.UserId}`)}>Update</button>
                            </td>
                            <td className="border p-2 border-gray-200">
                                <button className="bg-red-500 text-white px-4 py-2 rounded-4xl" data-key={user.UserId} onClick={handleDelete}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
