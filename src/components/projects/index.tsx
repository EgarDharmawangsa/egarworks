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
            <div className="border border-[#27272a] hover:border-[#4b5563] hover:shadow-[0_8px_24px_rgba(1,57,211,0.5)] hover:-translate-y-[5px] transition-all duration-300 ease-in-out rounded-lg overflow-hidden">
                {image ? (
                    <Image 
                        src={image} 
                        alt={title} 
                        width={800} 
                        height={500} 
                        className="w-full h-auto" 
                    />
                ) : (
                    <div className="bg-[rgba(10,10,10,0.7)] border-b border-b-[#27272a] flex items-center justify-center h-[150px]">
                        <span className="text-gray-500">No Image</span>
                    </div>
                )}

                <div className="relative project-caption p-4">
                    <h5 className="font-bold mb-2 text-xl">{title}</h5>
                    <p className="text-gray-400 mb-4">{description}</p>
                    <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-[rgb(1,57,211)] mr-2 py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out"
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
        <div className="section-container" id="projects">
            <h2 data-aos="fade-right" className="mb-7 font-bold text-3xl">Projects.</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </div>
    );
};

export default Projects;