'use client';

import { useState, useCallback } from 'react';
import { worksByDateDesc } from '@/lib/works';
import type { Work } from '@/lib/types';
import WorkCard from './WorkCard';
import Lightbox from './Lightbox';

export default function Gallery() {
  const [openWork, setOpenWork] = useState<Work | null>(null);
  const items = worksByDateDesc();

  const handleOpen = useCallback((w: Work) => setOpenWork(w), []);
  const handleClose = useCallback(() => setOpenWork(null), []);

  const handleNeighbor = useCallback(
    (delta: 1 | -1) => {
      setOpenWork((current) => {
        if (!current) return current;
        const idx = items.findIndex((w) => w.id === current.id);
        if (idx === -1) return current;
        const next = (idx + delta + items.length) % items.length;
        return items[next];
      });
    },
    [items],
  );

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 sm:px-10 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-10 gap-y-12 sm:gap-y-16">
          {items.map((work, i) => (
            <WorkCard
              key={work.id}
              work={work}
              index={i}
              span={i % 5 === 2 ? 'tall' : 'normal'}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </section>

      {openWork && (
        <Lightbox work={openWork} onClose={handleClose} onNeighbor={handleNeighbor} />
      )}
    </>
  );
}
