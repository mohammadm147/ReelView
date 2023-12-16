import React from 'react';
import { Link } from 'react-router-dom';

// Set date options
const options = { year: 'numeric', month: 'long', day: 'numeric' };

// Card component for movies
const Card = ({ title, image, releaseDate, rating, id }) => {
    return (
        <div>
            <div className={`flex flex-col pl-5 gap-2 pb-4`}>
                <Link to={`/movie/${id}`}><img className={`w-[150px] h-[225px] shadow-md rounded-md`} src={`https://image.tmdb.org/t/p/w500/${image}`} alt={title} /></Link>
                <div className={`flex flex-col px-3 w-[150px]`}>
                    <Link to={`movie/${id}`} className="hover:text-blue-800 transition"><h1 className="font-bold text-sm">{title}</h1></Link>
                    <p className="text-sm text-light text-gray-600">{new Date(releaseDate).toLocaleDateString('en-US', options)}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;