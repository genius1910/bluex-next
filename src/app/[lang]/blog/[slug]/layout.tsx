import { fetchSlugs } from '@/cms/blog-search'
import { fetch as fetchHeader } from '@/cms/header'
import { fetchLocales } from '@/cms/langs'
import { AvailableLangType, mapLangToLocale } from "@/cms/types"
import Header from "@/components/header/header"

export async function generateStaticParams() {
  const slugs = await fetchSlugs()
  return slugs.map((slug) => ({
    slug: slug.Url,
  }))
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

  console.log('slug layout')
  return (
    <>{children}</>
    // <html lang={params.lang}>
    //   <body>
    //     <Header
    //       content={localizedHeaderContent}
    //       locale={locale}
    //       allLocales={allLocales}
    //       background='white'
    //     />
    //     <main>
    //       {children}
    //     </main>
    //   </body>
    // </html>
  )
}
