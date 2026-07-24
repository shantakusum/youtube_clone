
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const ForgetPassword = () => {

    const [UserEmail, setUserEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        NewPassword: "",
        ConfirmPassword: ""
    });

    // // Password fields handle
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Email check

    const handleCheckEmail = async (e) => {
        e.preventDefault();
        console.log(UserEmail);
        try {
            const response = await axios.post(
            "http://localhost:5000/v1/checkEmail",
            {
                UserEmail: UserEmail
            }
        );
        setShowPassword(true);
        } catch (error) {
            console.log(error);
            setShowPassword(false);
        } 
    };

    //Password update
    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        // Password match check
        if (
            formData.NewPassword !==
            formData.ConfirmPassword
        ) {
            alert("Passwords do not match");
            return;
        }
        try {
            setLoading(true);

            const response = await axios.put(
                "http://localhost:5000/v1/update-password",
                {
                    UserEmail,
                    Password: formData.NewPassword
                }
            );
            alert(response.data.message || "Password updated successfully");
            // Reset
            setUserEmail("");
            setFormData({
                NewPassword: "",
                ConfirmPassword: ""
            });
            setShowPassword(false);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Password update failed"
            );

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-2">
                    Forgot Password
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Enter your registered email address
                </p>
                {/* Email Form */}
                {!showPassword && (
                    <form onSubmit={handleCheckEmail}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="UserEmail"
                                value={UserEmail}
                                onChange={(e) =>
                                    setUserEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                                autoComplete="off"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
                            />

                        </div>


                        <button
                            type="submit"
                            
                            className="w-full bg-fuchsia-500 text-white py-2 rounded-md hover:bg-fuchsia-600 transition"
                        >
                            check Email
                        </button>

                    </form>

                )}


                {/* Password Form */}

                {showPassword && (
                    <form onSubmit={handleUpdatePassword}>
                        {/* Email show */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={UserEmail}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                            />
                        </div>
                        {/* New Password */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input type="password" name="NewPassword"  value={formData.NewPassword}  onChange={handleChange} placeholder="Enter new password"  required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
                            />
                        </div>
                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input  type="password" name="ConfirmPassword" value={formData.ConfirmPassword} onChange={handleChange}   placeholder="Confirm new password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
                            />
                        </div>


                        {/* Update Button */}

                        <button
                            type="submit"
                        
                            className="w-full bg-fuchsia-500 text-white py-2 rounded-md hover:bg-fuchsia-600 transition disabled:opacity-50"
                        >
                            
                        </button>

                    </form>

                )}


                {/* Back to Login */}

                <div className="text-center mt-6">

                    <Link
                        to="/login"
                        className="text-fuchsia-500 font-medium hover:underline"
                    >
                        ← Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
};


