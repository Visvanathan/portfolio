import React,{ useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Work from './components/Work';
import Footer from './components/Footer';

function App() {
  const workRef = useRef<HTMLDivElement>(null);

  return (
    <div className='bg-cream bg-[url(/bg-noice.png)] text-indigo'>
      <Hero workRef={workRef as React.RefObject<HTMLDivElement>} />
      <About />
      <Skills />
      <Experience />
      <Work ref={workRef} />
      <Footer />
    </div>
  );
}

export default App;
