import { availableLangs  } from "@/cms/types"
import { fetch as fetchHeader } from '@/cms/header'
import Header from "@/components/header/header"
import { AvailableLangType, mapLangToLocale } from '@/cms/types'
import { fetchLocales } from '@/cms/langs'

export async function generateStaticParams() {
  return availableLangs.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: { lang: string },
}) {
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  if (!locale) {
    return false
  }

  const allLocales = await fetchLocales()
  const headerContent = await fetchHeader()
  const localizedHeaderContent = headerContent[locale]

  return (
    <html lang={params.lang}>
      <body>
        <Header
          content={localizedHeaderContent}
          locale={locale}
          allLocales={allLocales}
        />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
