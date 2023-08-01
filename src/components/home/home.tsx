import type { PageContent } from '@/cms/home';
import { AvailableLocaleType } from '@/cms/types';
import FrontMainSection from '@/components/home/main-section';

export default function Home(props: {
  content: PageContent,
  locale: AvailableLocaleType,
}) {
  const localizedContent = props.content[props.locale]
  return (
    <>
      <FrontMainSection content={localizedContent} />
    </>
  )
}
