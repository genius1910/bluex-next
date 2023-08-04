import { LocalizedContent } from '@/cms/blog-page';
import { fetchPage, fetchStats } from '@/cms/blog-search';
import { AvailableLocaleType } from '@/cms/types';
import BlogList from './blog-list';
import BlogPaginator from './blog-paginator';
import BlogPreview from './blog-preview';
import { buildPath } from '@/cms/base';

interface BlogListProps {
  localizedContent: LocalizedContent,
  locale: AvailableLocaleType,
}

export default async function BlogStaticPage({ locale, localizedContent, page }: { locale: AvailableLocaleType, localizedContent: LocalizedContent, page: number }) {
  const meta = await fetchStats()
  const blogs = await fetchPage(page)

  return (
    <BlogList
      locale={locale}
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
        previousUrl={ page > 1 ? buildPath(`/blog/page/${page - 1}`, locale) : null }
        nextUrl={ page < meta.totalPages ? buildPath(`/blog/page/${page + 1}`, locale) : null }
      />

    </BlogList>
  )
}
