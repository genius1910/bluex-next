import { AvailableLangType, mapLangToLocale } from "@/cms/types";
import BlogStaticPage from "@/components/blog/blog-static-page";

export default function Page({ params }: { params: { lang: string } }) {
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  if (!locale) {
    return false;
  }

  const pageNum = 1;

  return <BlogStaticPage locale={locale} page={pageNum} />;
}
