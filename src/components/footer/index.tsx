import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <footer className="relative py-6">
            <h1 className="text-center text-gray-300">
                Dikembangkan oleh I Komang Egar Suarama Dharmawangsa.
            </h1>

            <div className="flex justify-center items-end absolute -z-50 bottom-0 w-full h-[50rem] bg-gradient-to-t from-[rgb(0,31,85)] to-[rgba(0,30,80,0.0)]">
                <Image
                    src="/images/footer/egarworks.svg"
                    alt="EGARWORKS"
                    className="opacity-10 w-full"
                    width={1000}
                    height={500}
                />
            </div>
        </footer>
    );
};

export default Footer;