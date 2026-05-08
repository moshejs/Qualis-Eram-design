export type Locale = 'en' | 'he' | 'la';

export type LocalizedString = Record<Locale, string>;

export type WorkType = 'studio' | 'commissioned';

export type Work = {
  id: string;
  ordinal: number;
  year: number | null;
  month: number | null;
  type: WorkType;
  folder: string;
  primaryImageIndex: number;
  images: string[];
  name: LocalizedString;
  material: LocalizedString;
  description: LocalizedString;
  techniques: string[];
};

export type Studio = {
  name: string;
  shortName: string;
  established: number;
  motto: LocalizedString;
  tagline: LocalizedString;
  about: LocalizedString;
  labels: {
    studio: LocalizedString;
    commissioned: LocalizedString;
  };
};

export type Database = {
  studio: Studio;
  works: Work[];
};
