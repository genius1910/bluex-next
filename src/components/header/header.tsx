import { LinkType, type LocalizedContent } from '@/cms/header';
import { Locale } from '@/cms/langs';
import { AvailableLocaleType, mapLocaleToLang } from '@/cms/types';
import MobileDisclosure from "@/components/header/mobile-disclosure";
import { MainMenu } from './header-menu';

import NavNextIcon from '@/images/icon/nav-next.svg';
import WhiteLogo from "@/images/logo/bxwlogo.svg";
import PrimaryLogo from "@/images/logo/bxblogo.svg";
import Link from 'next/link';

const HeaderMenus = ({ content, locale }: { content: LocalizedContent, locale: AvailableLocaleType }) => {
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
              url: link.type === LinkType.Interior ? `/${locale}${link.url}` : link.url || '#',
              className: 'text-secondary font-bold',
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
                url: link.type === LinkType.Interior ? `/${locale}${link.url}` : link.url || '#',
              }]
            }))}
          />
        ) : (
          <Link
            key={`header-list-${index}`}
            href={attachment?.startsWith('https://') ? attachment : `/${locale}${attachment}` || '#'}
            className='px-2.5 py-2 text-sm font-medium text-white'
          >
            {title}
          </Link>
        )
      })
    }
  </>
}

function DesktopNavBar({ content, locale, allLocales }: HeaderProps) {
  return (
    <div
      className='hidden lg:flex flex-col h-full justify-center'
    >
      <div
        className="w-[60rem] mx-auto my-0"
      >
        <div
          className="relative h-full flex items-center"
        >
          <Link
            href={`/${mapLocaleToLang(locale)}`}
            rel="home"
            title="BlueX Trade"
          >
            <WhiteLogo />
          </Link>

          <div // LinksWrapper
            className="flex flex-row items-center ml-[4.413rem] text-white"
          >
            <HeaderMenus content={content} locale={locale} />
          </div>

          <div // right section of header
            className="absolute flex flex-row items-center right-0"
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
                <NavNextIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileNavBar({ content, locale, allLocales }: HeaderProps) {
  return (
    <div
      className="flex lg:hidden my-0 w-full h-full bg-white justify-between"
    >
      <div
        className='flex flex-col h-full w-full bg-white justify-center z-[1000]'
      >
        <Link
          href={`/${mapLocaleToLang(locale)}`}
          rel="home"
          title="BlueX Trade"
          className="block h-6 mx-5"
        >
          <PrimaryLogo />
        </Link>
      </div>
      <MobileDisclosure content={content} locale={locale} allLocales={allLocales} />
    </div>
  )
}

interface HeaderProps {
  content: LocalizedContent;
  locale: AvailableLocaleType;
  allLocales: Locale[];
}

export default function Header({ content, locale, allLocales }: HeaderProps) {
  return (
    <header
      className="absolute z-[1000] w-full h-[5.875rem] px-0"
    >
      <DesktopNavBar content={content} locale={locale} allLocales={allLocales} />
      <MobileNavBar content={content} locale={locale} allLocales={allLocales} />
    </header>
  );
};
