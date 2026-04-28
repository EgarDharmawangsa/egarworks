import StackIcon from "tech-stack-icons";
import skillsData from "@/data/skills/skillsData.json";

type Variant = "light" | "dark";

interface Skill {
    name: string;
    variant: Variant;
    label: string;
}

const SkillItem: React.FC<Skill> = ({ name, variant, label }) => {
    return (
        <div data-aos="zoom-in">
            <div className="bg-[rgb(10,10,10)] border border-[#27272a] hover:border-[#4b5563] hover:bg-[rgb(19,19,19)] hover:shadow-[0_8px_24px_rgba(1,57,211,0.5)] hover:-translate-y-[5px] transition-all duration-300 ease-in-out rounded-full flex items-center justify-center py-4 px-5">
                <StackIcon 
                    name={name} 
                    variant={variant} 
                    className="w-[25px] h-[25px] mr-3 object-contain" 
                />
                <span>{label}</span>
            </div>
        </div>
    );
};

const Skills: React.FC = () => {
    const skills = skillsData as Skill[];

    return (
        <section className="section-container" id="skills">
            <h1 className="mb-7 font-bold text-3xl text-center">Skills.</h1>

            <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill, index) => (
                    <SkillItem key={index} {...skill} />
                ))}
            </div>
        </section>
    );
};

export default Skills;