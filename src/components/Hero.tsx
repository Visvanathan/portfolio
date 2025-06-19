import React, { useEffect, useState } from 'react';
import MultiTypewriter from '../common/MultiTypewriter';
import picture from '../assets/vishwa.jpeg';


import { FiSun, FiMoon } from 'react-icons/fi';

export default function Hero({ workRef }: { workRef: React.RefObject<HTMLDivElement | null> }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (stored === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      // No preference stored, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const scrollToWork = () => {
    workRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
      {/* Dark mode toggle button with icon */}
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
        className="fixed top-4 right-4 z-50 p-3  text-white rounded-full shadow-lg cursor-pointer"
      >
        {isDark ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-16 items-center w-full max-w-7xl">
        <div className="text-center sm:text-center md:text-left lg:order-1 order-2">
          <h5 className="text-3xl ">Hello There!</h5>
          <h1 className="uppercase font-bold text-4xl py-3">
            I'm{' '}
            <MultiTypewriter
              texts={['Visvanathan D', 'a Full-Stack Developer', 'a Laravel Developer','a TALL stack Developer']}
              speed={80}
              pause={1500}
              className="text-4xl"
            />
          </h1>
          <p className="mb-10">
            I am a dedicated software developer with over 12 years of experience in web application development, including 7 years specializing in Laravel...
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button onClick={scrollToWork} className='px-8 py-3  border-indigo border-2 cursor-pointer rounded-2xl dark:border-dark-indigo'>View My Works</button>
            <a href="https://www.linkedin.com/in/visvanathan-d/" target="_blank" rel="noopener noreferrer" className="text-4xl">
              <i className="pi pi-linkedin" style={{ fontSize: '2rem' }}></i>
            </a>
            <a href="https://github.com/Visvanathan" target="_blank" rel="noopener noreferrer" className="text-4xl">
              <i className="pi pi-github" style={{ fontSize: '2rem' }}></i>
            </a>
          </div>
        </div>
        <div className="relative order-1 flex justify-center perspective-[800px] sm:mb-10">
             <div className="transform-3d rotate-y-0 hover:rotate-y-12 transition-transform duration-500">
                <div className="overflow-hidden border-8 border-white dark:border-dark-indigo  shadow-2xl rounded-lg">
                  <img className="object-cover w-[30rem] h-auto" src={picture} alt="Visvanathan D" />
                </div>
            </div>
        </div>
      </div>
      <div className='fixed flex dark:bg-dark-cream bg-cream shadow-xl/10 px-5 py-3 md:py-6 my-2 w-auto border-1 border-cream dark:border-dark-indigo rounded-2xl bottom-2 z-40 text-center items-center bg-[url(/bg-noice.png)] invisible sm:visible'>
          🚀 Currently building&nbsp;<span className="font-bold">Branzia E-Commerce</span>&nbsp;an open-source project focused on affordable online store solutions.&nbsp;<a href="https://github.com/Branzia" target="_blank" className="underline"><i aria-label='GitHub' className="pi pi-github" style={{ fontSize: '2rem' }}></i></a>
      </div>
    </section>
  );
}
