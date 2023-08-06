import { AvailableLangType, mapLangToLocale } from "@/cms/types";
import BlogStaticPage from "@/components/blog/blog-static-page";

export default function Page({
  params,
}: {
  params: { lang: string; page: string };
}) {
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  const pageNum = parseInt(params.page);
  if (!locale || !pageNum) {
    return false;
  }

  return <BlogStaticPage locale={locale} page={pageNum} />;
}
