import React, { useEffect } from "react";
import styles from "../style";
import { Card } from "./index";
import { Spinner } from "./index";

const api_key = "de015c833c7c3bc03c8a7037876358a7";

// ScrollableMovies component
const ScrollableMovies = ({ title, link, options }) => {

    const [movies, setMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [choices, setChoices] = React.useState();
    const [selectedOption, setSelectedOption] = React.useState();

    useEffect(() => {
        console.log(link);
        fetch(`${link}?api_key=${api_key}&language=en-US&page=1`)
            .then(response => response.json())
            .then(response => {
                setMovies(response.results);
                setLoading(false);
                setChoices(options);
                setSelectedOption(options[0]);
            }
            )
            .catch(err => console.error(err));
    }, []);

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
}

export default ScrollableMovies;