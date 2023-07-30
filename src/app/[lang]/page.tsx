import Home from '@/components/home'
import { fetch as fetchHeader } from '@/cms/header'
import { fetch } from '@/cms/home'
import { fetchLocales } from '@/cms/langs'
import { AvailableLangType, mapLangToLocale } from '@/cms/types'

export default async function Page({ params }: { params: { lang: string } }) {
  const allLocales = await fetchLocales()
  const headerContent = await fetchHeader()
  const content = await fetch()
  const locale = mapLangToLocale(params.lang as AvailableLangType);

  if (!locale) {
    return false
  }

  return (
    <Home
      headerContent={headerContent}
      content={content}
      locale={locale}
      allLocales={allLocales}
    />
  )
}
