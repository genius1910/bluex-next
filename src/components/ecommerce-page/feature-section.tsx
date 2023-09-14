import React from 'react';
import { LocalizedContent } from '@/cms/ecommerce';
import Image from 'next/image';

const FeatureSection = ({ content }: { content: LocalizedContent }) => {
  return (
    <div className="relative h-fit w-full bg-white">
      <div className="mx-auto my-0 box-border flex w-full flex-col items-center px-5 pb-[5rem] pt-[4.375rem] lg:w-[60rem]">
        <div className=" mb-16 w-full whitespace-pre-wrap text-center font-[Roboto-Medium] text-[1.75rem] font-black uppercase leading-[2.875rem] tracking-normal text-[#009bd2] md:w-[30rem]">
          {content.Section_2_Title}
        </div>
        <div className="flex w-full flex-col justify-center gap-8 md:flex-row">
          {content.Section_2_Media_List.map(({ image, description }, index) => (
            <div
              className="flex flex-1 flex-col items-center font-[lato] text-base font-normal leading-normal tracking-normal"
              key={`attribute-${index}`}
            >
              <div className='h-20 mb-[1.125rem]'>
                {
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_STRAPI_URL +
                      image.data.attributes.url.substring(1)
                    }
                    alt={''}
                    width={image.data.attributes.width}
                    height={image.data.attributes.height}
                  />
                }
              </div>
              <div className="mb-0 whitespace-pre-wrap text-center font-[Roboto-Medium] text-base font-medium uppercase leading-[1.563rem] tracking-normal text-[#009bd2]">
                {description.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
