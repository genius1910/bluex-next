import Home from '@/components/home'
import { fetch as fetchHeader } from '@/fetchers/header'
import { fetch } from '@/fetchers/home'
import { fetchLocales } from '@/fetchers/langs'
import { defaultLocale } from '@/fetchers/types'

export default async function Page() {
  const allLocales = await fetchLocales()
  const headerContent = await fetchHeader()
  const content = await fetch()
  return (
    <html>
      <body>
        <main>
          <Home
            headerContent={headerContent}
            content={content}
            locale={allLocales.find(locale => locale.isDefault)?.code ?? defaultLocale}
            allLocales={allLocales}
          />
        </main>
      </body>
    </html>
  )
}
