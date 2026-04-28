"use client";

import { useState } from "react";
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface Contact {
    link: string;
    icon: React.ReactNode;
}

interface FormValues {
    name: string;
    email: string;
    message: string;
}

const contactData: Contact[] = [
    { link: "https://wa.me/6289524627369", icon: <FaWhatsapp className="text-[28px]" /> },
    { link: "mailto:dharmawangsaegar@gmail.com", icon: <MdEmail className="text-[28px]" /> },
    { link: "https://github.com/EgarDharmawangsa", icon: <FaGithub className="text-2xl" /> },
    { link: "https://linkedin.com/in/egar-dharmawangsa", icon: <FaLinkedin className="text-2xl" /> },
    { link: "https://instagram.com/gazzelll_", icon: <FaInstagram className="text-2xl" /> }
];

const Contact: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const values: FormValues = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
        };

        if (!values.name || !values.email || !values.message) {
            setStatus("Please fill out all the fields.");

            setTimeout(() => {
                setStatus("");
            }, 5000);

            return;
        }

        setLoading(true);
        setStatus("");

        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) throw new Error("Failed to send email");

            await res.json();

            setStatus("Message sent successfully!");

            console.log("Email sent successfully:", values);

            form.reset();
        } catch (error) {
            console.error(error);
            setStatus("Failed to send message.");
        } finally {
            setLoading(false);

            setTimeout(() => {
                setStatus("");
            }, 5000);
        }
    };

    return (
        <section className="section-container" id="contact">
            <h1 className="mb-7 font-bold text-3xl text-center">Contact.</h1>

            <div className="max-w-sm flex items-center justify-around mx-auto mb-4 p-3 bg-[rgb(10,10,10)] border border-[#27272a] rounded-full shadow-[0px_5px_15px_rgb(0,0,0)]">
                {contactData.map((contact, index) => (
                    <a key={index} href={contact.link} target="_blank" rel="noopener noreferrer">
                        {contact.icon}
                    </a>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[rgb(10,10,10)] border border-[#27272a] rounded-[15px] p-4 shadow-[0px_5px_15px_rgb(0,0,0)]">
                    <h2 className="mb-5 font-bold mb-2 text-lg text-center">Send me a quick message</h2>

                    <form onSubmit={sendEmail} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-2 text-[15px]">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name..."
                                className="text-[15px] p-2 rounded-lg border border-[#27272a] hover:border-[#4b5563] transition-border duration-300 ease-in-out"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-2 text-[15px]">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email..."
                                className="text-[15px] p-2 rounded-lg border border-[#27272a] hover:border-[#4b5563] transition-border duration-300 ease-in-out"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="message" className="mb-2 text-[15px]">Message</label>
                            <textarea
                                name="message"
                                placeholder="Your Message..."
                                className="text-[15px] p-2 rounded-lg border border-[#27272a] hover:border-[#4b5563] transition-border duration-300 ease-in-out"
                            />
                        </div>

                        {status && (
                            <p className={`${status.includes("successfully") ? "text-green-500" : "text-red-500"} text-center text-[15px]`}>
                                {status}
                            </p>
                        )}

                        <button type="submit" className="bg-[rgb(1,57,211)] text-[15px] mx-auto py-2 px-4 w-[100%] sm:w-45 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out" disabled={loading}>
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

                <iframe
                    data-aos="zoom-in"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.4145083368517!2d115.2244157745681!3d-8.652068388013772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24083046234a3%3A0x6755e48bb38887b!2sJl.%20Pacar%20No.11%2C%20Sumerta%20Kauh%2C%20Kec.%20Denpasar%20Tim.%2C%20Kota%20Denpasar%2C%20Bali%2080236!5e0!3m2!1sid!2sid!4v1776054314117!5m2!1sid!2sid"
                    className="w-full h-full rounded-[15px] border border-[#27272a] rounded-[15px] shadow-[0px_5px_15px_rgb(0,0,0)]"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </section>
    );
};

export default Contact;