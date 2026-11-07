import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import { contactMailConfigured } from "@/lib/contact-mail";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact emailEnabled={contactMailConfigured()} />
    </>
  );
};

export default Home;
