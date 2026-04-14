const About: React.FC = () => {
    return (
        <div 
            data-aos="fade-up" 
            className="section-container" 
            id="about"
        >
            <div className="bg-black border border-[#27272a] hover:border-[#4b5563] hover:bg-[rgb(10,10,10)] hover:shadow-[0_0_24px_rgba(1,57,211,0.5)] transition-all duration-300 ease-in-out pt-6 px-7 pb-7 rounded-[15px]">
                <h2 className="mb-5 font-bold text-3xl">About.</h2>

                <p className="m-0">
                    I am a student at ITB STIKOM Bali with a strong
                    interest in web development, particularly as a
                    full-stack web developer. I am experienced in using
                    technologies such as React, Next.js, and Laravel
                    to build functional and efficient web-based applications.
                    In addition, I have the ability to understand system
                    requirements and translate them into well-structured
                    digital solutions. I am also eager to learn new things,
                    capable of working both independently and in a team,
                    and committed to continuously improving my skills
                    in the field of information technology.
                </p>
            </div>
        </div>
    );
}

export default About;