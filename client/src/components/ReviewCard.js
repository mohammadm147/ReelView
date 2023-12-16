import React, { useEffect } from "react";

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

// ReviewCard component
const ReviewCard = ({ userId, review, rating, date }) => {
    const [username, setUsername] = React.useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/user/${userId}`);
                const user = await response.json();
                setUsername(user.username);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className={`flex flex-col shadow-md rounded-md p-5`}>
            <div className="flex">
                <h1 className="w-full font-bold">{username}</h1>
                <p className="text-gray-500 text-sm pl-2 justify-end">{new Date(date).toLocaleDateString('en-US', options)}</p>
            </div>
            <div className="flex">
                <p className="w-full">Rating: {rating}</p>
            </div>
            <div className={``}>
                {review}
            </div>
        </div>
    );
}

export default ReviewCard;