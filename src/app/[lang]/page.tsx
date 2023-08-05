import { fetchHome } from "@/cms/home";
import { AvailableLangType, mapLangToLocale } from "@/cms/types";
import Header from "@/components/header/header";
import Home from "@/components/home/home";

export default async function Page({ params }: { params: { lang: string } }) {
  const content = await fetchHome();
  const locale = mapLangToLocale(params.lang as AvailableLangType);

  if (!locale) {
    return false;
  }

  return (
    <>
      <Header locale={locale} />
      <main>
        <Home content={content} locale={locale} />
      </main>
    </>
  );
}
