import Link from 'next/link';
import { MainMenu } from './header-menu'

export default function HeaderLinks({ contents }) {
  return <>
    <MainMenu
      title={contents.Product_Dropdown_Label}
      groupClassName="divide-y divide-gray-300"
      optionGroups={contents.Product_Dropdown_Groups.map(group => {
        return {
          label: group.name,
          options: group?.links.map(link => {
            return {
              label: link?.label,
              url: link?.url,
              className: 'text-[#009bd2] font-bold',
              icon: <div
                className='block content-[""] w-[0.313rem] h-[0.313rem] rotate-45 bg-[orange] left-1 ml-1 mr-2'
              />,
            };
          }),
        };
      })}
    />

    { contents.Header_SubMenus.slice(1).map(
      ({ title, attachment, links }, index) => {
        return links.length > 0 ? (
          <MainMenu
            key={`${title}-${index}`}
            title={title}
            optionGroups={links.filter(Boolean).map(link => ({
              options:[{
                label: link.label,
                url: link.url
              }]
            }))}
          />
        ) : (
          <Link key={`header-list-${index}`} href={attachment}>
            {title}
          </Link>
        )
      })
    }
  </>
}