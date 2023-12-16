import React, { useEffect } from "react";
import styles from "../style";
import { ScrollableShows } from "../components";

const options = ["Today", "This Week"];

// TVShows component
const TVShows = () => {
    const [selectedOption, setSelectedOption] = React.useState(options[0]);
    const [apiLink, setApiLink] = React.useState("https://api.themoviedb.org/3/trending/tv/day");

    const handleOptionChange = (option) => {
        setSelectedOption(option);

        if (option === "Today") {
            setApiLink("https://api.themoviedb.org/3/trending/tv/day");
        }
        else if (option === "This Week") {
            setApiLink("https://api.themoviedb.org/3/trending/tv/week");
        }
    }

    useEffect(() => {
        setSelectedOption(options[0]);
        setApiLink("https://api.themoviedb.org/3/trending/tv/day");
    }, []); // Empty dependency array to run only once on component mount

    return (
        <div className={`${styles.paddingX} ${styles.paddingY}`}>
            <h1 className="font-bold text-2xl">Popular TV Shows</h1>
            <div className="flex flex-row grid grid-cols-8 pt-2">
                <div className="col-span-2 pr-4">
                    <div className="flex flex-col shadow-md rounded-md py-2 divide-y">
                        <h1 className="font-bold pl-2">Filters</h1>
                        <ul className="py-2">
                            {options.map((option, index) => (
                                <li key={index} className={`py-1 hover:bg-orange-500 hover:text-white transition ${selectedOption === option ? "text-white bg-orange-500" : "text-gray-600"}`}>
                                    <button
                                        className={`pl-2`}
                                        onClick={() => handleOptionChange(option)}
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-6">
                    <ScrollableShows title="Popular" link={apiLink} />
                </div>
            </div>
        </div>
    );
}

export default TVShows;
