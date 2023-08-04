import Image from 'next/image';
import { buildCmsUrl } from '@/cms/base';
import { LocalizedContent } from '@/cms/blog-page';
import { formatBlogDate } from '@/lib/format';
import { BlogEntry } from '@/cms/blog-search';

export default async function BlogArticle({ localizedContent, blog }: { blog: BlogEntry, localizedContent: LocalizedContent }) {
  const imageAttr = blog.Image.formats?.large || blog.Image
  return (
    <div
      className='relative w-full h-fit'
    >
      <div
        className='relative w-full box-border px-5 min-h-[30rem] h-fit mx-auto my-0 pt-[5.875rem] lg:w-[60rem] lg:px-0'
      >
        <div
          className='mx-[-1.25rem] mt-0 mb-[2.375rem] lg:mx-0 lg:mb-[1.875rem]'
        >
          <Image
            className='w-full lg:min-h-[30rem]'
            src={buildCmsUrl(imageAttr.url)}
            alt={blog.Image.alternativeText || 'image'}
            width={imageAttr.width}
            height={imageAttr.height}
          />
        </div>
        <div
          className='text-primary text-4xl font-title font-bold leading-[3.375rem] tracking-normal whitespace-pre-wrap text-left'
        >
          {blog.Title}
        </div>
        <div  // ArticleSub
          className='flex flex-col justify-between my-[1.313rem] items-end lg:flex-row lg:items-baseline'
        >
          <div // ArticleInfo
            className='tracking-[normal] text-sm leading-[1.375rem] font-bold font-title uppercase'
          >
            <div>
              <span
                className='text-secondary'
              >
                {blog.Author}
              </span>
              {blog.Type ? (
                <span
                  className='text-[#11af94] ml-5'
                >
                  {
                    localizedContent.Blog_Type_List.find(type => type.link === blog.Type)
                      ?.text
                  }
                </span>
              ) : null}
              {blog.Category ? (
                <span
                  className='text-[#F4781F] ml-5'
                >
                  {
                    localizedContent.Category_Type_List.find(
                      category => category.link === blog.Category
                    )?.text
                  }
                </span>
              ) : null}
            </div>
            <div
              className='text-[#8497b9]'
            >
              {`Created on ${formatBlogDate(blog.createdAt)}`}
            </div>
            <div
              className='text-[#8497b9]'
            >
              {`Updated on ${formatBlogDate(blog.UpdateDate)}`}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
