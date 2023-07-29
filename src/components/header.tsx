import type { LocalizedContent } from '@/fetchers/header';
import { Locale } from '@/fetchers/langs';
import { AvailableLocaleType, mapLocaleToLang } from '@/fetchers/types';
import { MainMenu } from './header-menu';
import Header2 from "./header2";

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import WhiteLogo from "../images/logo/bluex-logo.inline.svg";
import PrimaryLogo from "../images/logo/header-bluex-logo.inline.svg";

const LogoBlock = (props: { locale: AvailableLocaleType }) => {
  return (
    <div>
      <a
        href={`/${props.locale}`}
        rel="home"
        title="BlueX Trade"
        className="block h-6"
      >
        <div
          className="block laptop:hidden"
        >
          <WhiteLogo />
        </div>
        <div
          className="hidden laptop:block"
        >
          <PrimaryLogo />
        </div>
      </a>
    </div>
  )
}

const HeaderLinks = ({ content }: { content: LocalizedContent }) => {
  return <>
    <MainMenu
      title={content.Product_Dropdown_Label || '-'}
      groupClassName="divide-y divide-gray-300"
      optionGroups={content.Product_Dropdown_Groups.map(group => {
        return {
          label: group.name,
          options: group?.links.filter(Boolean).map(link => {
            return {
              label: link.label,
              url: link.url || '#',
              className: 'text-primary font-bold',
              icon: <div
                className='block content-[""] w-[0.313rem] h-[0.313rem] rotate-45 bg-[orange] left-1 ml-1 mr-2'
              />,
            };
          }),
        };
      })}
    />

    { content.Header_SubMenus.slice(1).map(
      ({ title, attachment, links }, index) => {
        return links.length > 0 ? (
          <MainMenu
            key={`${title}-${index}`}
            title={title}
            optionGroups={links.filter(Boolean).map(link => ({
              options:[{
                label: link.label,
                url: link.url || '#',
              }]
            }))}
          />
        ) : (
          <Link
            key={`header-list-${index}`}
            href={attachment || '#'}
            className='px-2.5 py-2 text-sm font-medium text-white'
          >
            {title}
          </Link>
        )
      })
    }
  </>
}

interface HeaderProps {
  content: LocalizedContent;
  locale: AvailableLocaleType;
  allLocales: Locale[];
}

export default function Header({ content, locale, allLocales }: HeaderProps) {
  // const dispatch = useDispatch();
  // const productItems = content.Header_SubMenus.find(
  //   item => item.attachment === HeaderMobileMenu.PRODUCT
  // );
  // const companyItems = content.Header_SubMenus.find(
  //   item => item.attachment === HeaderMobileMenu.COMPANY
  // );
  // const resourceItems = content.Header_SubMenus.find(
  //   item => item.attachment === HeaderMobileMenu.RESOURCE
  // );

  return (
    <header
      className="absolute z-[1000] w-full h-[5.875rem] box-border px-0 py-[2.188rem] laptop:bg-white laptop:fixed"
    >
      <div
        className="w-[60rem] mx-auto my-0 laptop:w-full laptop:box-border laptop:px-5"
      >
        <div
          className="relative h-full flex items-center laptop:justify-between"
        >
          <LogoBlock locale={locale}/>

          <div
            className="block laptop:hidden"
          >
            <div // LinksWrapper
              className="flex flex-row items-center ml-[4.413rem] text-white"
            >
              <HeaderLinks content={content} />
            </div>
          </div>

          <div // right section of header
            className="absolute flex flex-row items-center right-0"
          >
            <div
              className="block laptop:hidden"
            >
              <div
                className="flex items-center"
              >
                <MainMenu // language menu
                  title={allLocales.find(loc => loc.code === locale)?.name ?? '-'}
                  options={allLocales.map(loc => ({
                    label: loc.name,
                    url: `/${mapLocaleToLang(loc.code)}`,
                  }))}
                />
                <Link href={content.Header_SignIn_Btn?.link || '/'}>
                  <button
                    className="flex w-[6.6rem] h-[2rem] text-sm leading-normal font-bold normal-case text-center
                      text-white px-2 py-1.5 bg-[#009bd2] rounded-[18px] border-none items-center justify-center hover:bg-[#00afec]
                      ml-5"
                  >
                    <span>{content.Header_SignIn_Btn?.text}</span>
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <Header2 />
        </div>
      </div>
    </header>
  );
};
