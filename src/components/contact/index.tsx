"use client"

import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface Contact {
    link: string;
    icon: React.ReactNode;
}

const contactData: Contact[] = [
    { link: "https://wa.me/6289524627369", icon: <FaWhatsapp className="text-[28px]" /> },
    { link: "mailto:dharmawangsaegar@gmail.com", icon: <MdEmail className="text-[28px]" /> },
    { link: "https://github.com/EgarDharmawangsa", icon: <FaGithub className="text-2xl" /> },
    { link: "https://linkedin.com/in/egar-dharmawangsa", icon: <FaLinkedin className="text-2xl" /> },
    { link: "https://instagram.com/gazzelll_", icon: <FaInstagram className="text-2xl" /> }
];


const Contact: React.FC = () => {
    // const sendEmail = async () => {
    //     const res = await fetch("/api/send-email", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             name: "John Doe",
    //             email: "3bOoC@example.com",
    //             message: "Hello, world!",
    //         }),
    //     });
    //     const data = await res.json();
    //     console.log(data);
    // };

    return (
        <section className="section-container" id="contact">
            <h2 data-aos="zoom-in" className="mb-7 font-bold text-3xl text-center">Contact.</h2>

            <div data-aos="fade-right" className="max-w-sm flex items-center justify-around mx-auto mb-4 p-3 bg-[rgb(10,10,10)] border border-[#27272a] rounded-full shadow-[0px_5px_15px_rgb(0,0,0)]">
                {contactData.map((contact, index) => (
                    <a
                        key={index}
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {contact.icon}
                    </a>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div data-aos="fade-up" className="bg-[rgb(10,10,10)] border border-[#27272a] rounded-[15px] shadow-[0px_5px_15px_rgb(0,0,0)] p-4">
                    <h2 className="mb-5 font-bold text-xl text-center">Send me a quick message</h2>

                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Your Name..."
                            className="p-3 bg-[rgb(10,10,10)] border border-[#27272a] rounded-lg"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email..."
                            className="p-3 bg-[rgb(10,10,10)] border border-[#27272a] rounded-lg"
                            required
                        />
                        <textarea
                            placeholder="Your Message..."
                            className="p-3 bg-[rgb(10,10,10)] border border-[#27272a] rounded-lg"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-[rgb(1,57,211)] mx-auto py-2 px-4 w-[100%] sm:w-45 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                <iframe
                    data-aos="zoom-in"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.4145083368517!2d115.2244157745681!3d-8.652068388013772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24083046234a3%3A0x6755e48bb38887b!2sJl.%20Pacar%20No.11%2C%20Sumerta%20Kauh%2C%20Kec.%20Denpasar%20Tim.%2C%20Kota%20Denpasar%2C%20Bali%2080236!5e0!3m2!1sid!2sid!4v1776054314117!5m2!1sid!2sid"
                    className="w-full h-full rounded-[15px] border border-[#27272a] rounded-[15px] shadow-[0px_5px_15px_rgb(0,0,0)]"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </section>
    );
}

export default Contact;