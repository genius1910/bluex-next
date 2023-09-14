import {
  AvailableLangType,
  availableLangs,
  mapLangToLocale,
} from '@/cms/types';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { Metadata, ResolvingMetadata } from 'next';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  if (!locale) {
    return false;
  }

  return (
    <html lang={locale}>
      <body>
        <Header
          locale={locale}
        />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
