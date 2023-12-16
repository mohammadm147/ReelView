import React, { useState, useEffect } from "react";
import { Spinner, Lists } from "../components";
import styles from "../style";

// Profile Component
const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');

                if (userId) {
                    const response = await fetch(`http://localhost:3001/api/user/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);
                    } else {
                        console.error('Failed to fetch user data:', response.statusText);
                    }
                } else {
                    console.error('User ID not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Render the component
    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div>
                <div className="bg-gray-800 w-full">
                    <div className={`${styles.paddingY} ${styles.paddingX} flex flex-col items-center justify-center space-y-2`}>
                        <div className={`flex items-center`}>
                            <h1 className={`rounded-full bg-orange-500 text-white text-6xl flex items-center justify-center w-32 h-32 shadow-md`}>
                                {userData.username.charAt(0).toUpperCase()}
                            </h1>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-row">
                                <h1 className="text-white font-bold text-2xl">{userData.username}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.paddingX} ${styles.paddingY} flex flex-col items-center`}>
                    <div className="pb-4">
                        <h1 className="text-black font-bold text-6xl">Stats</h1>
                    </div>
                    <div className="flex flex-row space-x-20">
                        <div className="flex flex-col items-center">
                            <h2 className="text-black">Favorites</h2>
                            <p className="text-orange-500 py-2 text-6xl font-bold">{userData.favoriteMovies.length}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className="text-black">Your List</h2>
                            <p className="text-orange-500 py-2 text-6xl font-bold">{userData.watchList.length}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Lists arr={userData.favoriteMovies} title="Favorites" />
                    <Lists arr={userData.watchList} title="Your Watch List" />
                </div>
            </div>
        );
    }
};

export default Profile;