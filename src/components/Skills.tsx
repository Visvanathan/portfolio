import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import skillsData from '../data/skills.json'

interface Skill {
  name: string
  category: string
  level: number
}
const categories = ['Frontend', 'Backend','Database','DevOps','Testing','Tools','Integration'];
export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    setSkills(skillsData)
  }, [])

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-semibold mb-6">My Skills</h2>
       <Tabs>
        <TabList className="flex flex-wrap gap-2 justify-center sm:justify-center sm:overflow-x-auto sm:whitespace-nowrap mb-6 px-2">
          {categories.map((cat, i) => (
            <Tab
              key={i}
              className="px-4 py-2 cursor-pointer rounded-md border text-gray-700 "
              selectedClassName="bg-blue-500 text-white"
            >
              {cat}
            </Tab>
          ))}
        </TabList>
        {categories.map((category, i) => (
          <TabPanel key={i}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-4 bg-white shadow rounded-xl"
                  >
                    <div className="w-24 h-24 mb-3">
                      <CircularProgressbar
                        value={skill.level}
                        text={`${skill.level}%`}
                        styles={buildStyles({
                          pathColor: '#3b82f6',
                          textColor: '#1f2937',
                          trailColor: '#d1d5db'
                        })}
                      />
                    </div>
                    <span className="font-medium text-gray-800 text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
            </div>
          </TabPanel>
        ))}
        </Tabs>
    </section>
  )
}
