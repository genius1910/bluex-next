import { AvailableLocaleType } from '@/cms/types';
import { Locale } from '@/cms/langs';
import type { PageContent as HeaderContent } from '@/cms/header';
import type { PageContent } from '@/cms/home';
import Header from '@/components/header/header'
import FrontMainSection from '@/components/main-section'

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
