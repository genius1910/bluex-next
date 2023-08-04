import { buildCmsUrl } from '@/cms/base';
import { LocalizedContent } from '@/cms/blog-page';
import { AvailableLocaleType } from '@/cms/types';
import Divider from '../common/divider';
import BlogFilter from './blog-filter';

interface BlogListProps {
  localizedContent: LocalizedContent,
  page: number,
  locale: AvailableLocaleType,
  children: React.ReactNode
}

export default async function BlogList({ localizedContent, page, locale, children }: BlogListProps) {
  const bg = buildCmsUrl(localizedContent.Section_1_Bg.data.attributes.url)

  return (
    <div
      className='relative w-full h-fit'
    >
      {/* title and description section */}
      <div
        className={`relative bg-cover bg-center box-border pt-[8.25rem] pb-20 px-5`}
        style={ { backgroundImage: `url(${bg})` } }
      >
        <div
          className='flex flex-col w-full items-center mb-0'
        >
          <div
            className='font-title font-bold text-white text-4xl text-left h-[54px] mb-2.5 leading-[3.375rem]'
          >
            {localizedContent.Section_1_Paragraph.title}
          </div>
          <div
            className='font-title text-white text-base text-left h-6 leading-6'
            >
            {localizedContent.Section_1_Paragraph.content}
          </div>
        </div>
      </div>

      {/* blog list section */}
      <div
        className='relative min-h-[32rem] w-full box-border px-5 mx-auto bg-white lg:w-[60rem] lg:px-0'
      >
        <BlogFilter
          localizedContent={localizedContent}
        />

        <Divider />

        <div
          className='box-border py-[3.125rem] lg:pb-[6.25rem] space-y-12'
        >
          { children }
        </div>
      </div>
    </div>
  )
}
