import { fetchStats } from "@/cms/blog-search"
import { range } from "@/lib/tools"

export async function generateStaticParams() {
  const stats = await fetchStats()
  return range(stats.totalPages).map((page) => ({
    page: `${page}`
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
