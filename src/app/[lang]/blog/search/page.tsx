import { fetchContent } from '@/cms/blog-page';
import { AvailableLangType, defaultLocale, mapLangToLocale } from '@/cms/types';
import BlogFilteredList from '@/components/blog/blog-filtered-list';
import BlogList from '@/components/blog/blog-list';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { lang: string } }) {
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  if (!locale) {
    return false
  }

  const pageContent = await fetchContent()
  const localizedContent = pageContent[locale] || pageContent[defaultLocale]

  return (
    <BlogList
      locale={locale}
      localizedContent={localizedContent}
    >
      <Suspense fallback={<div></div>}>
        <BlogFilteredList
          locale={locale}
          localizedContent={localizedContent}
        />
      </Suspense>
    </BlogList>
  )
}
