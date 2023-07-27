export const localeList = [
  {
    type: "en",
    url: "",
    label: "English",
  },
  {
    type: "zh-Hant-TW",
    url: "tw",
    label: "繁體中文",
  },
  {
    type: "zh-Hans-CN",
    url: "cn",
    label: "简体中文",
  },
];

export const LayoutType = {
  NONE: "none",
  PRIMARY: "primary",
  WHITE: "white",
  SUPPORT: "support",
  LOCALE: "locale",
};

export const LayoutDisplaySetting = {
  NONE: {
    PrimaryBluexpayLogo: true,
    WhiteBluexpayLogo: false,
    PrimaryBluextradeLogo: false,
    MenuItems: false,
    Localization: false,
    WhiteStyle: false,
  },
  PRIMARY: {
    PrimaryBluexpayLogo: true,
    WhiteBluexpayLogo: false,
    PrimaryBluextradeLogo: false,
    MenuItems: true,
    Localization: true,
    WhiteStyle: false,
  },
  WHITE: {
    PrimaryBluexpayLogo: false,
    WhiteBluexpayLogo: true,
    PrimaryBluextradeLogo: false,
    MenuItems: true,
    Localization: true,
    WhiteStyle: true,
  },
  SUPPORT: {
    PrimaryBluexpayLogo: true,
    WhiteBluexpayLogo: false,
    PrimaryBluextradeLogo: false,
    MenuItems: true,
    Localization: false,
    WhiteStyle: false,
  },
  LOCALE: {
    PrimaryBluexpayLogo: false,
    WhiteBluexpayLogo: false,
    PrimaryBluextradeLogo: true,
    MenuItems: false,
    Localization: true,
    WhiteStyle: true,
  },
};

export const LinkType = {
  INTERIOR: "INTERIOR",
  EXTERIOR: "EXTERIOR",
  TEXT: "TEXT",
};

export const HeaderMobileMenu = {
  MENU: "Menu",
  I18N: "I18n",
  PRODUCT: "Products",
  COMPANY: "Company",
  RESOURCE: "Resources",
};

export const SocialMediaLinks = {
  facebook: "https://www.facebook.com/bluextrade/",
  youtube: "https://www.youtube.com/channel/UCeCS7zsN-p5GluHThlPawaQ",
  twitter: "https://mobile.twitter.com/BluexTrade",
  linkedin: "https://www.linkedin.com/company/bluex-trade",
};

export const BeianInfo = {
  bluextrade: [
    {
      label: "沪公网安备 31010902003287号",
      url: "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010902003287",
      icon: true,
    },
    {
      label: "沪ICP备16038327号-2",
      url: "https://beian.miit.gov.cn/",
    },
  ],
  bluexpay: [
    {
      label: "沪公网安备 31010902003288号",
      url: "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010902003288",
      icon: true,
    },
    {
      label: "沪ICP备16038327号-3",
      url: "https://beian.miit.gov.cn/",
      icon: false,
    },
  ],
};
