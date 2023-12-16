import React, { useEffect } from "react";
import { TVCard, Spinner } from "./index"; // Assuming TVCard and Spinner are imported from your components

const api_key = "de015c833c7c3bc03c8a7037876358a7";

// ScrollableShows component
const ScrollableShows = ({ link }) => {
    const [shows, setShows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        setLoading(true); // Set loading to true when the link changes

        fetch(`${link}?api_key=${api_key}&language=en-US&page=1`)
            .then(response => response.json())
            .then(response => {
                setShows(response.results);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false); // Handle error and set loading to false
            });
    }, [link]); // Include link as a dependency

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div className={``}>
                <ul className={`grid grid-cols-4 md:grid-cols-6 gap-4`}>
                    {shows.map((show, index) => (
                        <TVCard
                            key={index}
                            title={show.name}
                            description={show.overview}
                            image={show.poster_path}
                            id={show.id}
                            releaseDate={show.first_air_date}
                            rating={show.vote_average}
                        />
                    ))}
                </ul>
            </div>
        );
    }
};

export default ScrollableShows;
