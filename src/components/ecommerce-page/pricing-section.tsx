import React from 'react';
import IconGreenChecked from '@/images/icon/icon-status-green-check.inline.svg';
import { LocalizedContent } from '@/cms/ecommerce';

const PricingSection = ({ content }: { content: LocalizedContent }) => {
  return (
    <div className="relative w-full">
      <div className="mx-auto my-0 box-border flex h-fit w-full flex-col items-center px-5 pb-[1.625rem] pt-[3.313rem] lg:w-[80rem] lg:px-0">
        <div className="mb-[3.875rem] whitespace-pre-wrap text-center font-[Roboto-Medium,serif] text-[1.75rem] font-black uppercase leading-[2.875rem] tracking-normal text-[#009bd2]">
          {content.Section_5_Title}
        </div>
        <div className="relative h-fit w-full items-start overflow-scroll lg:items-center lg:overflow-hidden">
          <div className="box-border flex h-[30px] w-full flex-row">
            <div className="w-[14.438rem] flex-none flex-shrink-0 lg:w-[18.75rem]"></div>
            {content.Section_5_Table_Headers.map(({ data }, index) => (
              <div
                key={`table-header-${index}`}
                className="ml-[0.188rem] w-[18.75rem] flex-none flex-shrink-0"
              >
                <div className="mb-0 whitespace-nowrap text-center font-[lato] text-[1.5rem] font-bold text-[#009bd2]">
                  {data}
                </div>
              </div>
            ))}
          </div>
          <div className="m-[-0.094rem] flex w-full flex-col items-start lg:items-center">
            {content.Section_5_Table_Rows.map(({ header, cells }, index) => (
              <div
                key={`table-row-header-${index}`}
                className="font-lato flex h-[3.125rem] flex-none flex-row p-[0.094rem] text-lg font-bold leading-[1.22]"
              >
                <div
                  className={`flex w-[14.438rem] items-center justify-start whitespace-pre-wrap bg-white ${
                    index === 0 ? 'text-[#009bd2]' : 'text-black'
                  }`}
                >
                  {header}
                  {header === 'Dynamic Pricing' ? <span>&nbsp;*</span> : null}
                </div>
                {cells.map(({ data }, i) => (
                  <div
                    key={`table-row-${header}-${i}`}
                    className={`font-lato ml-[0.188rem] flex w-[18.75rem] items-center justify-center ${
                      index === 0
                        ? 'bg-white text-[0.875rem] font-medium'
                        : 'bg-[#ebfaff] text-lg font-bold'
                    } leading-[1.22]`}
                  >
                    {data === 'yes' && <IconGreenChecked />}
                    {data !== 'yes' && data !== 'no' && <div>{data}</div>}
                  </div>
                ))}
              </div>
            ))}
            <div className="mb-[0.875rem] mt-[1.563rem] w-[72rem] text-[0.813rem] font-bold text-[#888888] laptopLS:mb-0">
              {content.Section_5_Notification}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
