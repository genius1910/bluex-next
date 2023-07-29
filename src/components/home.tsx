import { AvailableLocaleType } from '@/fetchers/types';
import { Locale } from '@/fetchers/langs';
import type { PageContent as HeaderContent } from '@/fetchers/header';
import type { PageContent } from '@/fetchers/home';
import Header from '@/components/header'
import FrontMainSection from '@/components/main-section'
// import FrontContents from "@/constants/mockup/front-contents";

export default function Home(props: {
  headerContent: HeaderContent,
  content: PageContent,
  locale: AvailableLocaleType,
  allLocales: Locale[]
}) {
  const localizedHeaderContent = props.headerContent[props.locale]
  const localizedContent = props.content[props.locale]

  return (
    <main>
      <Header
        content={localizedHeaderContent}
        locale={props.locale}
        allLocales={props.allLocales}
      />
      <FrontMainSection contents={localizedContent} />
    </main>
  )
}
