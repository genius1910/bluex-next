import Home from '@/components/home/home'
import { fetch } from '@/cms/home'
import { AvailableLangType, mapLangToLocale } from '@/cms/types'

export default async function Page({ params }: { params: { lang: string } }) {
  const content = await fetch()
  const locale = mapLangToLocale(params.lang as AvailableLangType);

  if (!locale) {
    return false
  }

  return (
    <Home
      content={content}
      locale={locale}
    />
  )
}
