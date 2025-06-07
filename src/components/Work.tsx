import React, { useEffect, useState } from 'react'
import workData from '../data/work.json'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';

        
interface WorkItem {
  title: string
  image: string
  link: string
}

export default function Work() {
  const [work, setWork] = useState<WorkItem[]>([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setWork(workData)
  }, [])

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-center  text-3xl font-semibold mb-6">Some of my most recent projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {work.map((item, idx) => (
          <div className="flex justify-content-center">
            <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                  <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            </Dialog>  
            <Card title={<a href={item.link} target='_blank'>{item.title}</a> } header= {<Image src={item.image} alt={item.title} className='w-full' />} footer={<div className="flex justify-content-start w-full"><Button className='w-full' label="View Project" icon="pi pi-arrow-up-right-and-arrow-down-left-from-center" onClick={() => setVisible(true)} /></div>} role="region" >
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque</p>
            </Card> 
        </div>
        ))}
      </div>
    </section>
  )
}
