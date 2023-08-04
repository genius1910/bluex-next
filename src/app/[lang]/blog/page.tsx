import { fetchContent } from '@/cms/blog-page';
import { AvailableLangType, defaultLocale, mapLangToLocale } from '@/cms/types';
import BlogStaticPage from '@/components/blog/blog-static-page';

export default async function Page({ params }: { params: { lang: string } }) {
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  if (!locale) {
    return false
  }

  const pageNum = 1
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
