'use client';

import { LocalizedContent } from '@/cms/blog-page';
import { BlogEntry, searchBlogs } from '@/cms/blog-search';
import { AvailableLocaleType, Metadata } from '@/cms/types';
import { range } from '@/lib/tools';
import { useSearchParams } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';
import BlogPaginator from './blog-paginator';
import BlogPreview from './blog-preview';
import BlogPreviewLoading from './blog-preview-loading';
import { buildSearchPath } from '@/cms/base';
import ManageSearchIcon from '@/images/icon/manage-search.svg';
import { Transition } from '@headlessui/react';

interface BlogListProps {
  locale: AvailableLocaleType;
  localizedContent: LocalizedContent;
}

export default function BlogFilteredList({
  locale,
  localizedContent,
}: BlogListProps) {
  const [loading, setLoading] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState(0);
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);

  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1') || 1;

  const doSearch = useCallback(() => {
    const opt = { search, type, category, page, sort: ['Date:desc'] };
    searchBlogs(opt)
      .then((res) => {
        setLastError(null);
        setTotalPage(res.totalPages);
        setLoading(false);
        setBlogs(res.hits as BlogEntry[]);
      })
      .catch((err) => {
        setLastError(`An error occurred during the search: ${err.message}`);
        setLoading(false);
        console.error('err', err);
      });
    setTotalPage(0);
    setLoading(true);
  }, [search, type, category, page]);

  useEffect(doSearch, [doSearch]);

  const previousPagePath = () =>
    page > 1
      ? buildSearchPath({ search, type, category, locale, page: page - 1 })
      : null;

  const nextPagePath = () =>
    page < totalPage
      ? buildSearchPath({ search, type, category, locale, page: page + 1 })
      : null;

  return (
    <>
      <Transition
        show={loading}
        className="space-y-12"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        {loading && range(5).map((n) => <BlogPreviewLoading key={n} />)}
      </Transition>
      <Transition
        show={!loading}
        className="space-y-12"
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        {blogs.length > 0 ? (
          <>
            {blogs.map((blog) => (
              <BlogPreview
                key={blog.Url}
                locale={locale}
                blog={blog}
                readButton={localizedContent.Section_2_Button}
                blogTypes={localizedContent.Blog_Type_List}
                categoryTypes={localizedContent.Category_Type_List}
              />
            ))}

            <BlogPaginator
              locale={locale}
              previousUrl={previousPagePath()}
              nextUrl={nextPagePath()}
            />
          </>
        ) : (
          <div className="flex w-full flex-col items-center text-6xl">
            <ManageSearchIcon className="h-[8rem] w-[8rem]" />
            <div className="mb-0 flex w-full flex-col items-center text-primary">
              <div className="mb-5 whitespace-pre-wrap text-left  font-title text-2xl font-bold leading-10">
                {localizedContent.Not_Found_Paragraph.title}
              </div>
              <div className="whitespace-pre-wrap text-left text-base font-normal not-italic leading-6">
                { !lastError ? localizedContent.Not_Found_Paragraph.content : lastError }
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
}
