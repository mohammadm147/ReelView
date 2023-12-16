import React, { useEffect } from "react";
import styles from "../style";
import { PersonCard } from "./index";

const api_key = "de015c833c7c3bc03c8a7037876358a7";

// ScrollablePeople component
const ScrollablePeople = ({ title, link }) => {

    const [cast, setCast] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        console.log(link);
        fetch(`${link}?api_key=${api_key}&language=en-US&page=1`)
            .then(response => response.json())
            .then(response => {
                setCast(response.cast);
                setLoading(false);
            }
            )
            .catch(err => console.error(err));
    }, []);

    if (loading) {
        return <div>Loading...</div>
    } else {

        return (
            <div className={`${styles.marginX}`}>
                <div className="flex pb-5 items-center">
                    <h1 className={`font-bold text-2xl`}>{title}</h1>
                </div>
                <div className={`flex overflow-x-auto`}>
                    {cast.map((c, index) => (
                        c.known_for_department === "Acting" && (
                            <PersonCard key={index} name={c.name} image={c.profile_path} role={c.character} />
                        )
                    ))}
                </div>
            </div>
        );

    }
}

export default ScrollablePeople;