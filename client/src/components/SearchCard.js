import React from "react";
import { useNavigate } from "react-router-dom";

const options = { year: 'numeric', month: 'long', day: 'numeric' };

// SearchCard component
const SearchCard = ({ title, image, id, description, releaseDate }) => {
    const navigate = useNavigate();

    const handleLink = () => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className="flex flex-row items-center w-full shadow-md rounded-md">
            <img className="w-[100px] h-[150px] rounded-md" src={`https://image.tmdb.org/t/p/w500/${image}`} alt={title} />
            <div className="flex flex-col items-start justify-center px-2">
                <button className="text-xl font-bold transition hover:text-blue-500" onClick={handleLink}>{title}</button>
                <p className="text-sm text-gray-400 pb-2">{new Date(releaseDate).toLocaleDateString('en-US', options)}</p>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    );
};

export default SearchCard;