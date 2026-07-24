import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
export const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <>
        <nav className="bg-[#D8A7A7] text-amber-50 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Wedding</h1>
                {/* <img src="/logo1.png" className="w-2x4 h-30" /> */}
                <ul className= "flex gap-7">
                    <li>
                        <Link to="/home" className="text-2xl">Home</Link>
                    </li>
                    <li>    
                        <Link to="/user" className="text-2xl">Add User</Link>
                    </li>
                    <li>
                        <Link to="/video" className="text-2xl">Video</Link>
                    </li>
                    <li>
                        <Link to="/video_upload" className="text-2xl">Upload Video</Link>
                    </li>
                    <li>
                        <a href="#"  onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }} className="text-2xl">Logout</a>
                    </li>
                    
                </ul>
            </div>
        </nav>
    </>
  )
}
