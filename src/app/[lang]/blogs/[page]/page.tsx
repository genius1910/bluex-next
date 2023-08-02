import { buildUrl } from '@/cms/base';
import { fetchMeta, fetchPage } from '@/cms/blog-entry';
import { fetchContent } from '@/cms/blog-page';
import { AvailableLangType, mapLangToLocale } from '@/cms/types';
import Image from 'next/image';

// export async function generateStaticParams({ params }: { params: { lang: string, page: string } }) {
//   const locale = mapLangToLocale(params.lang as AvailableLangType);
//   const blogPage = await fetchContent()
//   const localizedBlogPage = blogPage[locale]
//   const res = await fetch(localizedBlogPage.Section_1_Bg.data.attributes.formats.medium.url)
//   await res.body?.pipeTo(fs.createWriteStream('bg.jpg'))
//   console.log('getStaticProps', locale, localizedBlogPage)
//   return []
// }

export default async function Page({ params }: { params: { lang: string, page: string } }) {
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  const page = parseInt(params.page)

  if (!locale || !page) {
    return false
  }

  const blogPage = await fetchContent()
  const localizedBlogPage = blogPage[locale]
  const meta = await fetchMeta()
  const blogs = await fetchPage(page)
  const bg = buildUrl(localizedBlogPage.Section_1_Bg.data.attributes.formats.medium.url)

  const css =  `
  .a{
    font-size: 16px
    font-stretch: 100%
    height: 24px
    letter-spacing: normal
    line-height: 24px
    margin-bottom: 10px
    text-align: left
    text-size-adjust: 100%
  }
  `
  return (
    <div
      className='relative w-full h-fit'
    >
      <div
        className={`relative bg-cover bg-center box-border pt-[8.25rem] pb-20 px-5`}
        style={ { backgroundImage: `url(${bg})` } }
      >
        <div
          className='flex flex-col w-full items-center mb-0'
        >
          <div
            className='font-title font-bold text-white text-4xl text-left h-[54px] mb-2.5'
          >
            {localizedBlogPage.Section_1_Paragraph.title}
          </div>
          <div
            className='font-title text-white text-base text-left h-6 mb-2.5 leading-6'
            >
            {localizedBlogPage.Section_1_Paragraph.content}
          </div>
        </div>
      </div>
      <div>
        Blog page ${params.page}, lang: ${params.lang} / ${locale}
        {
          blogs.map((blog) => (
            <div
              key={blog.Url}
            >
              <h1>{blog.Title}</h1>
              <Image
                width={blog.Image.data.attributes.formats.medium.width}
                height={blog.Image.data.attributes.formats.medium.height}
                alt='blog image'
                src={buildUrl(blog.Image.data.attributes.formats.medium.url)}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}
