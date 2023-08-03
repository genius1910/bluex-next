import { buildUrl } from '@/cms/base';
import { fetchMeta, fetchPage } from '@/cms/blog-entry';
import { fetchContent } from '@/cms/blog-page';
import { AvailableLangType, defaultLocale, mapLangToLocale } from '@/cms/types';
import Divider from '../common/divider';
import BlogPreview from './blog-preview';
import FilterDropDown from './filter-dropdown';
import SearchBox from './searchbox';
import BlogPreviewLoading from './blog-preview-loading';
import BlogPaginator from './blog-paginator';

export default async function BlogPage({ lang, page }: { lang: string, page: string }) {
  const locale = mapLangToLocale(lang as AvailableLangType);
  const pageNum = parseInt(page)
  if (!locale || !pageNum) {
    return false
  }

  const blogPage = await fetchContent()
  const localizedBlogPage = blogPage[locale] || blogPage[defaultLocale]
  const meta = await fetchMeta()
  const blogs = await fetchPage(pageNum)
  const bg = buildUrl(localizedBlogPage.Section_1_Bg.data.attributes.url)

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
            {localizedBlogPage.Section_1_Paragraph.title}
          </div>
          <div
            className='font-title text-white text-base text-left h-6 leading-6'
            >
            {localizedBlogPage.Section_1_Paragraph.content}
          </div>
        </div>
      </div>

      {/* blog list section */}
      <div
        className='relative min-h-[32rem] w-full box-border px-5 mx-auto bg-white lg:w-[60rem] lg:px-0'
      >
        <div // filter section
          className='flex flex-col lg:flex-row justify-between box-border pt-[2.688rem] pb-4'
        >
          <div // filter downdrop list
            className='flex flex-col lg:flex-row'
          >
            <FilterDropDown
              placeholder="Select: Category"
              options={ localizedBlogPage.Blog_Type_List.map(type => (
                {
                  label: type.text,
                  value: type.link,
                  url: '#',
                }
              )) }
            />
            <FilterDropDown
                placeholder="Select: Type"
                options={ localizedBlogPage.Category_Type_List.map(type => (
                {
                  label: type.text,
                  value: type.link,
                  url: '#',
                }
              )) }
            />
          </div>
          <SearchBox
          />
        </div>

        <Divider />

        <div
          className='box-border py-[3.125rem] lg:pb-[6.25rem] space-y-12'
        >
          {
            blogs.map((blog) =>
              <BlogPreview
                key={blog.Url}
                blog={blog}
                readButton={localizedBlogPage.Section_2_Button}
                blogTypes={localizedBlogPage.Blog_Type_List}
                categoryTypes={localizedBlogPage.Category_Type_List}
              />
            )
          }
          <BlogPaginator
            page={pageNum}
            pageCount={meta.pagination.pageCount}
          />
        </div>
      </div>
    </div>
  )
  }
