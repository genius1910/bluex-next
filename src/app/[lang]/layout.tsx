import {
  AvailableLangType,
  availableLangs,
  mapLangToLocale,
} from "@/cms/types";
import Header from "@/components/header/header";
import { Metadata, ResolvingMetadata } from "next";

export async function generateStaticParams() {
  return availableLangs.map((lang) => ({ lang }));
}

export async function generateMetadata(
  { params }: {
    params: { lang: string };
  parent: ResolvingMetadata
},
): Promise<Metadata> {
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  if (!locale) {
    return {};
  }

  return {
    other: {
      "Content-Language": locale
    }
  }
}

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
        <Header locale={locale} />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
