import { fetchContent } from '@/cms/blog-page';
import { AvailableLangType, defaultLocale, mapLangToLocale } from '@/cms/types';
import BlogStaticPage from '@/components/blog/blog-static-page';

export default async function Page({ params }: { params: { lang: string, page: string } }) {
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  const pageNum = parseInt(params.page)
  if (!locale || !pageNum) {
    return false
  }

  const pageContent = await fetchContent()
  const localizedContent = pageContent[locale] || pageContent[defaultLocale]

  return (
    <BlogStaticPage
      locale={locale}
      localizedContent={localizedContent}
      page={pageNum}
    />
  )
}
