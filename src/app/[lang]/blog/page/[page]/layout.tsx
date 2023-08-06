import { fetchStats } from "@/cms/blog-search";
import { AvailableLangType, mapLangToLocale } from "@/cms/types";
import { range } from "@/lib/tools";

export async function generateStaticParams() {
  const stats = await fetchStats();
  return range(stats.totalPages).map((page) => ({
    page: `${page}`,
  }));
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{ children }</>;
}
