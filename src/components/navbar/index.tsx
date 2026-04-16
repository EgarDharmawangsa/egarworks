"use client";

import { useState, useEffect } from "react";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = (): void => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="bg-[rgba(10,10,10,0.7)] border border-[#27272a] hover:border-[#4b5563] hover:bg-[rgba(19,19,19,0.9)] transition-all duration-300 ease-in-out px-6 text-white fixed w-[90%] z-10 top-5 left-1/2 -translate-x-1/2 rounded-[15px] backdrop-blur-md shadow-[0px_5px_15px_rgba(0,0,0,0.7)]">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center h-16">
                    <div className="text-xl font-bold">EGARWORKS</div>

                    <div className="hidden md:flex space-x-6">
                        <a href="#about">About</a>
                        <a href="#skills">Skills</a>
                        <a href="#projects">Projects</a>
                        <a href="#contact">Contact</a>
                    </div>

                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="focus:outline-none text-2xl" 
                            aria-label="Toggle menu"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? "max-h-64 pb-4" : "max-h-0"} overflow-hidden transition-all duration-500 ease-in-out md:hidden`}>
                <a href="#about" className="block py-2">About</a>
                <a href="#skills" className="block py-2">Skills</a>
                <a href="#projects" className="block py-2">Projects</a>
                <a href="#contact" className="block py-2">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;