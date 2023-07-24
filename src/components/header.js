import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { Link, navigate } from "gatsby";
import { Box, Button, Slide } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { setLocale } from "../redux/global/global.actions";

import CustomButton from "../components/custom-button";
import { Colors } from "../constants/share/colors";
import { LayoutStyle, WindowSize } from "../constants/style/layout";
import { DefaultFont } from "../constants/style/default-font";
import { LayoutDisplaySetting, LayoutType } from "../constants/page/layout";
import LayoutContents from "../constants/mockup/layout-contents";
import {
  localeList,
  LinkType,
  HeaderMobileMenu,
} from "../constants/page/layout";

import PrimaryLogo from "../images/logo/header-bluex-logo.inline.svg";
import WhiteLogo from "../images/logo/bluex-logo.inline.svg";

const HeaderDefaultFont = css`
  ${DefaultFont}
  font-family: inter;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.57rem;
  color: ${Colors.PRIMARY};
`;

const HeaderFrame = styled.header`
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 5.875rem;
  background: none;

  @media (max-width: ${WindowSize.laptopS}) {
    position: fixed;
    background: ${Colors.WHITE};
  }
`;

const HeaderWrapper = styled.header`
  ${LayoutStyle}
  height: 100%;
  box-sizing: border-box;
  padding: 2.188rem 0rem;

  > div {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

    @media (max-width: ${WindowSize.laptopS}) {
      justify-content: space-between;
    }
  }
`;

const LogoWrapper = styled(Box)`
  > a {
    display: block;
    height: 1.5rem;
  }
`;

const LinksWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 4.413rem;

  > * {
    margin-right: 1.875rem;
  }
  a {
    ${HeaderDefaultFont}
  }
  &.white a,
  &.white .Dropdown-root > .Dropdown-control {
    color: ${Colors.WHITE};
  }
`;

const MenuWrapper = styled(Box)`
  position: absolute;
  right: 0rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  > * + * {
    margin-left: 1.875rem;
  }
`;

const MenuDropdown = styled(Dropdown)`
  &.white {
    .Dropdown-control {
      color: ${Colors.WHITE};
    }
  }
  .Dropdown-control {
    ${HeaderDefaultFont}
    display: flex;
    align-items: center;
    padding: 0.5rem 0.625rem;
    border: none;
    background: none;

    & > div:last-child {
      height: 24px;
    }
  }
  .Dropdown-menu {
    padding: 0.125rem;
    border: none;
    border-radius: 4px;
    box-shadow: 0 2px 20px 0 rgba(0, 21, 73, 0.2);
    overflow: visible;

    .Dropdown-option {
      position: relative;
      min-width: 3.5rem;
      padding: 0.313rem 0.625rem;
      text-align: left;
      ${HeaderDefaultFont}
      font-size: 0.75rem;

      &.is-selected,
      &:hover {
        background-color: ${Colors.GRAY3};
      }
    }
    &::before {
      content: "";
      position: absolute;
      top: -0.313rem;
      left: 2.5rem;
      width: 0;
      height: 0;
      display: block;
      border-left: 0.313rem solid transparent;
      border-right: 0.313rem solid transparent;
      border-bottom: 0.313rem solid ${Colors.WHITE};
    }
  }
`;

const MainMenuDropdown = styled(MenuDropdown)`
  .Dropdown-control {
    padding: 0.5rem 0rem;

    .Dropdown-placeholder {
      display: none;
    }
    &::before {
      content: "${props => props.$content}";
      display: block;
    }
  }
  .Dropdown-menu {
    width: fit-content;

    .Dropdown-option {
      white-space: nowrap;
    }
  }
`;

const ProductMenuDropdown = styled(MainMenuDropdown)`
  .Dropdown-menu {
    max-height: initial;
    padding: 0.625rem 1.25rem 0.75rem;

    .Dropdown-group {
      border-bottom: 1px solid ${Colors.GRAY10};

      .Dropdown-title {
        padding: 0.625rem 0rem 0.313rem;
        color: ${Colors.PRIMARY};
        font-size: 0.75rem;
        font-weight: 500;
      }
      &:last-child {
        border-bottom: none;
      }
    }
    .Dropdown-option {
      padding: 0.313rem 0rem 0.313rem 1.25rem;
      color: ${Colors.SECONDARY};
      font-weight: 700;

      &:before {
        position: absolute;
        top: calc(50% - 0.156rem);
        left: 0.25rem;
        display: block;
        content: "";
        width: 0.313rem;
        height: 0.313rem;
        transform: rotate(45deg);
        background-color: ${Colors.ORANGE2};
      }
    }
  }
