import React from 'react';

// Card component for people
const PersonCard = ({ name, role, image }) => {
    return (
        <div>
            <div className={`flex flex-col gap-1 pb-4`}>
                <img className={`w-[125px] h-[175px] shadow-md rounded-md`} src={`https://image.tmdb.org/t/p/w500/${image}`} alt={name} />
                <div className={`flex flex-col px-3 w-[150px]`}>
                    <h1 className="font-bold text-sm">{name}</h1>
                    <p className="text-sm text-light text-gray-600">{role}</p>
                </div>
            </div>
        </div>
    );
}

export default PersonCard;