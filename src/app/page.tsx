import Home from '@/components/home/home'
import { fetch as fetchHeader } from '@/cms/header'
import { fetch } from '@/cms/home'
import { fetchLocales } from '@/cms/langs'
import { defaultLocale } from '@/cms/types'
import type { Metadata } from 'next'
import Header from '@/components/header/header'

// rendering the root page
// content has to idential to [lang]/page.tsx and set locale to en
export default async function Page() {
  const allLocales = await fetchLocales()
  const locale = allLocales.find(locale => locale.isDefault)?.code ?? defaultLocale
  const headerContent = await fetchHeader()
  const localizedHeaderContent = headerContent[locale]
  const content = await fetch()

  return (
    <html lang={locale}>
      <body>
        <Header
          content={localizedHeaderContent}
          locale={locale}
          allLocales={allLocales}
        />
        <main>
          <Home
            content={content}
            locale={locale}
          />
        </main>
      </body>
    </html>
  )

}
