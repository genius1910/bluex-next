"use client";

import { LocalizedContent } from '@/cms/blog-page';
import { BlogEntry, searchBlogs } from '@/cms/blog-search';
import { AvailableLocaleType, Metadata } from '@/cms/types';
import { range } from '@/lib/tools';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import BlogPaginator from './blog-paginator';
import BlogPreview from './blog-preview';
import BlogPreviewLoading from './blog-preview-loading';
import { buildSearchPath } from '@/cms/base';

interface BlogListProps {
  locale: AvailableLocaleType,
  localizedContent: LocalizedContent,
}

export default function BlogFilteredList({ locale, localizedContent }: BlogListProps) {
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(0)
  const [blogs, setBlogs] = useState<BlogEntry[]>([])

  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const type = searchParams.get('type')
  const category = searchParams.get('category')
  const page = parseInt(searchParams.get('page') || '1') || 1

  const doSearch = useCallback(() => {
    const opt = { search, type, category, page, sort: ['Date:desc'] }

    searchBlogs(opt).then((res) => {
      setTotalPage(res.totalPages)
      setLoading(false)
      setBlogs(res.hits as BlogEntry[])

    }).catch((err) => {
      setLoading(false)
      console.error('err', err)
    })
    setTotalPage(0)
    setLoading(true)
  }, [search, type, category, page])

  useEffect(doSearch, [doSearch])

  return (
    <>
      { loading &&
        range(5).map((n) =>
          <BlogPreviewLoading
            key={n}
          />
        )
      }
      { !loading &&
        <>
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
            previousUrl={ page > 1 ? buildSearchPath({type, category, search, page: page - 1, locale}) : null }
            nextUrl={ page < totalPage ? buildSearchPath({type, category, search, page: page + 1, locale}) : null }
          />
        </>
      }
    </>
  )
}
