import { PricingEntry } from "@/cms/pricing-entry";

function DotDivider() {
  return (
    <div className="h-0 flex-auto border-none border-[#b9c2ca] md:border-t md:border-dashed" />
  );
}

interface PriceItemProps {
  pricing: PricingEntry;
}

export default function PricingDetail({ pricing }: PriceItemProps) {
  return (
    <div className="mx-auto mt-[1.875rem] whitespace-pre-wrap rounded-[1.25rem] bg-white p-0 font-title text-base leading-[normal] tracking-normal text-primary md:my-10 md:w-[48.75rem] md:p-10 md:shadow-[rgba(0,0,0,0.1)_0px_2px_14px_0px]">
      {/* pricing title and description section */}
      <div className="relative mb-10 flex flex-col md:block">
        <div className="mb-4 whitespace-pre-wrap text-center text-2xl font-bold leading-10 tracking-normal">
          {pricing.Title}
        </div>
        <div className="whitespace-pre-wrap text-center text-base font-bold leading-6 tracking-normal">
          {pricing.Content}
        </div>
      </div>

      {/* pricing list frame */}
      <ul className="list-none pl-[1.688rem]">
        {pricing.Details.map(
          ({ id, title, others, content, comment, list }) => (
            <li
              key={`${id}-${title}}`}
              className="relative mb-[1.875rem] after:absolute after:left-[-1.5rem] after:top-3 after:block after:h-2 after:w-2 after:rotate-45 after:bg-[#0fb5a8]"
            >
              <div className="flex items-center text-lg font-bold leading-[1.875rem] text-secondary">
                <div>{title}</div>
                {others?.startsWith("$") ? (
                  <>
                    <DotDivider />
                    <div className="ml-[0.688rem] shrink-0 grow-0 text-sm text-secondary">
                      {others}
                    </div>
                  </>
                ) : null}
              </div>

              {/* no content in CMS. ignore it for now */}
              {content && <>{content}</>}

              {others === "Currency" && (
                <div className="mt-2.5 w-full text-xs leading-[1.125rem] text-[#8497b9]">
                  {others}
                </div>
              )}

              {/* ItemSubListFrame */}
              <ul className="mt-2.5 pl-[1.688rem]">
                {list?.map(({ name, price }, index) => (
                  <li
                    key={index}
                    className='relative flex list-none items-center font-bold leading-[1.688rem] after:absolute after:left-[-1.5rem] after:top-0 after:block after:h-2 after:w-2 after:text-[#b9c2ca] bull-content'
                  >
                    <div className="mr-[1.125rem] max-w-[80%] shrink-0 grow-0">
                      {name}
                    </div>
                    <DotDivider />
                    <div className="ml-[0.688rem] shrink-0 grow-0 text-sm text-secondary">
                      {price}
                    </div>
                  </li>
                  // current implements id super dirty. need to refactor
                  // {ComponentTextButton(comment, others)}
                ))}
              </ul>
            </li>
          ),
        )}
      </ul>

      {pricing.Note && (
        <div className="flex bg-[#f7f9fb] pb-2.5 pl-3 pr-5 pt-2 text-sm leading-[1.375rem]">
          <span className="mr-0.5">*</span>
          <span>{pricing.Note}</span>
        </div>
      )}
    </div>
  );
}
