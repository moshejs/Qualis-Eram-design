import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Frank_Ruhl_Libre } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n';
import Header from './components/Header';
import Footer from './components/Footer';
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

export const metadata: Metadata = {
  title: 'Reno · Qualis Eram',
  description: 'Furniture, made one at a time.',
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
      </body>
    </html>
  );
}
