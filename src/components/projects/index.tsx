import Image from "next/image";
import "./projects.css";
import projectsData from "@/data/projects/projectsData.json";

interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
}

const ProjectCard: React.FC<Project> = ({
    title,
    description,
    image,
    link,
}) => {
    return (
        <div data-aos="fade-up">
            <div className="project-card border border-[#27272a] hover:border-[#4b5563] hover:shadow-[0_8px_24px_rgba(1,57,211,0.5)] hover:-translate-y-[5px] transition-all duration-300 ease-in-out rounded-lg overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        width={800}
                        height={500}
                        className="w-full h-auto"
                    />
                ) : (
                    <div className="bg-[rgb(10,10,10)] border-b border-b-[#27272a] flex items-center justify-center h-[150px]">
                        <span className="text-gray-500">No Image</span>
                    </div>
                )}

                <div className="relative project-caption pt-3 px-4 pb-4">
                    <h2 className="font-bold mb-2 text-lg">{title}</h2>
                    <p className="text-gray-400 mb-4 text-[14px] leading-6">{description}</p>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[rgb(1,57,211)] text-center text-[15px] w-[100%] sm:w-20 p-2 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                    >
                        Visit
                    </a>
                </div>
            </div>
        </div>
    );
};

const Projects: React.FC = () => {
    const projects: Project[] = projectsData;

    return (
        <section className="section-container" id="projects">
            <h1 className="mb-7 font-bold text-3xl">Projects.</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;