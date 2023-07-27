import React from "react";
// import styled from "styled-components";
import styled from '@emotion/styled'

import { DefaultFont } from "../constants/style/default-font";
import { Colors } from "../constants/share/colors";

const CustomTitleFrame = styled.div`
  ${DefaultFont}
  margin-bottom: ${props => props.marginBottom};
  color: ${props => props.$color};
  font-family: ${props => props.$fontFamily};
  font-size: ${props => props.$fontSize};
  font-weight: ${props => props.$fontWeight};
  line-height: ${props => props.$lineHeight};
  letter-spacing: ${props => props.$letterSpacing};
  white-space: ${props => props.$whiteSpace};
  text-align: ${props => props.$textAlign};
`;

const CustomTitle = ({
  marginBottom,
  color = Colors.PRIMARY,
  fontSize = "1.75rem",
  fontFamily,
  fontWeight = "bold",
  lineHeight = "normal",
  letterSpacing = "normal",
  whiteSpace = "nowrap",
  textAlign = "center",
  className,
  children,
  ...props
}) => (
  <CustomTitleFrame
    className={className}
    marginBottom={marginBottom}
    $color={color}
    $fontFamily={fontFamily}
    $fontSize={fontSize}
    $fontWeight={fontWeight}
    $lineHeight={lineHeight}
    $letterSpacing={letterSpacing}
    $whiteSpace={whiteSpace}
    $textAlign={textAlign}
    {...props}
  >
    {children}
  </CustomTitleFrame>
);

export default CustomTitle;

export const MainTitle = ({ children, ...props }) => (
  <CustomTitle
    lineHeight="2.875rem"
    textTransform="uppercase"
    whiteSpace="wrap"
    color={Colors.SECONDARY}
    fontFamily="Roboto-Medium,serif"
    fontSize="1.75rem"
    fontWeight="900"
    {...props}
  >
    {children}
  </CustomTitle>
);
