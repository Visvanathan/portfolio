import React, { forwardRef, useEffect, useRef, useState } from 'react';
import workData from '../data/work.json';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Galleria } from 'primereact/galleria';
import { Dialog } from 'primereact/dialog';

interface WorkItem {
  title: string;
  image: string;
  image_dir?: string;
  gallery?: string[];
  details?: string;
  link: string;
}

// Load all images from /public/work/ recursively
const allWorkImages = import.meta.glob('/public/work/**/*.{png,jpg,jpeg,webp,svg}', {
  as: 'url',
  eager: true,
});

export default forwardRef(function Work(_, ref: React.Ref<HTMLDivElement>) {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

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

    setTimeout(() => {
      galleriaRef.current?.show();
    }, 100);
  };

  const handleReadProject = (work: WorkItem) => {
    setSelectedWork(work);
    setDialogVisible(true);
  };

  const itemTemplate = (item: any) => (
    <img
      src={item.itemImageSrc}
      alt={item.alt}
      className="object-contain h-screen max-h-dvh w-auto max-w-lvh"
      loading="lazy"
    />
  );

  return (
    <section ref={ref} className="max-w-7xl mx-auto p-10">
      <h2 className="uppercase mb-10 text-3xl text-center md:text-4xl  lg:tracking-[-4px] header-leading">
        Some of my most recent projects
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {works.map((work, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <Card
              className="w-full"
              title={
                <a href={work.link} target="_blank" rel="noopener noreferrer" className="my-5 ">
                  {work.title}
                </a>
              }
              header={<img src={work.image} alt={work.title} className="h-60 object-cover object-top-left" />}
              footer={
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    className="w-full bg-indigo dark:bg-dark-cream p-2 text-white cursor-pointer"
                    label="Read More"
                    onClick={() => handleReadProject(work)}
                    unstyled
                  />
                  <Button
                    className="w-full bg-reddish-brown p-2 text-white cursor-pointer"
                    label="Preview"
                    onClick={() => handleViewProject(work)}
                    unstyled
                  />
                </div>
              }
              role="region"
            >
              <p className="text-indigo">
                {work.details?.slice(0, 100) ?? 'No details available'}...
              </p>
            </Card>
          </div>
        ))}
      </div>

      {/* Galleria Fullscreen */}
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
      />

      {/* Dialog for Read Project */}
      <Dialog
        header={selectedWork?.title}
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        style={{ width: '50vw' }}
      >
        <p className="text-indigo whitespace-pre-line">{selectedWork?.details}</p>
        {selectedWork?.link && (
          <a
            href={selectedWork.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-indigo underline"
          >
            Visit Site
          </a>
        )}
      </Dialog>
    </section>
  );
});
