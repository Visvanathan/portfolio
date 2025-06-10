import { useEffect, useState } from 'react'
import { Timeline } from 'primereact/timeline';
import experiencesData from '../data/experience.json'

interface Experiances {
  title: string
  company: string
  date: string
  details: string
}

export default function Hero() {
      const [experiences, setExperiences] = useState<Experiances[]>([])

  useEffect(() => {
    setExperiences(experiencesData)
  }, [])
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto" >
        <h2 className="mb-10 text-5xl text-center md:text-6xl lg:text-[80px] text-indigo lg:tracking-[-4px] header-leading">A summary of My Resume</h2>
        <Timeline align="alternate"className="customized-timeline" value={experiences} content={(experience) => (
            <div>
            <h3 className="font-semibold ">{experience.title}</h3>
            <p className="text-sm">{experience.company}</p>
            <p className="text-xs mt-1">{experience.date}</p>
            <div
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: experience.details }}
            ></div>
            </div>
        )}
        />
    </section>
  )
}
