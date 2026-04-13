import Image from "next/image";
import "./hero.css";

const Hero: React.FC = () => {
    return (
        <div className="section-container" id="hero">
            <div className="mt-28 mb-10 flex flex-col-reverse md:flex-row items-center">
                <div className="md:w-1/2 mt-10 md:mt-0 md:mx-4 flex justify-center">
                    <div>
                        <p data-aos="fade-right" className="m-0">Hello👋, I&apos;m</p>
                        <h1 data-aos="fade-right" className="text-4xl sm:text-5xl mb-5 font-bold leading-11 md:leading-16">
                            Egar Dharmawangsa
                        </h1>
                        <p data-aos="fade-right" className="text-[22px] sm:text-[25px] bg-[rgb(1,57,211)] overflow-hidden whitespace-nowrap hero-role">
                            Full-Stack Web Developer
                        </p>
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
        </div>
    );
}

export default Hero;