import Nav from './components/Nav';
import Hero from './components/Hero';
import Story from './components/Story';
import Work from './components/Work';
import Branzia from './components/Branzia';
import Principles from './components/Principles';
import Toolkit from './components/Toolkit';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useReveal } from './hooks/useReveal';
import { useCleanAnchors } from './hooks/useCleanAnchors';

export default function App() {
  useReveal();
  useCleanAnchors();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-teal focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Story />
        <Work />
        <Branzia />
        <Experience />
        <Principles />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
