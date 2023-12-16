import React from "react";
import styles from "../style";
import { useNavigate } from "react-router-dom";

// Hero component
const Hero = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const navigate = useNavigate();

    // Handle search query
    const handleClick = () => {
        if (searchQuery === '') {
            return;
        }

        console.log(searchQuery);
        navigate(`/search/${searchQuery}`);
    };

    // Handle search query
    const handleChange = event => {
        setSearchQuery(event.target.value);
    }

    return (
        <>
            <div className={`relative h-auto w-auto flex flex-col`}>
                <div className={`bg-theme clip-path h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto top-0 left-0 right-0 opacity-100 z-10`}>
                    <div className={`${styles.paddingX} ${styles.paddingY}`}>
                        <h1 className="text-white font-bold text-5xl">Welcome</h1>
                        <div className={`py-4`}>
                            <p className="text-white text-xl">ReelView is a movie review app that allows users to search for movies and leave reviews for them.</p>
                        </div>
                        <div className="flex items-center shadow-lg hover:scale-105 transition">
                            <input
                                type="text"
                                className="w-full rounded-l-full px-5 py-3 focus:outline-none"
                                placeholder="Search for a Movie..."
                                value={searchQuery}
                                onChange={handleChange}
                            />
                            <button
                                onClick={handleClick}
                                className="bg-orange-500 text-white rounded-r-full px-4 py-3 focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;