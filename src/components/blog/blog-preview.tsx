import { buildCmsUrl, buildPath } from "@/cms/base";
import { TypeList } from "@/cms/blog-page";
import { BlogEntry } from "@/cms/blog-search";
import { AvailableLocaleType } from "@/cms/types";
import { formatBlogDate } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

interface BlogPreviewProps {
  blog: BlogEntry;
  readButton: string;
  blogTypes: TypeList[];
  categoryTypes: TypeList[];
  locale: AvailableLocaleType;
}

export default function BlogPreview({
  blog,
  readButton,
  blogTypes,
  categoryTypes,
  locale,
}: BlogPreviewProps) {
  const blogPath = buildPath(`/blog/${blog.Url}`, locale);
  return (
    <div className="flex flex-col lg:flex-row">
      <Link
        className="mb-5 mr-auto w-full flex-auto lg:mr-[3.125rem] lg:max-h-[17.5rem] lg:w-[23.75rem] lg:flex-[0_0_23.75rem]"
        href={blogPath}
        prefetch={false}
      >
        <Image
          className="w-full"
          width={blog.Image.formats.small?.width}
          height={blog.Image.formats.small?.height}
          alt="blog image"
          src={buildCmsUrl(blog.Image.formats.small?.url || "")}
        />
      </Link>
      <div className="flex flex-auto flex-col justify-start">
        <Link href={blogPath} prefetch={false}>
          <div className="overflow-hidden text-ellipsis whitespace-pre-wrap text-left font-title text-xl font-bold uppercase leading-[1.875rem] text-primary">
            {blog.Title}
          </div>
        </Link>
        <div className="mx-0 my-2.5 font-title text-xs font-bold leading-[1.125rem]">
          <span className="text-secondary">{blog.Author}</span>
          {blog.Type && (
            <span className="ml-2.5 text-[#11af94]">
              {blogTypes.find((type) => type.link === blog.Type)?.text}
            </span>
          )}
          {blog.Category && (
            <span className="ml-2.5 text-[#F4781F]">
              {
                categoryTypes.find(
                  (category) => category.link === blog.Category,
                )?.text
              }
            </span>
          )}
          <span className="ml-2.5 text-[#8497b9]">
            {formatBlogDate(blog.Date)}
          </span>
        </div>

        <div className="text-title mb-5 line-clamp-6 overflow-hidden text-ellipsis text-sm leading-[1.375rem]">
          {blog.PreviewText}
        </div>
        <Link className="h-9 w-36" href={blogPath} prefetch={false}>
          <button className=" h-full w-full rounded-[1.125rem] border-2 border-solid border-secondary bg-white font-title text-sm font-bold leading-6 text-secondary">
            {readButton}
          </button>
        </Link>
      </div>
    </div>
  );
}
