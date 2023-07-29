import { loadSingleTypes } from '@/lib/strapi_loader'
import { AvailableLocaleType, availableLocales } from './types'
import { axiosInstance } from './base';

const query = {
  populate: {
    Product_Dropdown_Label: "*",
    Product_Dropdown_Groups: {
      populate: {
        name: "*",
        type: "*",
        links: { populate: "*" },
      },
    },
    Header_SubMenus: {
      populate: {
        title: "*",
        attachment: "*",
        links: { populate: "*" },
      },
    },
    Header_SignIn_Btn: "*",
    Header_Back_Btn: "*",
    Site_Map: {
      populate: {
        title: "*",
        attachment: "*",
        links: { populate: "*" },
      },
    },
    Footer_Form_Title: "*",
    Footer_Form_Button: "*",
    Footer_Input_First_Name_Label: "*",
    Footer_Input_Last_Name_Label: "*",
    Footer_Input_Email_Label: "*",
    Footer_Input_Company_Label: "*",
    Footer: "*",
    Right_Company: "*",
    Right_Reserved: "*",
    Footer_Form_End_Content: "*",
    Footer_Form_End_Button: "*",
  },
}

type PageContent = {
  [key in AvailableLocaleType]: LocalizedContent;
}

interface LocalizedContent {
  Right_Company:                 string;
  Right_Reserved:                string;
  Header_Back_Btn:               string;
  Footer_Form_Title:             string;
  Footer_Input_First_Name_Label: string;
  Footer_Input_Last_Name_Label:  string;
  Footer_Input_Email_Label:      string;
  Footer_Input_Company_Label:    string;
  Footer_Form_Button:            string;
  Footer_Form_End_Button:        string;
  Footer_Form_End_Content:       string;
  createdAt:                     Date;
  updatedAt:                     Date;
  publishedAt:                   Date;
  locale:                        string;
  Product_Dropdown_Label:        null | string;
  Product_Dropdown_Groups:       ProductDropdownGroup[];
  Header_SubMenus:               HeaderSubMenu[];
  Header_SignIn_Btn:             HeaderSignInBtn;
  Site_Map:                      HeaderSubMenu[];
  Footer:                        Footer[];
}

interface Footer {
  id:    number;
  label: string;
  url:   null | string;
  type:  Type;
}

enum Type {
  Exterior = "EXTERIOR",
  Interior = "INTERIOR",
  Text = "TEXT",
}

interface HeaderSignInBtn {
  id:   number;
  text: string;
  link: string;
}

interface HeaderSubMenu {
  id:         number;
  title:      string;
  attachment: null | string;
  links:      Footer[];
}

interface ProductDropdownGroup {
  id:    number;
  name:  string;
  type:  string;
  links: Footer[];
}

export type { PageContent, LocalizedContent };

export const fetch = async () => {
  const res = await loadSingleTypes({
    axiosInstance,
    singularName: 'layout-content',
    locales: availableLocales,
    query,
    limit: 500
  })

  return res as PageContent
}
