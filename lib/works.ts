import data from '@/data/works.json';
import type { Database, Work } from './types';

export const db = data as Database;

export const works = db.works;
export const studio = db.studio;

export function imageUrl(work: Work, imageIndex: number): string {
  return `/images/${work.folder}/${encodeURIComponent(work.images[imageIndex])}`;
}

export function primaryImageUrl(work: Work): string {
  return imageUrl(work, work.primaryImageIndex);
}

export function worksByDateDesc(): Work[] {
  return [...works].sort((a, b) => {
    const aKey = (a.year ?? 0) * 100 + (a.month ?? 0);
    const bKey = (b.year ?? 0) * 100 + (b.month ?? 0);
    return bKey - aKey;
  });
}
