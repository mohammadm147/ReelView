import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';

// Register component
const Register = ({ setSignedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the email and password are valid
        if (!username) {
            setUsernameError("Username is required");
        } else if (!email) {
            setEmailError("Email is required");
        } else if (!password) {
            setPasswordError("Password is required");
        } else {
            // Register the user
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "email": email, "password": password, "username": username })
            };


            fetch("http://localhost:3001/api/register", requestOptions)
                .then((response) => {
                    if (response.status === 200) {
                        // Assuming response is in JSON format
                        return response.json();
                    } else {
                        // The user was not logged in successfully
                        setEmailError("Invalid email or password");
                        throw new Error("Registration failed");
                    }
                })
                .then((data) => {
                    // Now 'data' should contain the parsed JSON response
                    const userId = data.userId;

                    if (userId) {
                        // The user was logged in successfully
                        NotificationManager.success('You have successfully registerd!');
                        localStorage.setItem("userId", userId);
                        setSignedIn(true);
                        navigate("/profile");
                    } else {
                        // Handle the case where userId is not present in the response
                        setEmailError("User ID not found in the response");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setEmailError("Something went wrong");
                });
        }
    };


    return (
        <div className={`${styles.paddingY} min-h-full flex flex-col justify-center items-center`}>
            <div className="max-w-xs bg-white rounded shadow-md p-12">
                <h2 className="text-xl font-bold text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control w-full px-3 py-2 text-sm text-gray-700 bg-white rounded border-0 shadow-sm focus:outline-none focus:ring"
                        />
                        {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control w-full px-3 py-2 text-sm text-gray-700 bg-white rounded border-0 shadow-sm focus:outline-none focus:ring"
                        />
                        {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control w-full px-3 py-2 text-sm text-gray-700 bg-white rounded border-0 shadow-sm focus:outline-none focus:ring"
                        />
                        {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                    </div>
                    <div className="flex items-center">
                        <input type="submit" value="Register" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded shadow-sm hover:bg-blue-800 focus:outline-none focus:ring" />
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-700 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;