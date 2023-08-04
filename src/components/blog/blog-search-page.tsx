"use client";

import { LocalizedContent } from '@/cms/blog-page';
import { AvailableLocaleType, Metadata } from '@/cms/types';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import BlogList from './blog-list';
import BlogPaginator from './blog-paginator';
import BlogPreviewLoading from './blog-preview-loading';

interface BlogListProps {
  localizedContent: LocalizedContent,
  locale: AvailableLocaleType,
}

export default function BlogSearchPage({ localizedContent, locale }: BlogListProps) {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const type = searchParams.get('type')
  console.log('search', search, type)

  const pageNum = 1
  if (!locale || !pageNum) {
    return false
  }

  const [meta, setMeta] = useState<Metadata | null>(null)
  // useEffect(() => {
  //   fetchMeta().then((m) => {
  //     setMeta(m)
  //     console.log('meta', m)
  //   })
  // }, [])

  return (
    <>
    <div>{meta?.pagination?.total}</div>
    <BlogList
      locale={locale}
      page={pageNum}
      localizedContent={localizedContent}
    >
      {
        [1,2,3,4,5].map((n) =>
          <BlogPreviewLoading
            key={n}
          />
        )
      }
    </BlogList>
    <BlogPaginator
      locale={locale}
      page={pageNum}
      pageCount={4}
    />
    </>
  )
}
