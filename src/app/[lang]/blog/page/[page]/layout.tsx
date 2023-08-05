import { fetchStats } from "@/cms/blog-search"
import { AvailableLangType, mapLangToLocale } from "@/cms/types";
import Header from "@/components/header/header";
import { range } from "@/lib/tools"

export async function generateStaticParams() {
  const stats = await fetchStats()
  return range(stats.totalPages).map((page) => ({
    page: `${page}`
  }))
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
      <Header locale={locale} />
      <main>{children}</main>
    </>
  );
}
