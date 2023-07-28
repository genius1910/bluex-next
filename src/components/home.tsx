// import Image from 'next/image'
// import Link from 'next/link'
import type { PageContent as HeaderContent, AvailableLocaleType } from '@/fetchers/header';
import type { PageContent } from '@/fetchers/home';
import Header from '@/components/Header'
// import ConsoleLog from '@/components/console-log'
import FrontMainSection from '@/components/main-section'
import FrontContents from "@/constants/mockup/front-contents";

export default function Home(props: {
  headerContent: HeaderContent,
  content: PageContent,
  locale: AvailableLocaleType
}) {
  const localizedHeaderContent = props.headerContent[props.locale]
  const localizedContent = props.content[props.locale]
  return (
    <main>
      <Header contents={localizedHeaderContent} locale={props.locale} />
      <FrontMainSection contents={localizedContent} />
    </main>
  )
}
