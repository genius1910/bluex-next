import { LocalizedContent } from '@/cms/ecommerce';
import Image from 'next/image';

const FrontMainSection = ({ content }: { content: LocalizedContent }) => {
  return (
    <div
      className="relative overflow-x-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${
          process.env.NEXT_PUBLIC_STRAPI_URL +
          content.Section_1_Bg.data.attributes.url.substring(1)
        })`,
      }}
    >
      <div className="mx-auto my-0 box-border flex h-auto w-full items-center justify-center px-5 pt-44 md:h-[36.25rem] md:py-0 lg:w-[60rem]">
        <div className="mt-0 flex w-full flex-col items-center justify-center md:mt-8 md:flex-row">
          <div className="mb-[1.875rem] mr-0 flex max-w-[40rem] flex-col items-center md:items-start">
            <div className="mb-[1.875rem] w-full items-start">
              <div className="mb-[1.875rem] max-w-[30rem] break-keep text-left text-[2.25rem] font-bold leading-[3.375rem] tracking-normal text-white">
                {content.Section_1_Title}
              </div>
              <div className="max-w-[32.5rem] text-center text-base font-normal leading-[1.875rem] text-white md:text-left">
                {content.Section_1_Content}
              </div>
            </div>
            <a
              href="mailto:sales@bluextrade.com"
              target="_blank"
              className="inline-block w-36 rounded-[18px] border-none bg-[#009bd2] px-2 py-1.5 text-center text-sm font-bold normal-case leading-6 text-white hover:bg-[#00afec]"
            >
              {content.Section_1_Button}
            </a>
          </div>
          <div>
            <Image
              src={
                process.env.NEXT_PUBLIC_STRAPI_URL +
                content.Section_1_Image.data.attributes.url.substring(1)
              }
              alt={
                content.Section_1_Image.data.attributes.alternativeText
                  ? content.Section_1_Image.data.attributes.alternativeText
                  : ''
              }
              width={content.Section_1_Image.data.attributes.width}
              height={content.Section_1_Image.data.attributes.height}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontMainSection;
