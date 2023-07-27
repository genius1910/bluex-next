import React from "react";
// import styled from "styled-components";
import styled from '@emotion/styled'

import { Colors } from "../constants/share/colors";
import { DefaultFont } from "../constants/style/default-font";

const CustomButtonStyle = styled.button`
  ${DefaultFont}
  width: ${props => props.$width};
  height: ${props => props.$height};
  padding: ${props => (props.$padding ? props.$padding : "0.375rem 0.5rem")};
  margin: ${props => props.$margin};
  border: none;
  border-radius: ${props => props.$borderRadius};
  background-color: ${Colors.SECONDARY};
  line-height: ${props => props.$lineHeight};
  text-align: center;
  color: ${Colors.WHITE};
  font-size: ${props => props.$fontSize};
  font-weight: bold;
  text-transform: none;

  &:hover {
    background-color: ${Colors.BLUE};
  }
`;

const CustomButton = React.forwardRef(
  (
    {
      width,
      height,
      margin,
      borderRadius = "18px",
      padding,
      fontSize = "1rem",
      lineHeight = "normal",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <CustomButtonStyle
        className={className}
        $width={width}
        $height={height}
        $margin={margin}
        $borderRadius={borderRadius}
        $padding={padding}
        $fontSize={fontSize}
        $lineHeight={lineHeight}
        ref={ref}
        {...props}
      >
        {children}
      </CustomButtonStyle>
    );
  }
);
CustomButton.displayName = "CustomButton";

export default CustomButton;
