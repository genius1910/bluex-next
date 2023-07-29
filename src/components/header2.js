"use client";

import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled'
import { css } from '@emotion/react'

// import styled, { css } from "styled-components";
import { Box, Button, Slide } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "react-dropdown/style.css";

import CustomButton from "@/components/custom-button";
import { Colors } from "@/constants/share/colors";
import { DefaultFont } from "../constants/style/default-font";
import LayoutContents from "../constants/mockup/layout-contents";
import {
  localeList,
  LinkType,
  HeaderMobileMenu,
} from "../constants/page/layout";

import { MenuDropdown } from './header-menu-old'

const i18n = 'en'

const HeaderDefaultFont = css`
  ${DefaultFont}
  font-family: inter;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.57rem;
  color: ${Colors.PRIMARY};
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
  contents = LayoutContents,
  signInBtn = LayoutContents.Header_SignIn_Btn,
}) => {
  // const locale = useSelector(state => state.global.locale);
  const locale = 'en'

  // const dispatch = useDispatch();
  const productItems = contents.Header_SubMenus.find(
    item => item.attachment === HeaderMobileMenu.PRODUCT
  );
  const companyItems = contents.Header_SubMenus.find(
    item => item.attachment === HeaderMobileMenu.COMPANY
  );
  const resourceItems = contents.Header_SubMenus.find(
    item => item.attachment === HeaderMobileMenu.RESOURCE
  );
  // const i18n = localeList.find(item => item.url === locale)?.label;
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileMenuIndex, setMobileMenuIndex] = useState(HeaderMobileMenu.Menu);
  const [mobileMenuDirection, setmobileMenuDirection] = useState("left");

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
    <>
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
              {
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
                        <Link key={`mobile-menu-${index}`} href={attachment}>
                          {title}
                        </Link>
                      )}
                    </MobileMenuItem>
                  )
                )
              }
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
    </>
  );
};

export default Header;
