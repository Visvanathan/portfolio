import React from 'react'

export default function About() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-semibold mb-4">Know Me More</h2>
      <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="w-1/1 p-4 col-span-3">
        <h2>Hi, I'm <span>Visvanathan D</span></h2>
        <p>I'm a designer &amp; developer with a passion for web design. I enjoy developing simple, clean and slick websites that provide real value to the end user. Thousands of clients have procured exceptional results while working with me. Delivering work within time and budget which meets client’s requirements is our moto.</p>
      </div>
      <div className="md:w-1/3 p-4">
        <div><div><span>12+</span></div><h3>Years of <span>Experiance</span></h3></div>
      </div>
    </div>
    </section>
  )
}
