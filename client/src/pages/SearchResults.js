import React, { useEffect } from "react";
import { Spinner, SearchCard } from "../components";
import { useParams } from "react-router-dom";
import styles from "../style";

const api_key = "de015c833c7c3bc03c8a7037876358a7";

const SearchResults = () => {
    const [loading, setLoading] = React.useState(true);
    const [results, setResults] = React.useState([]);

    const query = useParams().searchQuery;

    useEffect(() => {
        console.log(query);
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${query}`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setResults(response.results);
                setLoading(false);
            }
            )
            .catch(err => console.error(err));
    }, []);

    if (loading) {
        return <Spinner />;
    }
    else {
        return (
            <div className={`${styles.paddingX} flex flex-col pb-12`}>
                <div className="flex pt-4 pb-5 items-center">
                    <h1 className={`font-bold text-xl`}>Search Results for "{query}"</h1>
                </div>
                <div className={`flex flex-col space-y-4`}>
                    {results.map((movie, index) => (
                        <SearchCard
                            key={index}
                            title={movie.title}
                            description={movie.overview}
                            image={movie.poster_path}
                            id={movie.id}
                            releaseDate={movie.release_date}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default SearchResults;