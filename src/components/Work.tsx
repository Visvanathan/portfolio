import React, { forwardRef, useEffect, useRef, useState } from 'react';
import workData from '../data/work.json';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Galleria } from 'primereact/galleria';
import { Dialog } from 'primereact/dialog';
import parse from 'html-react-parser';

interface WorkItem {
  title: string;
  image: string;
  image_dir?: string;
  gallery?: string[];
  summary?: string;
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
  const [galleriaIndex, setGalleriaIndex] = useState(0);
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
      .sort((a, b) => {
        const nameA = a.split('/').pop()?.toLowerCase() || '';
        const nameB = b.split('/').pop()?.toLowerCase() || '';
        const numA = parseInt(nameA.match(/\d+/)?.[0] || '0', 10);
        const numB = parseInt(nameB.match(/\d+/)?.[0] || '0', 10);
        return numA - numB;
      });

    const formattedItems = matchedImages.map((img) => ({
      itemImageSrc: img,
      thumbnailImageSrc: img,
      alt: work.title,
    }));

    setGalleryItems(formattedItems);
    setGalleriaIndex(0);

    // Use ref to show the Galleria
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
      <h2 className="uppercase mb-10 text-3xl text-center md:text-4xl lg:tracking-[-4px] header-leading">
        Some of my most recent projects
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {works.map((work, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <Card
              className="w-full"
              title={
                <a href={work.link} target="_blank" rel="noopener noreferrer" className="my-5">
                  {work.title}
                </a>
              }
              header={
                <img
                  src={work.image}
                  alt={work.title}
                  onClick={() => handleViewProject(work)}
                  className="h-70 object-cover object-top-left cursor-pointer"
                />
              }
              footer={
                <div className="grid grid-cols-1 gap-4">
                  <Button
                    className="w-full bg-indigo dark:bg-dark-cream p-2 text-white cursor-pointer hidden"
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
              <p className="text-indigo hidden">
                {work.summary ? work.summary.slice(0, 100) + '...' : 'No details available'}
              </p>
            </Card>
          </div>
        ))}
      </div>

      {/* Galleria Fullscreen (always rendered but hidden until show() is called) */}
      <Galleria
        ref={galleriaRef}
        value={galleryItems}
        activeIndex={galleriaIndex}
        onItemChange={(e) => setGalleriaIndex(e.index)}
        numVisible={5}
        fullScreen
        circular
        transitionInterval={3000}
        autoPlay
        showItemNavigators
        showThumbnails={false}
        item={itemTemplate}
        onHide={() => setGalleryItems([])}
      />

      {/* Dialog for Read Project */}
      <Dialog
        header={selectedWork?.title}
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        style={{ width: '50vw' }}
      >
        <p className="text-indigo whitespace-pre-line">
          {selectedWork?.details && parse(selectedWork.details)}
        </p>
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
