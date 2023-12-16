import React from 'react';
import { Link } from 'react-router-dom';

const options = { year: 'numeric', month: 'long', day: 'numeric' };

// Card component for Tv shows
const TVCard = ({ title, image, releaseDate, rating, id }) => {

    return (
        <div>
            <div className={`flex flex-col gap-2 pb-4 shadow-md rounded-md`}>
                <Link to={`/tv/${id}`}><img className={`w-[150px] h-[225px] shadow-md rounded-md`} src={`https://image.tmdb.org/t/p/w500/${image}`} alt={title} /></Link>
                <div className={`flex flex-col px-3 w-[150px]`}>
                    <Link to={`tv/${id}`} className="hover:text-blue-800 transition"><h1 className="font-bold text-sm">{title}</h1></Link>
                    <p className="text-sm text-light text-gray-600">{new Date(releaseDate).toLocaleDateString('en-US', options)}</p>
                </div>
            </div>
        </div>
    );
}

export default TVCard;