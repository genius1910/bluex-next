import Home from '@/components/home'
import { fetch as fetchHeader, defaultLocale } from '@/fetchers/header'
import { fetch } from '@/fetchers/home'
import { AvailableLocales } from '@/fetchers/types'

export default async function Page() {
  const headerContent = await fetchHeader()
  const content = await fetch()
  return (
    <html>
      <body>
        <main>
          <Home
            headerContent={headerContent}
            content={content}
            locale={defaultLocale}
            availableLocales={[...AvailableLocales]}
          />
        </main>
      </body>
    </html>
  )
}
