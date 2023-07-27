import Link from 'next/link';

import { MainMenuDropdown, ProductMenuDropdown } from './header-menu'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";


export default function HeaderLinks({ contents }) {
  return <>
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
    { contents.Header_SubMenus.slice(1).map(
      ({ title, attachment, links }, index) => {
        return links.length > 0 ? (
          <MainMenuDropdown
            key={`${title}-list-${index}`}
            options={links.map(link => {
              return {
                ...link,
                value: link?.url,
              };
            })}
            onChange={event => {
              // onSelectMenuItem(event, links);
            }}
            arrowOpen={<ExpandLessIcon />}
            arrowClosed={<ExpandMoreIcon />}
            $content={title}
            jesttestid="MainMenuDropdown"
          />
        ) : (
          <Link key={`header-list-${index}`} href={attachment}>
            {title}
          </Link>
        )
      })
    }
  </>
}