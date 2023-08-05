import { buildCmsUrl, buildPath } from '@/cms/base';
import { TypeList } from '@/cms/blog-page';
import { BlogEntry } from '@/cms/blog-search';
import { AvailableLocaleType } from '@/cms/types';
import { formatBlogDate } from '@/lib/format';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPreviewProps {
  blog: BlogEntry;
  readButton: string;
  blogTypes: TypeList[];
  categoryTypes: TypeList[];
  locale: AvailableLocaleType;
}

export default function BlogPreview({ blog, readButton, blogTypes, categoryTypes, locale }: BlogPreviewProps) {
  const blogPath = buildPath(`/blog/${blog.Url}`, locale)
  return (
    <div
      className='flex flex-col lg:flex-row'
    >
       {/* kevinj: use <a> instead of <Link> to avoid massing up browser history.
           with <Link>, it will shows blank page when user click back button in browser.
       */}
      <a
        className='flex-auto w-full mr-auto mb-5 lg:flex-[0_0_23.75rem] lg:w-[23.75rem] lg:max-h-[17.5rem] lg:mr-[3.125rem]'
        href={blogPath}
      >
        <Image
          className='w-full'
          width={blog.Image.formats.small?.width}
          height={blog.Image.formats.small?.height}
          alt='blog image'
          src={buildCmsUrl(blog.Image.formats.small?.url || '')}
        />
      </a>
      <div
        className='flex-auto flex flex-col justify-start'
      >
        <Link
          href={blogPath}
          prefetch={false}
        >
          <div
            className='overflow-hidden text-ellipsis leading-[1.875rem] text-xl text-left whitespace-pre-wrap uppercase font-title font-bold text-primary'
          >
            {blog.Title}
          </div>
        </Link>
        <div
          className='text-xs leading-[1.125rem] font-bold font-title mx-0 my-2.5'
        >
          <span
            className='text-secondary'
          >
            {blog.Author}
          </span>
          { blog.Type &&
            <span
              className='text-[#11af94] ml-2.5'
            >
              { blogTypes.find(type => type.link === blog.Type)?.text }
            </span>
          }
          { blog.Category &&
            <span
              className='text-[#F4781F] ml-2.5'
            >
              { categoryTypes.find(category => category.link === blog.Category)?.text }
            </span>
          }
          <span
            className='text-[#8497b9] ml-2.5'
          >
            {formatBlogDate(blog.Date)}
          </span>
        </div>

        <div
          className='overflow-hidden text-ellipsis leading-[1.375rem] mb-5 text-sm text-title line-clamp-6'
        >
          {blog.PreviewText}
        </div>
        <Link
          href={blogPath}
          prefetch={false}
        >
          <button
            className='w-36 h-9 text-[rgb(0,155,210)] text-sm leading-6 font-bold font-title rounded-[1.125rem] border-2 border-solid border-[rgb(0,155,210)]'
          >
            {readButton}
          </button>
        </Link>
      </div>
    </div>
  )
}
