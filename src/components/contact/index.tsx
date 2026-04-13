import { FaPhone, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

const Contact: React.FC = () => {
    return (
        <div className="bg-[rgba(10,10,10,0.5)] backdrop-blur-md border-t border-t-[#27272a] text-white py-10 px-6 lg:px-24 mt-6" id="contact">
            <h2 className="mb-10 font-bold text-3xl text-center">Contact.</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="mb-5 font-bold text-2xl">Get in Touch</h2>

                    <div className="max-w-md flex items-center justify-around p-4 bg-[rgba(10,10,10)] border border-[#27272a] rounded-full shadow-[0px_5px_15px_rgb(0,0,0)]">
                        <FaPhone className="text-xl" />

                        <a href="mailto:your@email.com" aria-label="Email">
                            <MdEmail className="text-2xl" />
                        </a>
                        <a 
                            href="https://linkedin.com/in/yourusername" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="LinkedIn" 
                        >
                            <FaLinkedin className="text-2xl" />
                        </a>
                        <a 
                            href="https://instagram.com/yourusername" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="Instagram"
                        >
                            <FaInstagram className="text-2xl" />
                        </a>
                        <a 
                            href="https://facebook.com/yourusername" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="Facebook"
                        >
                            <FaFacebook className="text-2xl" />
                        </a>
                        <a 
                            href="https://twitter.com/yourusername" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="X (Twitter)"
                        >
                            <FaXTwitter className="text-2xl" />
                        </a>
                    </div>
                </div>

                <div className="bg-[rgba(10,10,10)] border border-[#27272a] rounded-[15px] shadow-[0px_5px_15px_rgb(0,0,0)] p-6">
                    <h2 className="mb-7 font-bold text-2xl">Send me a message</h2>
                </div>
            </div>
        </div>
    );
}

export default Contact;