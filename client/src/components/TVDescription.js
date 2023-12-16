import React, {useState, useEffect} from 'react';
import styles from '../style';
import { useParams } from 'react-router-dom';
import { CircleRating, ScrollablePeople, Reviews, Spinner } from './index';

// TVDescription component
const TVDescription = () => {
    const [show, setShow] = useState();
    const [loading, setLoading] = useState(true);
    const [signedIn, setSignedIn] = useState(false);

    const { id } = useParams();

    useEffect(() => {

        const user = localStorage.getItem('userId');

        if (user) {
            setSignedIn(true);
        }

        fetch('https://api.themoviedb.org/3/tv/' + id + '?api_key=de015c833c7c3bc03c8a7037876358a7&language=en-US&page=1')
            .then(response => response.json())
            .then(response => {
                setShow(response);
                setLoading(false);
            })
            .catch(err => console.error(err));
    });

    {
        if (loading) {
            return <Spinner />;
        } else {
            return (
                <>
                    <div
                        className="relative h-[35rem]"
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>

                        <div className={`absolute flex-2 flex items-center justify-center text-white ${styles.paddingX}`}>
                            <div className="max-w-sm p-8">
                                <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt={show.name} className="mb-4 rounded-md shadow-md hover:blur-sm transition duration-500 " />
                            </div>
                            <div>
                                <h2 className="flex text-4xl font-bold mb-2">{show.name}</h2>
                                <div className="flex space-x-2 font-light">
                                    <p>{new Date(show.first_air_date).toLocaleDateString('en-US')}</p>
                                    {show.genres.map((genre, index) => (
                                        index === show.genres.length - 1 ?
                                            <p key={index} className="mr-2">{genre.name}</p> :
                                            <p key={index} className="mr-2">{genre.name},</p>
                                    ))}
                                    <p>{new Date(show.last_air_date).toLocaleDateString('en-US')}</p>
                                </div>
                                <div className="flex flex-row py-4">
                                    <CircleRating rating={show.vote_average} />
                                </div>
                                <p className="italic text-neutral-300">{show.tagline}</p>
                                <p className="font-semibold text-lg">Overview</p>
                                <p className="text-white">{show.overview}</p>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.paddingX} py-4 grid grid-cols-4 sm:py-8`}>
                        <div className="col-span-3">
                            <ScrollablePeople title="Cast" link={`https://api.themoviedb.org/3/tv/${id}/credits`} options={[]} />
                            <Reviews movieId={id} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <h3 className="font-bold">Status</h3>
                            <p>{show.status}</p>
                            <h3 className="font-bold">Original Language</h3>
                            <p>{show.original_language}</p>
                            <h3 className="font-bold">Type</h3>
                            <p>{show.type}</p>
                            <h3 className="font-bold">Number of Episodes</h3>
                            <p>{show.number_of_episodes}</p>
                            <div>
                                <h3 className="font-bold">Production Companies</h3>
                                <div className="flex flex-col space-y-2">
                                    {show.production_companies.map((company, index) => (
                                        <div key={index} >
                                            <p>{company.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default TVDescription;