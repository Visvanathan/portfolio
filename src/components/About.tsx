export default function About() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="uppercase mb-10 text-3xl text-center md:text-4xl  lg:tracking-[-4px] header-leading font-berthold">About Me</h2>
      <div className="flex flex-col-reverse md:flex-row gap-1">
      <div className="flex-2">
        <h2 className='text-3xl  mb-2'>Hi, I'm <strong>Visvanathan D</strong></h2>
        <p>I am an experienced Laravel Developer with over 7 years of deep Laravel expertise and 12+ years of overall PHP development experience, focused on building scalable, secure, and high-performance web applications. Throughout my career, I’ve solved complex technical problems for businesses in various domains—from healthcare and eCommerce to logistics and booking systems—by applying modern backend development principles, optimized architecture, and clean coding standards.</p>
      </div>
      <div className="flex-1 text-center flex flex-col items-center ">
        <div className="bg-indigo dark:bg-dark-indigo rounded-full w-[130px] h-[130px] flex items-center justify-center ">
          <span className="text-cream dark:text-dark-cream font-medium text-9xl ">12</span>
        </div>
        <h3 className="text-reddish-brown dark:text-white text-3xl mt-4">
          Years of <strong>Experience</strong>
        </h3>
      </div>
    </div>
    </section>
  )
}
