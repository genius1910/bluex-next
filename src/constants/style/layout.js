import { css } from '@emotion/react'
// import { css } from 'styled-components'

export const WindowSizeValue = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560
}

export const WindowSize = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptopS: '960px',
  laptopM: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const LayoutStyle = css`
  width: 60rem;
  margin: 0rem auto;

  @media(max-width: ${WindowSize.laptopS}) {
    width: 100%;
    box-sizing: border-box;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
`;

export const DisableComponent = css`
  display: none;
  opacity: 0;
  pointer-events: none;
`;

export const ReCaptchaActions = {
  FRONT_FORM: "front_form_submit",
  ECOMMERCE_FORM: "ecommerce_form_submit",
  DEVELOPER_FORM: "developer_form_submit",
};