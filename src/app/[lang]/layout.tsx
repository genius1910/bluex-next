import {
  AvailableLangType,
  availableLangs,
  mapLangToLocale,
} from "@/cms/types";
import Header from "@/components/header/header";

export async function generateStaticParams() {
  return availableLangs.map((lang) => ({ lang }));
}

export default async function RootLayout({
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
    <html lang={params.lang}>
      <body>
        {children}
      </body>
    </html>
  );
}
