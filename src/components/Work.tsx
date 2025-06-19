import React, { forwardRef, useEffect, useRef, useState } from 'react';
import workData from '../data/work.json';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Galleria } from 'primereact/galleria';

interface WorkItem {
  title: string;
  image: string;
  image_dir?: string;
  gallery?: string[];
  link: string;
}

// Load all images from public/work/... eagerly
const allWorkImages = import.meta.glob('/public/work/**/*.{png,jpg,jpeg,webp,svg}', {
  as: 'url',
  eager: true,
});

export default forwardRef(function Work(_, ref: React.Ref<HTMLDivElement>) {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const galleriaRef = useRef<any>(null);

 
  useEffect(() => {
    setWorks(workData);
  }, []);

  const handleViewProject = (work: WorkItem) => {
    if (!work.image_dir) return;

    const folderPath = '/public' + work.image_dir;

    const matchedImages = Object.entries(allWorkImages)
      .filter(([path]) => path.startsWith(folderPath))
      .map(([_, url]) => url as string)
      .sort();

    const formattedItems = matchedImages.map((img) => ({
      itemImageSrc: img,
      thumbnailImageSrc: img,
      alt: work.title,
    }));

    setGalleryItems(formattedItems);

    // Wait for galleryItems to update, then call .show()
    setTimeout(() => {
      galleriaRef.current?.show();
    }, 100);
  };

  const itemTemplate = (item: any) => (
    <img src={item.itemImageSrc} alt={item.alt}  className=" object-contain object-top h-screen w-auto max-w-dvh"  />
  );

  const thumbnailTemplate = (item: any) => (
    <img src={item.thumbnailImageSrc} alt={item.alt} className="w-20 h-20 object-cover object-top-left" />
  );

  return (
    <section ref={ref} className="max-w-7xl mx-auto p-10">
      <h2 className="mb-10 text-5xl text-center md:text-6xl lg:text-[80px] text-indigo lg:tracking-[-4px] header-leading">
        Some of my most recent projects
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {works.map((work, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <Card
              className="w-full"
              title={
                <a href={work.link} target="_blank" rel="noopener noreferrer" className="my-5 text-indigo">
                  {work.title}
                </a>
              }
              header={<img src={work.image} alt={work.title} className="w-full h-60 object-cover object-top" />}
              footer={
                <div className="flex justify-center w-full">
                  <Button
                    className="md:w-1/2 sm:w-full bg-indigo p-3 text-white cursor-pointer"
                    label="View Project"
                    onClick={() => handleViewProject(work)}
                    unstyled
                  />
                </div>
              }
              role="region"
            >
              <p className="text-indigo">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae...
              </p>
            </Card>
          </div>
        ))}
      </div>

      <Galleria
        ref={galleriaRef}
        value={galleryItems}
        numVisible={5}
        fullScreen
        circular 
        transitionInterval={3000}
        autoPlay 
        showItemNavigators
        showThumbnails={false}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </section>
  );
});
