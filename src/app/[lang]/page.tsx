import { AvailableLangType, mapLangToLocale } from '@/fetchers/types'
import { fetch as fetchHeader } from '@/fetchers/header'
import { fetch } from '@/fetchers/home'
import Home from '@/components/home'
import { AvailableLocales } from '@/fetchers/types'

export default async function Page({ params }: { params: { lang: string } }) {
  const headerContent = await fetchHeader()
  const content = await fetch()
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  return (
    <Home
      headerContent={headerContent}
      content={content}
      locale={locale}
      availableLocales={[...AvailableLocales]}
    />
  )
}