`;

const MenuIconWrapper = styled(Box)`
  display: flex;
  justify-content: center;

  > button {
    color: ${Colors.PRIMARY};
  }
`;

const MobileMenuDropdown = styled.div`
  position: fixed;
  left: 0rem;
  top: 5.875rem;
  box-sizing: border-box;
  width: 100vw;
  min-height: calc(100vh - 5.875rem);
  padding-top: 0.312rem;
  background-color: ${Colors.WHITE};
`;

const MobileMenuItem = styled.div`
  > button,
  > a {
    ${HeaderDefaultFont}
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.938rem 1.25rem 0.938rem 1.875rem;
    text-transform: initial;
  }
`;

const MenuI18n = styled(MobileMenuItem)`
  padding: 0.938rem 0rem;
  border-top: 1px solid ${Colors.GRAY2};
`;

const MenuBackBtn = styled(Button)`
  > div {
    display: flex;
    color: ${Colors.SECONDARY};

    > span {
      margin-left: 0.625rem;
    }
  }
`;

const HeaderButton = styled(CustomButton)`
  width: 6.563rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${props => props.$ml};

  > span {
    line-height: 1.375rem;
    font-size: 0.875rem;
  }
`;

export const NavigateExternalUrl = url => {
  window.location = url;
};

export const NavigateNewTab = url => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Header = ({
  type,
  isI18n,
  contents = LayoutContents,
  signInBtn = LayoutContents.Header_SignIn_Btn,
}) => {
  const locale = useSelector(state => state.global.locale);
  const dispatch = useDispatch();
  const productItems = contents.Header_SubMenus.find(
    item => item.attachment === HeaderMobileMenu.PRODUCT
  );
  const companyItems = contents.Header_SubMenus.find(
    item => item.attachment === HeaderMobileMenu.COMPANY
  );
  const resourceItems = contents.Header_SubMenus.find(
    item => item.attachment === HeaderMobileMenu.RESOURCE
  );
  const i18n = localeList.find(item => item.url === locale)?.label;
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileMenuIndex, setMobileMenuIndex] = useState(HeaderMobileMenu.Menu);
  const [mobileMenuDirection, setmobileMenuDirection] = useState("left");

  const initDisplaySetting = () => {
    switch (type) {
      case LayoutType.NONE:
        return LayoutDisplaySetting.NONE;
      case LayoutType.PRIMARY:
        return LayoutDisplaySetting.PRIMARY;
      case LayoutType.WHITE:
        return LayoutDisplaySetting.WHITE;
      case LayoutType.SUPPORT:
        return LayoutDisplaySetting.SUPPORT;
      case LayoutType.LOCALE:
        return LayoutDisplaySetting.LOCALE;
      default:
        return LayoutDisplaySetting.PRIMARY;
    }
  };
  const displaySetting = initDisplaySetting();

  const NavigateLocalUrl = url => {
    navigate(`${url}/${locale}`);
  };

  const onSelectMenuItem = (option, links) => {
    const link = links.filter(link => link.label === option.label)[0];
    if (link.type === LinkType.EXTERIOR) {
      NavigateNewTab(option.value);
    } else {
      NavigateLocalUrl(option.value);
    }
  };

  const onSelectLocale = option => {
    dispatch(
      setLocale(localeList.find(locale => locale.label === option.label)?.url)
    );
  };

  const oncCloseMobileMenu = () => {
    setmobileMenuDirection("down");
    setMobileMenu(false);
    setMobileMenuIndex(HeaderMobileMenu.MENU);
  };

  const onSwitchMobileMenu = linkTitle => {
    setmobileMenuDirection("left");
    setMobileMenuIndex(linkTitle);
  };

  const onSelectLocaleMobile = locale => {
    onSelectLocale(locale);
    setMobileMenuIndex(HeaderMobileMenu.MENU);
  };

  return (
    <HeaderFrame>
      <HeaderWrapper>
        <Box>
          {(displaySetting.PrimaryBluexpayLogo ||
            displaySetting.WhiteBluexpayLogo) && (
            <LogoWrapper>
              <Link to={`/${locale}`} rel="home" title="BlueX Trade">
                <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                  {displaySetting.PrimaryBluexpayLogo && <PrimaryLogo />}
                  {displaySetting.WhiteBluexpayLogo && <WhiteLogo />}
                </Box>
                <Box sx={{ display: { sm: "block", md: "none" } }}>
                  <PrimaryLogo />
                </Box>
              </Link>
            </LogoWrapper>
          )}
          {displaySetting.PrimaryBluextradeLogo && (
            <Button
              onClick={() => NavigateExternalUrl("https://www.bluextrade.com/")}
            >
              <PrimaryLogo />
            </Button>
          )}
          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <LinksWrapper className={`${displaySetting.WhiteStyle && "white"}`}>
              {displaySetting.MenuItems && contents.Product_Dropdown_Label && (
                <ProductMenuDropdown
                  key="product-group-list"
                  options={contents.Product_Dropdown_Groups.map(group => {
                    return {
                      type: group.type,
                      name: group.name,
                      items: group?.links.map(link => {
                        return {
                          label: link?.label,
                          value: link?.url,
                        };
                      }),
                    };
                  })}
                  onChange={event => {
                    NavigateLocalUrl(event?.value);
                  }}
                  arrowOpen={<ExpandLessIcon />}
                  arrowClosed={<ExpandMoreIcon />}
                  $content={contents.Product_Dropdown_Label}
                  jesttestid="ProductGroupDropdown"
                />
              )}
              {displaySetting.MenuItems &&
                contents.Header_SubMenus.slice(1).map(
                  ({ title, attachment, links }, index) =>
                    links.length > 0 ? (
                      <MainMenuDropdown
                        key={`${title}-list-${index}`}
                        options={links.map(link => {
                          return {
                            ...link,
                            value: link?.url,
                          };
                        })}
                        onChange={event => {
                          onSelectMenuItem(event, links);
                        }}
                        arrowOpen={<ExpandLessIcon />}
                        arrowClosed={<ExpandMoreIcon />}
                        $content={title}
                        jesttestid="MainMenuDropdown"
                      />
                    ) : (
                      <Link key={`header-list-${index}`} to={attachment}>
                        {title}
                      </Link>
                    )
                )}
            </LinksWrapper>
          </Box>
          <MenuWrapper>
            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
              <Box display="flex" alignItems="center">
                {/* {displaySetting.Localization && isI18n && (
                  <MenuDropdown
                    className={`${displaySetting.WhiteStyle && "white"}`}
                    options={localeList.map(locale => locale.label)}
                    onChange={onSelectLocale}
                    arrowOpen={<ExpandLessIcon />}
                    arrowClosed={<ExpandMoreIcon />}
                    value={i18n}
                  />
                )} */}
                <HeaderButton
                  $ml="1.25rem"
                  onClick={() => NavigateExternalUrl(signInBtn?.link)}
                >
                  <span>{signInBtn?.text}</span>
                  <NavigateNextIcon />
                </HeaderButton>
              </Box>
            </Box>
          </MenuWrapper>
          <Box sx={{ display: { sm: "block", md: "none" } }}>
            {mobileMenu ? (
              <MenuIconWrapper>
                <Button onClick={() => oncCloseMobileMenu()}>
                  <CloseIcon />
                </Button>
              </MenuIconWrapper>
            ) : (
              <MenuIconWrapper>
                <Button aria-label="Menu" onClick={() => setMobileMenu(true)}>
                  <MenuIcon />
                </Button>
              </MenuIconWrapper>
            )}
            <Slide
              direction="down"
              in={mobileMenu}
              mountOnEnter
              unmountOnExit
              jesttestid="MobileMenuSlide"
            >
              <MobileMenuDropdown>
                <Box display="flex" flexDirection="column" mb="0.938rem">
                  {displaySetting.MenuItems &&
                    contents.Header_SubMenus.map(
                      ({ links, title, attachment }, index) => (
                        <MobileMenuItem key={`mobile-menu-${index}`}>
                          {links.length > 0 ? (
                            <Button
                              onClick={() => onSwitchMobileMenu(attachment)}
                            >
                              <span>{title}</span>
                              <NavigateNextIcon />
                            </Button>
                          ) : (
                            <Link key={`mobile-menu-${index}`} to={attachment}>
                              {title}
                            </Link>
                          )}
                        </MobileMenuItem>
                      )
                    )}
                </Box>
                <Box display="flex" flexDirection="column">
                  {/* {displaySetting.Localization && isI18n && (
                    <MenuI18n>
                      <Button
                        onClick={() =>
                          onSwitchMobileMenu(HeaderMobileMenu.I18N)
                        }
                      >
                        <span>{i18n}</span>
                        <NavigateNextIcon />
                      </Button>
                    </MenuI18n>
                  )} */}
                  <Box display="flex" justifyContent="center">
                    <HeaderButton
                      onClick={() => NavigateExternalUrl(signInBtn?.link)}
                    >
                      <span>{signInBtn?.text}</span>
                      <NavigateNextIcon />
                    </HeaderButton>
                  </Box>
                </Box>
              </MobileMenuDropdown>
            </Slide>
            <Slide
              direction={mobileMenuDirection}
              in={mobileMenu && mobileMenuIndex === HeaderMobileMenu.I18N}
              mountOnEnter
              unmountOnExit
              jesttestid="MobileMenuSlide"
            >
              <MobileMenuDropdown>
                <MobileMenuItem key="i18n-menu-return">
                  <MenuBackBtn
                    onClick={() => setMobileMenuIndex(HeaderMobileMenu.MENU)}
                  >
                    <div>
                      <NavigateBeforeIcon />
                      <span>{contents.Header_Back_Btn}</span>
                    </div>
                  </MenuBackBtn>
                </MobileMenuItem>
                {localeList.map((locale, index) => (
                  <MobileMenuItem key={`i18n-menu-${index}`}>
                    <Button onClick={() => onSelectLocaleMobile(locale)}>
                      <span>{locale.label}</span>
                    </Button>
                  </MobileMenuItem>
                ))}
              </MobileMenuDropdown>
            </Slide>
            <Slide
              direction={mobileMenuDirection}
              in={mobileMenu && mobileMenuIndex === HeaderMobileMenu.PRODUCT}
              mountOnEnter
              unmountOnExit
              jesttestid="MobileMenuSlide"
            >
              <MobileMenuDropdown>
                <MobileMenuItem key="product-menu-return">
                  <MenuBackBtn
                    onClick={() => setMobileMenuIndex(HeaderMobileMenu.MENU)}
                  >
                    <div>
                      <NavigateBeforeIcon />
                      <span>{contents.Header_Back_Btn}</span>
                    </div>
                  </MenuBackBtn>
                </MobileMenuItem>
                {productItems.links.map(({ label, type, url }, index) => (
                  <MobileMenuItem key={`product-menu-${index}`}>
                    <Button
                      onClick={() => {
                        type === LinkType.EXTERIOR
                          ? NavigateNewTab(url)
                          : NavigateLocalUrl(url);
                      }}
                    >
                      <span>{label}</span>
                    </Button>
                  </MobileMenuItem>
                ))}
              </MobileMenuDropdown>
            </Slide>
            <Slide
              direction={mobileMenuDirection}
              in={mobileMenu && mobileMenuIndex === HeaderMobileMenu.COMPANY}
              mountOnEnter
              unmountOnExit
              jesttestid="MobileMenuSlide"
            >
              <MobileMenuDropdown>
                <MobileMenuItem key="company-menu-return">
                  <MenuBackBtn
                    onClick={() => setMobileMenuIndex(HeaderMobileMenu.MENU)}
                  >
                    <div>
                      <NavigateBeforeIcon />
                      <span>{contents.Header_Back_Btn}</span>
                    </div>
                  </MenuBackBtn>
                </MobileMenuItem>
                {companyItems.links.map(({ label, type, url }, index) => (
                  <MobileMenuItem key={`company-menu-${index}`}>
                    <Button
                      onClick={() => {
                        type === LinkType.EXTERIOR
                          ? NavigateNewTab(url)
                          : NavigateLocalUrl(url);
                      }}
                    >
                      <span>{label}</span>
                    </Button>
                  </MobileMenuItem>
                ))}
              </MobileMenuDropdown>
            </Slide>
            <Slide
              direction={mobileMenuDirection}
              in={mobileMenu && mobileMenuIndex === HeaderMobileMenu.RESOURCE}
              mountOnEnter
              unmountOnExit
              jesttestid="MobileMenuSlide"
            >
              <MobileMenuDropdown>
                <MobileMenuItem key="resource-menu-return">
                  <MenuBackBtn
                    onClick={() => setMobileMenuIndex(HeaderMobileMenu.MENU)}
                  >
                    <div>
                      <NavigateBeforeIcon />
                      <span>{contents.Header_Back_Btn}</span>
                    </div>
                  </MenuBackBtn>
                </MobileMenuItem>
                {resourceItems.links.map(({ label, type, url }, index) => (
                  <MobileMenuItem key={`resource-menu-${index}`}>
                    <Button
                      onClick={() => {
                        type === LinkType.EXTERIOR
                          ? NavigateNewTab(url)
                          : NavigateLocalUrl(url);
                      }}
                    >
                      <span>{label}</span>
                    </Button>
                  </MobileMenuItem>
                ))}
              </MobileMenuDropdown>
            </Slide>
          </Box>
        </Box>
      </HeaderWrapper>
    </HeaderFrame>
  );
};

export default Header;
