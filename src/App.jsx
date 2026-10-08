import { useParallaxEngine, useReveals, useReducedMotion } from "./hooks.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const reduced = useReducedMotion();
  useParallaxEngine(reduced);
  useReveals();

  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
