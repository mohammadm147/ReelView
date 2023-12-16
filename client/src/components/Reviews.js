import React, { useState, useEffect } from "react";
import styles from "../style";
import { Spinner } from "./index";
import { ReviewCard } from "./index";
import { NotificationManager } from 'react-notifications';

// Reviews component
const Reviews = ({ movieId }) => {
    const [review, setReview] = React.useState("");
    const [rating, setRating] = React.useState(0);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/movie/${movieId}/reviews`);
            const reviews = await response.json();
            setReviews(reviews);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRatingChange = (event) => {
        const selectedRating = parseFloat(event.target.value);
        setRating(selectedRating);
    };


    useEffect(() => {
        fetchReviews();
        setLoading(false);
    }, [reviews]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');

        if (review === "") {
            console.log("Review cannot be empty");
            return;
        }

        if (userId) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "review": review, "rating": rating, "userId": userId, "movieId": movieId })
            };

            const response = await fetch(`http://localhost:3001/api/review`, requestOptions);

            if (response.ok) {
                setReview("");
                setRating(0);
                fetchReviews();
                NotificationManager.success('Review added successfully!');
            }
            else if (response.status === 400) {
                console.log("Error");
            }
        } else {
            console.log("You must be logged in to add a review!");
            NotificationManager.error('You must be logged in to add a review!');
        }
    };

    if (loading) {
        return <Spinner />;
    }
    else {
        return (
            <div className={`${styles.paddingY} pr-8`}>
                <div className={`pb-4`}>
                    <h1 className={`font-bold text-2xl`}>Reviews</h1>
                </div>
                <div className={`pb-4`}>
                    <div className={`flex flex-col`}>
                        <textarea className={`border-2 border-gray-400 rounded-md p-2`} value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write a review..." />

                        <div className="flex items-center space-x-2 pt-2">
                            <label htmlFor="rating">Rating: {rating}</label>
                            <input
                                type="range"
                                id="rating"
                                name="rating"
                                min={1}
                                max={5}
                                step={0.5}
                                value={rating}
                                onChange={handleRatingChange}
                            />
                        </div>

                    </div>
                    <div className={`flex justify-end pt-4`}>
                        <button className={`bg-black text-white px-4 py-2 rounded-md`} onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                {reviews.map((r, index) => (
                    <ReviewCard key={index} userId={r.userId} review={r.review} rating={r.rating} date={r.date} />
                ))}
            </div>
        );
    }
}

export default Reviews;