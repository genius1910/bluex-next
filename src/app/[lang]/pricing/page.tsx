import { fetchAll } from "@/cms/pricing-entry";
import { fetchContent } from "@/cms/pricing-page";
import { AvailableLangType, defaultLocale, mapLangToLocale } from "@/cms/types";
import PricingDetail from "@/components/pricing/pricing-detail";
import Link from "next/link";

export default async function Page({ params }: { params: { lang: string } }) {
  const pageContent = await fetchContent();
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  const localizedContent = pageContent[locale] || pageContent[defaultLocale];
  const pricingEntries = await fetchAll(locale);

  return (
    <div className="relative h-fit w-full overflow-x-hidden">
      <div className="hidden lg:block">
        <div className="border-color-red-500 absolute h-[31.875rem] w-full border-solid bg-secondary after:absolute after:bottom-0 after:left-0 after:block after:h-0 after:w-0 after:border-b-[8rem] after:border-l-[100vw] after:border-solid after:border-b-white after:border-l-transparent"></div>
      </div>

      <div className="w-100 relative mx-auto my-0 box-border px-5 pb-[6.25rem] pt-[5.875rem] lg:w-[60rem] lg:px-0 lg:pt-[8.375rem]">
        {/* page title and description section */}
        <div className="mx-[-1.25rem] my-0 bg-secondary px-5 py-10 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0">
          <div className="mb-0 flex w-full flex-col items-center">
            <div className="mb-5 h-[54px] text-left font-title text-4xl font-bold leading-[3.375rem] text-white">
              {localizedContent.Section_1_Paragraph.title}
            </div>
            <div className="h-6 text-left font-title text-base leading-6 text-white">
              {localizedContent.Section_1_Paragraph.content}
            </div>
          </div>
        </div>

        {/* pricing tables */}
        {pricingEntries.map((pricing, index) => (
          <PricingDetail key={index} pricing={pricing} />
        ))}

        {/* bottom */}
        <div className="mt-20 text-center">
          <div className="mb-[1.875rem] whitespace-nowrap text-center font-title text-4xl font-bold leading-[normal] tracking-[normal] text-primary">
            {localizedContent.Section_3_Title}
          </div>
          <Link href={localizedContent.Section_3_Button.link} target="_blank">
            <button className="rounded-3xl border-none bg-secondary py-3 pl-[2.813rem] pr-11 text-center text-base font-bold normal-case not-italic leading-[normal] tracking-[normal] text-white">
              {localizedContent.Section_3_Button.text}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
