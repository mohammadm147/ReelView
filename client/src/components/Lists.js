import React, { useEffect, useState } from "react";
import styles from "../style";
import { Card } from "./index";
import { Spinner } from "./index";

const api_key = "de015c833c7c3bc03c8a7037876358a7";

// Lists component
const Lists = ({ arr, title }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            const uniqueMovieIds = new Set();
            const result = [];

            for (let i = 0; i < arr.length; i++) {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${arr[i]}?api_key=${api_key}&language=en-US&page=1`);
                    const movie = await response.json();

                    if (!uniqueMovieIds.has(movie.id)) {
                        result.push(movie);
                        uniqueMovieIds.add(movie.id);
                    }
                } catch (err) {
                    console.error(err);
                }
            }

            setMovies(result);
            setLoading(false);
        };

        fetchMovies();
    }, [arr]);

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div className={`${styles.marginX}`}>
                <div className="flex pt-4 pb-5 items-center">
                    <h1 className={`font-bold text-xl`}>{title}</h1>
                </div>
                <div className={`flex overflow-x-auto`}>
                    {movies.map((movie, index) => (
                        <Card
                            key={index}
                            title={movie.title}
                            description={movie.overview}
                            image={movie.poster_path}
                            id={movie.id}
                            releaseDate={movie.release_date}
                            rating={movie.vote_average}
                        />
                    ))}
                </div>
            </div>
        );
    }
};

export default Lists;