import { availableLangs  } from "@/cms/types"
import { fetch as fetchHeader } from '@/cms/header'
import Header from "@/components/header/header"
import { AvailableLangType, mapLangToLocale } from '@/cms/types'
import { fetchLocales } from '@/cms/langs'
import { fetchMeta } from "@/cms/blog-entry"
import { range, times } from "@/lib/tools"

export async function generateStaticParams() {
  const meta = await fetchMeta()
  return range(meta.pagination.pageCount).map((page) => ({
    page: `${page}`
  }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: { lang: string },
}) {
  return <>
    {children}
  </>
}
