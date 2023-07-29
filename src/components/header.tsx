import Image from 'next/image';
import type { LocalizedContent } from '@/fetchers/header';
import { AvailableLocaleType, mapLocaleToLang } from '@/fetchers/types';
import { Locale } from '@/fetchers/langs';
import Header2 from "./header2"
import HeaderLinks from "./header-links"
import { MainMenu } from './header-menu'

import PrimaryLogo from "../images/logo/header-bluex-logo.inline.svg";
import WhiteLogo from "../images/logo/bluex-logo.inline.svg";
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

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
          <Image priority alt="Logo" src={WhiteLogo} />
        </div>
        <div
          className="hidden laptop:block"
        >
          <Image priority alt="Logo" src={PrimaryLogo} />
        </div>
      </a>
    </div>
  )
}

interface HeaderProps {
  content: LocalizedContent;
  locale: AvailableLocaleType;
  allLocales: Locale[];
}

export default function Header({ content, locale, allLocales }: HeaderProps) {
  // const dispatch = useDispatch();
  // const productItems = contents.Header_SubMenus.find(
  //   item => item.attachment === HeaderMobileMenu.PRODUCT
  // );
  // const companyItems = contents.Header_SubMenus.find(
  //   item => item.attachment === HeaderMobileMenu.COMPANY
  // );
  // const resourceItems = contents.Header_SubMenus.find(
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
            <div
              //LinksWrapper
              className="flex flex-row items-center ml-[4.413rem] text-white"
            >
              <HeaderLinks contents={content} />
            </div>
          </div>

          <div
            className="absolute flex flex-row items-center right-0"
          >
            <div
              className="block laptop:hidden"
            >
              <div
                className="flex items-center"
              >
                <MainMenu
                  title={allLocales.find(loc => loc.code === locale)?.name ?? '-'}
                  options={allLocales.map(loc => ({
                    label: loc.name,
                    url: `/${mapLocaleToLang(loc.code)}`,
                  }))}
                />
                <Link href="/en">
                  <button
                    className="flex w-[6.6rem] h-[2rem] text-sm leading-normal font-bold normal-case text-center
                      text-white px-2 py-1.5 bg-[#009bd2] rounded-[18px] border-none items-center justify-center hover:bg-[#00afec]
                      ml-5"
                    // onClick={() => NavigateExternalUrl(signInBtn?.link)}
                  >
                    <span>{content.Header_SignIn_Btn?.text}</span>
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* <Header2 /> */}
        </div>
      </div>
    </header>
  );
};
