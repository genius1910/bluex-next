import { fetchContent } from '@/cms/blog-page';
import { AvailableLangType, defaultLocale, mapLangToLocale } from '@/cms/types';
import BlogSearchPage from '@/components/blog/blog-search-page';

export default async function Page({ params }: { params: { lang: string } }) {
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  if (!locale) {
    return false
  }

  const pageContent = await fetchContent()
  const localizedContent = pageContent[locale] || pageContent[defaultLocale]

  return (
    <BlogSearchPage
      locale={locale}
      localizedContent={localizedContent}
    />
  )
}
