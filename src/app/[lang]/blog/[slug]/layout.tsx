import { fetchSlugs } from "@/cms/blog-search";
import { fetchLocales } from "@/cms/langs";
import { AvailableLangType, mapLangToLocale } from "@/cms/types";
import Header from "@/components/header/header";

export async function generateStaticParams() {
  const slugs = await fetchSlugs();
  return slugs.map((slug) => ({
    slug: slug.Url,
  }));
}

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
      <Header locale={locale} background="white" />
      <main>{children}</main>
    </>
  );
}
