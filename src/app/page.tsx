import { fetchHome } from '@/cms/home'
import { fetchLocales } from '@/cms/langs'
import { defaultLocale } from '@/cms/types'
import Header from '@/components/header/header'
import Home from '@/components/home/home'

// rendering the root page
// content has to idential to [lang]/page.tsx and set locale to en
export default async function Page() {
  const allLocales = await fetchLocales()
  const locale = allLocales.find(locale => locale.isDefault)?.code ?? defaultLocale
  const content = await fetchHome()

  return (
    <html lang={locale}>
      <body>
        <Header
          locale={locale}
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
