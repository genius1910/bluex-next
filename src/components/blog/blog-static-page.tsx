import { LocalizedContent } from '@/cms/blog-page';
import { AvailableLocaleType, Metadata } from '@/cms/types';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import BlogList from './blog-list';
import BlogPaginator from './blog-paginator';
import BlogPreviewLoading from './blog-preview-loading';
import BlogPreview from './blog-preview';
import { fetchPage, fetchStats } from '@/cms/blog-search';

interface BlogListProps {
  localizedContent: LocalizedContent,
  locale: AvailableLocaleType,
}

export default async function BlogStaticPage({ locale, localizedContent, page }: { locale: AvailableLocaleType, localizedContent: LocalizedContent, page: number }) {
  const meta = await fetchStats()
  const blogs = await fetchPage(page)

  return (
    <BlogList
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
        page={page}
        pageCount={meta.totalPages}
      />

    </BlogList>
  )
}
