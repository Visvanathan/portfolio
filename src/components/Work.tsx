import React, { forwardRef, useEffect, useState } from 'react';
import workData from '../data/work.json';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Galleria } from 'primereact/galleria';

interface WorkItem {
  title: string;
  image: string;
  gallery: string[];
  link: string;
}

export default forwardRef(function Work(_, ref: React.Ref<HTMLDivElement>) {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  useEffect(() => {
    setWorks(workData);
  }, []);

  const itemTemplate = (item: any) => (
    <img src={item.itemImageSrc} alt={item.alt} className="w-full" />
  );

  const thumbnailTemplate = (item: any) => (
    <img src={item.thumbnailImageSrc} alt={item.alt} style={{ width: '100px', display: 'block' }} />
  );

  return (
    <section ref={ref} className="max-w-7xl mx-auto p-10 ">
      <h2 className="mb-10 text-5xl text-center md:text-6xl lg:text-[80px] text-indigo lg:tracking-[-4px] header-leading">Some of my most recent projects</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {works.map((work, idx) => (
          <div key={idx} className="flex justify-center">
            <Card
              className=''
              title={<a href={work.link} target="_blank" rel="noopener noreferrer" className='my-5 text-indigo'>{work.title}</a>}
              header={<img src={work.image} alt={work.title} className="w-full rounded-2xl"/>}
              footer={
                <div className="flex justify-center w-full">
                  <Button
                    className="md:w-1/2 sm:w-full bg-indigo p-3 text-white cursor-pointer"
                    label="View Project"
                    onClick={() => {
                      setSelectedWork(work);
                      setVisible(true);
                    }}
                    unstyled
                  />
                </div>
              }
              role="region"
            >
              <p className='text-indigo'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae...
              </p>
            </Card>
          </div>
        ))}
      </div>

      <Dialog header={selectedWork?.title || ''} visible={visible} onHide={() => setVisible(false)} style={{ width: '80vw' }}>
        {selectedWork && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <Galleria
                value={selectedWork.gallery.map(img => ({
                  itemImageSrc: img,
                  thumbnailImageSrc: img,
                  alt: selectedWork.title,
                }))}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
                numVisible={5}
                style={{ maxWidth: '100%',color:'#2C395B'  }}
                showThumbnails
                showIndicators
              />
            </div>
            <div>
              <p className='text-indigo'>More details about the project can go here, like description, technologies, features, etc. More details about the project can go here, like description, technologies, features, etc. More details about the project can go here, like description, technologies, features, etc. More details about the project can go here, like description, technologies, features, etc. More details about the project can go here, like description, technologies, features, etc. More details about the project can go here, like description, technologies, features, etc.</p>
              <a href={selectedWork.link} className="mt-4 inline-block text-indigo underline" target="_blank" rel="noopener noreferrer">Visit Site</a>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
});
