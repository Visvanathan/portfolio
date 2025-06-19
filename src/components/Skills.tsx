import { useEffect, useState } from 'react'
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
    <section className="max-w-8xl mx-15 p-10 bg-indigo rounded-4xl">
      <h2 className="uppercase mb-10 text-3xl text-center md:text-4xl   lg:tracking-[-4px] header-leading text-white ">My Skills</h2>
       <Tabs>
        <TabList className="flex flex-wrap gap-2 justify-center sm:justify-center sm:overflow-x-auto sm:whitespace-nowrap mb-10 px-2 font-BertholdScript">
          {categories.map((cat, i) => (
            <Tab key={i} className="px-4 py-2 cursor-pointer border-6 border-double border-cream shadow-2xl rounded-lg text-cream " selectedClassName="bg-cream dark:bg-dark-cream text-indigo dark:text-dark-indigo">{cat}</Tab>
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
                    className="flex flex-col items-center p-4 "
                  >
                    <div className="w-24 h-24 mb-3">
                      <CircularProgressbar
                        value={skill.level}
                        text={`${skill.level}%`}
                        styles={buildStyles({
                          pathColor: '#ffffff',
                          textColor: '#ffffff',
                          trailColor: '#2C395B'
                        })}
                      />
                    </div>
                    <span className="font-medium text-white  text-center">{skill.name}</span>
                  </div>
                ))}
            </div>
          </TabPanel>
        ))}
        </Tabs>
    </section>
  )
}
