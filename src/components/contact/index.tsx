import { FaPhone, FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

interface Contact {
    link: string;
    icon: React.ReactNode;
}

const contactData: Contact[] = [
    { link: "mailto:dharmawangsaegar@gmail.com", icon: <MdEmail className="text-xl" /> },
    { link: "https://github.com/EgarDharmawangsa", icon: <FaGithub className="text-xl" /> },
    { link: "https://linkedin.com/in/egar-dharmawangsa", icon: <FaLinkedin className="text-xl" /> },
    { link: "https://instagram.com/gazzelll_", icon: <FaInstagram className="text-xl" /> },
    { link: "https://facebook.com/egar.dharmawangsa", icon: <FaFacebook className="text-xl" /> },
    { link: "https://x.com/EgarBalliztic", icon: <FaXTwitter className="text-xl" /> }
];


const Contact: React.FC = () => {
    return (
        <div className="bg-[rgba(10,10,10,0.5)] backdrop-blur-md border-t border-t-[#27272a] text-white py-10 px-6 lg:px-24 mt-6" id="contact">
            <h2 className="mb-10 font-bold text-3xl text-center">Contact.</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h2 className="mb-3 font-bold text-xl">Get in Touch</h2>

                    <div className="max-w-md flex items-center justify-around mb-5 p-3 bg-[rgb(10,10,10)] border border-[#27272a] rounded-full shadow-[0px_5px_15px_rgb(0,0,0)]">
                        <FaPhone className="text-lg" />

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

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.4145083368517!2d115.2244157745681!3d-8.652068388013772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24083046234a3%3A0x6755e48bb38887b!2sJl.%20Pacar%20No.11%2C%20Sumerta%20Kauh%2C%20Kec.%20Denpasar%20Tim.%2C%20Kota%20Denpasar%2C%20Bali%2080236!5e0!3m2!1sid!2sid!4v1776054314117!5m2!1sid!2sid"
                        className="w-full h-60 rounded-[15px] border border-[#27272a] rounded-[15px] shadow-[0px_5px_15px_rgb(0,0,0)]"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <div className="bg-[rgb(10,10,10)] border border-[#27272a] rounded-[15px] shadow-[0px_5px_15px_rgb(0,0,0)] p-5">
                    <h2 className="mb-6 font-bold text-xl text-center">Send me a message</h2>

                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Your Name..."
                            className="p-3 bg-[rgb(10,10,10)] border border-[#27272a] rounded-lg"
                        />
                        <input
                            type="email"
                            placeholder="Your Email..."
                            className="p-3 bg-[rgb(10,10,10)] border border-[#27272a] rounded-lg"
                        />
                        <textarea
                            placeholder="Your Message..."
                            className="p-3 bg-[rgb(10,10,10)] border border-[#27272a] rounded-lg"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-[rgb(1,57,211)] py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;