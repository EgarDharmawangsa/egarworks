import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills"
import Projects from "@/components/projects";
import Contact from "@/components/contact"

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;