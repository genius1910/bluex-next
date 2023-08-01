import Home from '@/components/home/home'
import { fetch as fetchHeader } from '@/cms/header'
import { fetch } from '@/cms/home'
import { fetchLocales } from '@/cms/langs'
import { defaultLocale } from '@/cms/types'

export default async function Page() {
  const allLocales = await fetchLocales()
  const headerContent = await fetchHeader()
  const content = await fetch()
  return (
    <html>
      <body>
        <main>
        <div>404!!</div>
        </main>
      </body>
    </html>
  )
}
