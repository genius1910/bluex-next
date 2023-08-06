import { LinkType, type LocalizedContent } from "@/cms/header";
import { Locale, fetchLocales } from "@/cms/langs";
import { AvailableLocaleType } from "@/cms/types";
import MobileDisclosure from "@/components/header/mobile-disclosure";
import { MainMenu } from "./header-menu";

import { buildPath } from "@/cms/base";
import { fetchHeader } from "@/cms/header";
import NavNextIcon from "@/images/icon/nav-next.svg";
import PrimaryLogo from "@/images/logo/bxblogo.svg";
import WhiteLogo from "@/images/logo/bxwlogo.svg";
import Link from "next/link";
import LangMenu from "./lang-menu";

interface HeaderProps {
  content: LocalizedContent;
  locale: AvailableLocaleType;
  allLocales: Locale[];
}

const HeaderMenus = ({
  content,
  locale,
}: {
  content: LocalizedContent;
  locale: AvailableLocaleType;
}) => {
  return (
    <>
      <MainMenu
        title={content.Product_Dropdown_Label || "-"}
        groupClassName="divide-y divide-gray-300"
        optionGroups={content.Product_Dropdown_Groups.map((group) => {
          return {
            label: group.name,
            options: group?.links.filter(Boolean).map((link) => {
              return {
                label: link.label,
                url:
                  link.type === LinkType.Interior
                    ? buildPath(link.url, locale)
                    : link.url || "#",
                className: "!text-secondary font-bold",
                icon: (
                  <div className='left-1 ml-1 mr-2 block h-[0.313rem] w-[0.313rem] rotate-45 bg-[orange] content-[""]' />
                ),
              };
            }),
          };
        })}
      />

      {content.Header_SubMenus.slice(1).map(
        ({ title, attachment, links }, index) => {
          return links.length > 0 ? (
            <MainMenu
              key={`${title}-${index}`}
              title={title}
              optionGroups={links.filter(Boolean).map((link) => ({
                options: [
                  {
                    label: link.label,
                    url:
                      link.type === LinkType.Interior
                        ? buildPath(link.url, locale)
                        : link.url || "#",
                  },
                ],
              }))}
            />
          ) : (
            <Link
              key={`header-list-${index}`}
              href={
                attachment?.startsWith("https://")
                  ? attachment
                  : buildPath(attachment, locale)
              }
              className={`px-2.5 py-2 text-sm font-medium text-header`}
            >
              {title}
            </Link>
          );
        },
      )}
    </>
  );
};

function DesktopNavBar({ content, locale, allLocales }: HeaderProps) {
  return (
    <div className="hidden h-full flex-col justify-center lg:flex">
      <div className="mx-auto my-0 w-[60rem]">
        <div className="relative flex h-full items-center">
          <Link href={buildPath("/", locale)} rel="home" title="BlueX Trade">
            <PrimaryLogo className="dark-logo" />
            <WhiteLogo className="white-logo" />
          </Link>

          <div // LinksWrapper
            className="ml-[4.413rem] flex flex-row items-center text-white"
          >
            <HeaderMenus content={content} locale={locale} />
          </div>

          <div // right section of header
            className="absolute right-0 flex flex-row items-center"
          >
            <LangMenu locale={locale} allLocales={allLocales} />

            <Link href={content.Header_SignIn_Btn?.link || "/"}>
              <button
                className="ml-5 flex h-[2rem] w-[6.6rem] items-center justify-center rounded-[18px] border-none
                  bg-[#009bd2] px-2 py-1.5 text-center text-sm font-bold normal-case leading-[normal] text-white
                  hover:bg-[#00afec]"
              >
                <span>{content.Header_SignIn_Btn?.text}</span>
                <NavNextIcon className="h-6 w-6" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNavBar({ content, locale, allLocales }: HeaderProps) {
  return (
    <div className="my-0 flex h-full w-full justify-between bg-white lg:hidden">
      <div className="z-[1000] flex h-full w-full flex-col justify-center bg-white">
        <Link
          href={buildPath("/", locale)}
          rel="home"
          title="BlueX Trade"
          className="mx-5 block h-6"
        >
          <PrimaryLogo />
        </Link>
      </div>
      <MobileDisclosure
        content={content}
        locale={locale}
        allLocales={allLocales}
      />
    </div>
  );
}

export default async function Header({
  locale,
}: {
  locale: AvailableLocaleType;
}) {
  const allLocales = await fetchLocales();
  const headerContent = await fetchHeader();
  const localizedHeaderContent = headerContent[locale];

  return (
    <header className="absolute z-[1000] h-[5.875rem] w-full px-0">
      <DesktopNavBar
        content={localizedHeaderContent}
        locale={locale}
        allLocales={allLocales}
      />
      <MobileNavBar
        content={localizedHeaderContent}
        locale={locale}
        allLocales={allLocales}
      />
    </header>
  );
}
