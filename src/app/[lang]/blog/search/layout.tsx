import { AvailableLangType, mapLangToLocale } from "@/cms/types";
import Header from "@/components/header/header";

export default async function Layout({
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
    <>
      <Header locale={locale} />
      <main>{children}</main>
    </>
  );
}
