"use client";

import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
// import { useSelector, useDispatch } from "react-redux";
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
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

// import { setLocale } from "../redux/global/global.actions";

// import ConsoleLog from '@/components/console-log'
import CustomButton from "@/components/custom-button";
import { Colors } from "@/constants/share/colors";
import { LayoutStyle, WindowSize } from "../constants/style/layout";
import { DefaultFont } from "../constants/style/default-font";
// import { LayoutDisplaySetting, LayoutType } from "../constants/page/layout";
import LayoutContents from "../constants/mockup/layout-contents";
import {
  localeList,
  LinkType,
  HeaderMobileMenu,
} from "../constants/page/layout";

import Header2 from "./header2"
import HeaderLinks from "./header-links"

import PrimaryLogo from "../images/logo/header-bluex-logo.inline.svg";
import WhiteLogo from "../images/logo/bluex-logo.inline.svg";

const i18n = 'en'


export const NavigateExternalUrl = url => {
  window.location = url;
};

export const NavigateNewTab = url => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const LogoBlock = () => {
  const locale = 'en'
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
    <header
      className="absolute z-[1000] w-full h-[5.875rem] box-border px-0 py-[2.188rem]  laptop:bg-white laptop:fixed"
    >
      <div
        className="w-[60rem] mx-auto my-0 laptop:w-full laptop:box-border laptop:px-5"
      >
        <div
          className="relative h-full flex items-center laptop:justify-between"
        >
          <LogoBlock />

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

export default Header;
