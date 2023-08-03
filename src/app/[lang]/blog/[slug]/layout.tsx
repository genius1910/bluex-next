import { availableLangs  } from "@/cms/types"
import { fetch as fetchHeader } from '@/cms/header'
import Header from "@/components/header/header"
import { AvailableLangType, mapLangToLocale } from '@/cms/types'
import { fetchLocales } from '@/cms/langs'
import { fetchMeta, fetchSlugs } from "@/cms/blog-entry"
import { range, times } from "@/lib/tools"

export async function generateStaticParams() {
  const slugs = await fetchSlugs()
  return slugs.map((slug) => ({
    slug: slug.Url,
  }))
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return <>
    {children}
  </>
}
