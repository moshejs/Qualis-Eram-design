import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Frank_Ruhl_Libre } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n';
import { studio } from '@/lib/works';
import Header from './components/Header';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const frank = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-frank',
  display: 'swap',
});

const SITE_URL = 'https://qualiseramdesign.com';
const SITE_DESCRIPTION =
  'Bespoke furniture in walnut, cherry, ash and salvage. Studio and commissioned pieces — hand-built, one at a time. Established 2012.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${studio.name} · Bespoke Furniture`,
    template: `%s · ${studio.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'bespoke furniture',
    'custom woodworking',
    'fine furniture maker',
    'handmade cabinetry',
    'commissioned furniture',
    'live-edge dining table',
    'walnut chest',
    'cherry wardrobe',
    'parquet table',
    'lacewood built-in',
    'Edward Reno',
    'Qualis Eram Design',
    'ars longa vita brevis',
  ],
  authors: [{ name: 'Edward Reno' }],
  creator: 'Edward Reno',
  publisher: studio.name,
  applicationName: studio.name,
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      he: '/',
      la: '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: studio.name,
    title: `${studio.name} · Bespoke Furniture`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: `${studio.name} — bespoke furniture`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${studio.name} · Bespoke Furniture`,
    description: SITE_DESCRIPTION,
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
};

const localeBootstrap = `
(function(){
  try {
    var l = localStorage.getItem('reno.locale');
    if (l !== 'en' && l !== 'he' && l !== 'la') l = 'en';
    var html = document.documentElement;
    html.lang = l;
    html.dir = l === 'he' ? 'rtl' : 'ltr';
    html.dataset.locale = l;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${cormorant.variable} ${inter.variable} ${frank.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: localeBootstrap }} />
        <I18nProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
        <StructuredData />
      </body>
    </html>
  );
}
