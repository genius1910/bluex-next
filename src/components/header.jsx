import Image from 'next/image';
import Header2 from "./header2"
import HeaderLinks from "./header-links"

import PrimaryLogo from "../images/logo/header-bluex-logo.inline.svg";
import WhiteLogo from "../images/logo/bluex-logo.inline.svg";

const LogoBlock = ({ locale }) => {
  return (
    <div>
      <a
        href={`/${locale}`}
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
          sx={{ display: { sm: "block", md: "none" } }}
        >
          <Image priority alt="Logo" src={PrimaryLogo} />
        </div>
      </a>
    </div>
  )
}

export default function Header({
  contents,
  locale
}) {
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
      className="absolute z-[1000] w-full h-[5.875rem] box-border px-0 py-[2.188rem]  laptop:bg-white laptop:fixed"
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
              <HeaderLinks contents={contents} />
            </div>
          </div>

          <Header2 />
        </div>
      </div>
    </header>
  );
};
