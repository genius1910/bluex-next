"use client";

import { buildSearchPath } from "@/cms/base";
import { LocalizedContent } from "@/cms/blog-page";
import { AvailableLocaleType } from "@/cms/types";
import { useRouter, useSearchParams } from "next/navigation";
import FilterDropDown from "./filter-dropdown";
import SearchBox from "./searchbox";

interface BlogFilterProps {
  locale: AvailableLocaleType;
  localizedContent: LocalizedContent;
}

export default function BlogFilter( { localizedContent, locale }: BlogFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const type = searchParams.get('type')
  const category = searchParams.get('category')

  return (
    <div // filter section
      className='flex flex-col lg:flex-row justify-between box-border pt-[2.688rem] pb-4'
    >
      <div // filter downdrop list
        className='flex flex-col lg:flex-row'
      >
        <FilterDropDown
          placeholder="Select: Category"
          current={ category }
          options={ localizedContent.Category_Type_List.map(v => (
            {
              label: v.text,
              value: v.link,
              url: buildSearchPath({type, category: v.link, search, page: 1, locale})
            }
          )) }
        />
        <FilterDropDown
            placeholder="Select: Type"
            current={ type }
            options={ localizedContent.Blog_Type_List.map(v => (
            {
              label: v.text,
              value: v.link,
              url: buildSearchPath({type: v.link, category, search, page: 1, locale})
            }
          )) }
        />
      </div>
      <SearchBox
        search={ search || '' }
        onChange={ (search) => {
          router.push(buildSearchPath({type, category, search, page: 1, locale}))
        } }
      />
    </div>

  )
}