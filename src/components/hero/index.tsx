"use client"

import { useState } from "react";
import Image from "next/image";
import "./hero.css";

const Hero: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const fileDownload = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
        
        const link = document.createElement("a");
        link.href = "/files/(CV) I Komang Egar Suarama Dharmawangsa.pdf";
        link.download = "(CV) I Komang Egar Suarama Dharmawangsa.pdf";
        link.click();
    };

    return (
        <section className="section-container" id="hero">
            <div className="mt-28 mb-10 flex flex-col-reverse md:flex-row items-center">
                <div className="md:w-1/2 mt-10 md:mt-0 md:mx-4 flex justify-center">
                    <div>
                        <span data-aos="fade-right" className="block mb-1">Hello👋, I&apos;m</span>
                        <h1 data-aos="fade-right" className="text-4xl sm:text-5xl mb-5 font-bold leading-11 md:leading-16">
                            Egar Dharmawangsa
                        </h1>
                        <p className="text-[22px] sm:text-[25px] bg-[rgb(1,57,211)] overflow-hidden whitespace-nowrap hero-role">
                            Full-Stack Web Developer
                        </p>
                        <div data-aos="zoom-in">
                            <button 
                                onClick={fileDownload} 
                                className="inline-block mt-8 py-2 px-6 text-[15px] bg-black border border-white hover:bg-[rgb(1,57,211)] hover:shadow-[0_0_24px_rgba(1,57,211,0.5)] transition-all duration-300 ease-in-out rounded-full" 
                                disabled={loading}
                            >
                                {loading ? "Downloading..." : "Download CV"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 my-10 mx-4">
                    <Image 
                        data-aos="zoom-in" 
                        src="/images/profile/profile.jpg" 
                        alt="Profile Image" 
                        width={350} 
                        height={350} 
                        className="rounded-full block hero-image mx-auto" 
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;