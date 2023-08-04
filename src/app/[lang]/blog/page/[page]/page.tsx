import BlogList from '@/components/blog/blog-list';
import { fetchMeta, fetchPage } from '@/cms/blog-entry';
import { AvailableLangType, defaultLocale, mapLangToLocale } from '@/cms/types';
import { fetchContent } from '@/cms/blog-page';
import BlogPreview from '@/components/blog/blog-preview';
import BlogPaginator from '@/components/blog/blog-paginator';

export default async function Page({ params }: { params: { lang: string, page: string } }) {
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  const pageNum = parseInt(params.page)
  if (!locale || !pageNum) {
    return false
  }

  const pageContent = await fetchContent()
  const localizedContent = pageContent[locale] || pageContent[defaultLocale]
  const meta = await fetchMeta()

  const blogs = await fetchPage(pageNum)
  return (
    <BlogList
      locale={locale}
      page={pageNum}
      localizedContent={localizedContent}
    >
      {
        blogs.map((blog) =>
          <BlogPreview
            key={blog.Url}
            locale={locale}
            blog={blog}
            readButton={localizedContent.Section_2_Button}
            blogTypes={localizedContent.Blog_Type_List}
            categoryTypes={localizedContent.Category_Type_List}
          />
        )
      }
      <BlogPaginator
        locale={locale}
        page={pageNum}
        pageCount={meta.pagination.pageCount}
      />

    </BlogList>
  )
}
