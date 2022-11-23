import { Theme, Typography, TypographyProps } from "@mui/material";
import { SxProps } from "@mui/system";
import React, { FC, useMemo, useState } from "react";

export interface IText {
  type?: "extraLight" | "light" | "medium" | "regular" | "bold" | "black";
  size?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline";
  color?: TypographyProps["color"];
  style?: SxProps<Theme>;
  children: any;
  anyProps?: TypographyProps;
}

const Text: FC<IText> = ({ type, children, style, size, color, anyProps }) => {
  const [fontType, setFontType] = useState<any>("");
  const [fontSize, setFontSize] = useState<any>(0);
  useMemo(() => {
    setFontType(() => {
      switch (type) {
        case "extraLight":
          return ["NotoSans-ExtraLight", "Prompt-ExtraLight"].join(",");
        case "light":
          return ["NotoSans-Light", "Prompt-Light"].join(",");
        case "medium":
          return ["NotoSans-Medium", "Prompt-Medium"].join(",");
        case "regular":
          return ["NotoSans-Regular", "Prompt-Regular"].join(",");
        case "bold":
          return ["NotoSans-Bold", "Prompt-Bold"].join(",");
        case "black":
          return ["NotoSans-Black", "Prompt-Black"].join(",");
        default:
          return ["NotoSans-Regular", "Prompt-Regular"].join(",");
      }
    });

    setFontSize(() => {
      switch (size) {
        case "overline":
          return 10;
        case "caption":
          return 12;
        case "subtitle2":
          return 14;
        case "subtitle1":
          return 16;
        case "body2":
          return 18;
        case "body1":
          return 20;
        case "h6":
          return 20;
        case "h5":
          return 23;
        case "h4":
          return 32;
        case "h3":
          return 48;
        case "h2":
          return 60;
        case "h1":
          return 96;
        default:
          return 16;
      }
    });
  }, []);

  return (
    <Typography
      {...anyProps}
      sx={{
        fontFamily: fontType,
        fontSize: fontSize,
        ...style,
      }}
      color={color}
    >
      {children}
    </Typography>
  );
};

export default Text;
