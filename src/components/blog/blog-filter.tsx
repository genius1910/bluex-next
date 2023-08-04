import { LocalizedContent } from "@/cms/blog-page";
import FilterDropDown from "./filter-dropdown";
import SearchBox from "./searchbox";

export default function BlogFilter( { localizedContent }: { localizedContent: LocalizedContent }) {
  return (
    <div // filter section
      className='flex flex-col lg:flex-row justify-between box-border pt-[2.688rem] pb-4'
    >
      <div // filter downdrop list
        className='flex flex-col lg:flex-row'
      >
        <FilterDropDown
          placeholder="Select: Category"
          options={ localizedContent.Blog_Type_List.map(type => (
            {
              label: type.text,
              value: type.link,
              url: '#',
            }
          )) }
        />
        <FilterDropDown
            placeholder="Select: Type"
            options={ localizedContent.Category_Type_List.map(type => (
            {
              label: type.text,
              value: type.link,
              url: '#',
            }
          )) }
        />
      </div>
      <SearchBox
      />
    </div>

  )
}