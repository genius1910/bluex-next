import { buildCmsUrl } from "@/cms/base";
import { LocalizedContent } from "@/cms/blog-page";
import Divider from "../common/divider";
import BlogFilter from "./blog-filter";
import { AvailableLocaleType } from "@/cms/types";
import { Suspense } from "react";

interface BlogListProps {
  localizedContent: LocalizedContent;
  locale: AvailableLocaleType;
  children: React.ReactNode;
}

export default function BlogList({
  localizedContent,
  locale,
  children,
}: BlogListProps) {
  const bg = buildCmsUrl(localizedContent.Section_1_Bg.data.attributes.url);

  return (
    <div className="relative h-fit w-full">
      {/* title and description section */}
      <div
        className={`relative box-border bg-cover bg-center px-5 pb-20 pt-[8.25rem]`}
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="mb-0 flex w-full flex-col items-center">
          <div className="mb-2.5 h-[54px] text-left font-title text-4xl font-bold leading-[3.375rem] text-white">
            {localizedContent.Section_1_Paragraph.title}
          </div>
          <div className="h-6 text-left font-title text-base leading-6 text-white">
            {localizedContent.Section_1_Paragraph.content}
          </div>
        </div>
      </div>

      {/* blog list section */}
      <div className="relative mx-auto box-border min-h-[32rem] w-full bg-white px-5 lg:w-[60rem] lg:px-0">
        <Suspense fallback={<div>Loading...</div>}>
          <BlogFilter locale={locale} localizedContent={localizedContent} />
        </Suspense>

        <Divider />

        <div className="box-border space-y-12 py-[3.125rem] lg:pb-[6.25rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
