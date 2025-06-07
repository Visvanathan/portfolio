import React, { useEffect, useState } from 'react'
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
        <h2 className="text-center text-3xl font-semibold mb-4">A summary of My Resume</h2>
        <Timeline align="alternate"className="customized-timeline" value={experiences} content={(experience) => (
            <div className='text-left'>
            <h3 className="font-semibold text-gray-800">{experience.title}</h3>
            <p className="text-sm text-gray-600">{experience.company}</p>
            <p className="text-xs text-gray-500 mt-1">{experience.date}</p>
            <div
                className="text-sm text-gray-700 mt-2"
                dangerouslySetInnerHTML={{ __html: experience.details }}
            ></div>
            </div>
        )}
        />
    </section>
  )
}
