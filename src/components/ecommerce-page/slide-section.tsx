'use client';

import React, { useState } from 'react';
import { Slide } from '@mui/material';
import Button from "@/components/common/ripple-button";
import IconLeftArrow from '@/images/icon/combined-shape.inline.svg';
import IconRightArrow from '@/images/icon/combined-shape-copy.inline.svg';

import { LocalizedContent } from '@/cms/ecommerce';
import Image from 'next/image';

const SlideSection = ({ content }: { content: LocalizedContent }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabLastIndex, setTabLastIndex] = useState(0);

  const changeTabIndex = (newTabIndex : number) => {
    if (newTabIndex === tabIndex) {
      return;
    }

    const listLength = content.Section_3_Tab_Media.length;
    if (newTabIndex >= listLength) {
      newTabIndex = 0;
    }

    if (newTabIndex < 0) {
      newTabIndex = listLength - 1;
    }

    setTabLastIndex(tabIndex);
    setTabIndex(newTabIndex);
  };

  const setSlideDirection = (index : number) => {
    if (tabLastIndex === tabIndex) {
      return 'right';
    }

    //switch to this slide
    if (tabLastIndex !== index && tabIndex === index) {
      if (tabLastIndex >= index) {
        return 'right';
      } else {
        return 'left';
      }
    }

    //switch away from this slide
    if (tabLastIndex === index && tabIndex !== index) {
      if (tabIndex >= index) {
        return 'right';
      } else {
        return 'left';
      }
    }
  };

  return (
    <div className="relative h-fit w-full overflow-hidden bg-[#ebfaff]">
      <div className="mx-auto my-0 box-border h-[37.5rem] w-full px-5 py-[3.125rem] md:h-[30rem] md:pb-[3.625rem] md:pt-16 lg:w-[70rem]">
        <Button
          className="!absolute left-0 top-1/2 translate-y-[-50%] opacity-50 md:opacity-100"
          onClick={() => changeTabIndex(tabIndex - 1)}
        >
          <IconLeftArrow />
        </Button>
        <Button
          className="!absolute right-0 top-1/2 translate-y-[-50%] opacity-50 md:opacity-100"
          onClick={() => changeTabIndex(tabIndex + 1)}
        >
          <IconRightArrow />
        </Button>
        <div className='md:block hidden'>
          <div className="flex flex-row flex-nowrap justify-around">
            {content.Section_3_Tab_Media.map(({ tag }, index) => (
              <div
                key={`tab-item-${index}`}
                className={`${
                  tabIndex === index ? 'ecommerceSlideActive' : null
                } relative cursor-pointer uppercase transition duration-100 after:absolute after:bottom-[-1.625rem] after:left-1/2 after:h-[0.125rem] after:w-0 after:translate-x-[-50%] after:bg-[#009bd2] `}
                onClick={() => {
                  changeTabIndex(index);
                }}
              >
                <div className="mb-0 whitespace-pre-wrap text-center font-[Roboto-Medium] text-[1.25rem] font-medium uppercase leading-normal tracking-normal text-[#18335e]">
                  {tag}
                </div>
              </div>
            ))}
          </div>
        </div>
        {content.Section_3_Tab_Media.map(
          ({ image, description, button }, index) => (
            <Slide
              key={`slide-item-${index}`}
              className={`${
                index === 3 ? 'last' : null
              } box-border h-[20rem] pt-[4.563rem]`}
              direction={setSlideDirection(index)}
              in={tabIndex === index}
              mountOnEnter
              unmountOnExit
            >
              <div>
                <div className="flex h-fit flex-col-reverse md:flex-row">
                  <div className="flex min-h-[15rem] w-full flex-none flex-shrink-0 items-center md:w-[25rem]">
                    {
                      // eslint-disable-next-line jsx-a11y/img-redundant-alt
                      <Image
                        className="w-full"
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
                  <div className="mb-5 ml-0 flex flex-1 flex-row flex-wrap items-center justify-center md:ml-[2.813rem] md:justify-start">
                    <div className="mb-5 ml-0 mr-0 w-full justify-center whitespace-pre-wrap text-center font-[Roboto-Medium] text-[1.725rem] font-bold leading-[2.625rem] text-[#009bd2] md:text-left md:m-0">
                      {description.content}
                    </div>
                    {button && (
                      <div>
                        <a
                          className="block h-[2.875rem] w-[11rem]"
                          href={button.link}
                          target="_blank"
                        >
                          <button className="h-full w-full rounded-[18px] border-none bg-[#009bd2] px-2 py-1.5 text-center text-base font-bold normal-case leading-6 text-white hover:bg-[#00afec]">
                            {button.text}
                          </button>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Slide>
          ),
        )}
      </div>
    </div>
  );
};

export default SlideSection;
