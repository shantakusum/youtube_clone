import React from 'react'
import {Link} from 'react-router-dom'
export const Navbar = () => {
  return (
    <>
        <nav className="bg-amber-700 text-amber-50 p-4">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Details</h1>
                <ul className= "flex gap-7">
                    <li>
                        <Link to="/" className="text-2xl">Home</Link>
                    </li>
                    <li>
                        <Link to="/user" className="text-2xl">Add User</Link>
                    </li>
                    <li>
                        <Link to="/video" className="text-2xl">Video</Link>
                    </li>
                    
                </ul>
            </div>
        </nav>
    </>
  )
}
