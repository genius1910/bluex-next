import Link from 'next/link';
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Colors } from "@/constants/share/colors";
import Dropdown from "react-dropdown";
import { DefaultFont } from "../constants/style/default-font";

const HeaderDefaultFont = css`
  ${DefaultFont}
  font-family: inter;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.57rem;
  color: ${Colors.PRIMARY};
`;

const MenuDropdown = styled(Dropdown)`
  .Dropdown-control {
    ${HeaderDefaultFont}
    display: flex;
    align-items: center;
    padding: 0.5rem 0.625rem;
    border: none;
    background: none;
    color: ${Colors.WHITE};

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

export  { MenuDropdown, MainMenuDropdown, ProductMenuDropdown }

