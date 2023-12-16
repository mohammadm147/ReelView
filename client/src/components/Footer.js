import styles from "../style";
import React from "react";

// Footer component
const Footer = () => {
    return (
        <section className={`bg-neutral-900 text-white ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX} flex-col`}>
            <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
                <div className="flex-1 flex flex-col justify-start mr-10">
                    <h1 className="font-bold text-white text-2xl">ReelView</h1>
                    <p className={`${styles.paragraph} mt-4 max-w-[310px]`}>An easy way to find new Movies and TV Shows, and review ones that you've already seen.</p>
                </div>
                <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
                    <div className="flex flex-col">
                        <p className="font-bold text-lg mb-4 text-white">Designed By:</p>
                        <p className="text-white">Ashaz Ahmed</p>
                        <p className="text-white">Jae Trim</p>
                        <p className="text-white">Braden Peacock</p>
                        <p className="text-white">Mohammad Mian</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;