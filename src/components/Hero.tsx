import React from 'react'
import MultiTypewriter from '../common/MultiTypewriter';
import { Button } from 'primereact/button';
import picture from '../assets/vishwa.jpeg';
export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center px-4 bg-white relative isolate " >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-16 items-center w-full max-w-7xl">
        <div className="text-left lg:order-1 order-2 ">
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6'>Hello There!</h1>
            <h1 className='uppercase font-bold text-4xl py-3 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent'>I'm <MultiTypewriter
                texts={[
                  'Visvanathan D',
                  'a Full-Stack Developer',
                  'a Laravel Developer',
                ]}
                speed={80}
                pause={1500}
                className="text-4xl"
              />
            </h1>
            <p className='text-gray-600 dark:text-gray-300 mb-10 '>I am a dedicated software developer with over 12 years of experience in web application<br/> development,including 7 years specializing in Laravel. I have a strong background in developing<br/> scalable and efficient applications using PHP and MySQL.</p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button className='px-8 py-4 rounded-full border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all flex items-center justify-center gap-2 group' label="My Works" icon="pi pi-arrow-down" />
              <a href='https://www.linkedin.com/in/visvanathan-d/' target='_blank'><i className="text-[20px]-important pi pi-linkedin"></i></a>
              <a href='https://github.com/Visvanathan' target='_blank'><i className="pi pi-github"></i></a>
            </div>
        </div>
        <div className="relative order-1 flex justify-center">
          <div className='relative rounded-full overflow-hidden border-4 md:border-8 border-white dark:border-gray-800 shadow-xl lg:shadow-2xl'>
            <img className='w-32 h-32 md:w-64 md:h-150 lg:w-100 lg:h-100 object-cover' src={picture} />
          </div>
        </div>
      </div>
    </section>
    
  )
}
