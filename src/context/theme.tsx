import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import React, { useState, useMemo, createContext, FC } from "react";
import { parseCookies, setCookie } from "nookies";

declare module "@mui/material/styles" {
  interface Palette {
    gradient: any;
    type: any;
  }
  interface PaletteOptions {
    gradient: any;
    type: any;
  }
  interface Theme {
    config?: any;
  }
  interface ThemeOptions {
    config?: any;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true;
    maptool: true;
    icon: true;
  }
  interface ButtonPropsColorOverrides {
    gradient: true;
    glassmorphism5: true;
    gradient1: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    glassmorphism: true;
  }

  interface TextFieldPropsVariantOverrides {
    glassmorphism: true;
  }
}

export const mainlogo = "/icon/gistda-logo-png.png";
export const whitelogo = "/icon/gistda-logo-white.png";

export const ThemeConfig: any = {
  default: {
    type: "default",
    mode: "light",
    primary: {
      main: `#4685F7`,
      dark: `#233967`,
      light: `#5CBFCC`,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: `#426A7C`,
      dark: `#354C57`,
      light: `#E2E3E3`,
      contrastText: "#FFFFFF",
    },
    background: { paper: "#FFFFFF" },
    other: {
      customize1: "#79D6D4",
      customize2: "#79B0BA",
      customize3: "#C9CF63",
      customize4: "#C9CF63",
      customize5: "#50A88A",
      customize6: "#EDD66F",
    },
    gradient: {
      gradient1: "linear-gradient(153.43deg, #4685F7 16.67%, #5CBFCC 100%)",
      gradient2: "linear-gradient(153.43deg, #233967 16.67%, #238C9A 100%)",
      gradient3:
        "linear-gradient(128.35deg, #4685F7 -29.46%, #498EF0 -4.67%, #50A0E3 11.86%, #54ABDB 38.03%, #5CBFCC 100%)",
      gradient4:
        "linear-gradient(156.61deg, #C9CF63 61.81%, #D8D268 78.13%, #E3D46C 88.89%, #EDD66F 100%)",
    },
    glassmorphism: {
      glassmorphism1: "rgba(255, 255, 255, 0.7)",
      glassmorphism2: "rgba(255, 255, 255, 0.2)",
      glassmorphism3: "rgba(53, 76, 87, 0.95)",
      glassmorphism4: "rgba(53, 76, 87, 0.7)",
      glassmorphism5: "linear-gradient(180deg, #2B2D3F 0%, #354C57 100%)",
      glassmorphism6: "linear-gradient(180deg, #354C57 0%, #2B2D3F 100%)",
    },
    error: { main: `#F44336`, dark: `#E31B0C`, light: `#F88078` },
    warning: { main: `#FF9800`, dark: `#C77700`, light: `#FFB547` },
    info: { main: `#2196F3`, dark: `#0B79D0`, light: `#64B6F7` },
    success: { main: `#4CAF50`, dark: `#3B873E`, light: `#7BC67E` },
    text: {
      primary: `#414143`,
      secondary: `#8E8E8B`,
      disabled: `#D0D5CE`,
    },
  },
  dark: {
    type: "dark",
    mode: "light",
    primary: {
      main: `#000000`,
      dark: `#233967`,
      light: `#5CBFCC`,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: `#426A7C`,
      dark: `#354C57`,
      light: `#E2E3E3`,
      contrastText: "#FFFFFF",
    },
    background: { paper: "#FFFFFF" },
    other: {
      customize1: "#79D6D4",
      customize2: "#79B0BA",
      customize3: "#C9CF63",
      customize4: "#C9CF63",
      customize5: "#50A88A",
      customize6: "#EDD66F",
    },
    gradient: {
      gradient1: "linear-gradient(153.43deg, #4685F7 16.67%, #5CBFCC 100%)",
      gradient2: "linear-gradient(153.43deg, #233967 16.67%, #238C9A 100%)",
      gradient3:
        "linear-gradient(128.35deg, #4685F7 -29.46%, #498EF0 -4.67%, #50A0E3 11.86%, #54ABDB 38.03%, #5CBFCC 100%)",
      gradient4:
        "linear-gradient(156.61deg, #C9CF63 61.81%, #D8D268 78.13%, #E3D46C 88.89%, #EDD66F 100%)",
    },
    glassmorphism: {
      glassmorphism1: "rgba(255, 255, 255, 0.7)",
      glassmorphism2: "rgba(255, 255, 255, 0.2)",
      glassmorphism3: "rgba(53, 76, 87, 0.95)",
      glassmorphism4: "rgba(53, 76, 87, 0.7)",
      glassmorphism5: "linear-gradient(180deg, #2B2D3F 0%, #354C57 100%)",
      glassmorphism6: "linear-gradient(180deg, #354C57 0%, #2B2D3F 100%)",
    },
    error: { main: `#F44336`, dark: `#E31B0C`, light: `#F88078` },
    warning: { main: `#FF9800`, dark: `#C77700`, light: `#FFB547` },
    info: { main: `#2196F3`, dark: `#0B79D0`, light: `#64B6F7` },
    success: { main: `#4CAF50`, dark: `#3B873E`, light: `#7BC67E` },
    text: {
      primary: `#414143`,
      secondary: `#8E8E8B`,
      disabled: `#D0D5CE`,
    },
  },
};

interface IThemeContext {
  settheme: Function;
}
const initalState: IThemeContext = {
  settheme: () => {},
};

export const ThemeContext = createContext<IThemeContext>(initalState);
export const ThemeContextProvider: FC<{ children: React.ReactNode }> = (
  props
) => {
  const cookies = parseCookies();
  const [theme, settheme] = useState<any>(
    createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1440,
          xl: 1920,
        },
      },

      typography: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
      },
      config: {
        card: {
          boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        },
        glassmorphism: {
          backdropFilter: "blur(10px)",
        },
      },
    })
  );

  useMemo(() => {
    settheme({
      ...theme,
      palette:
        ThemeConfig[
          cookies[process.env.NEXT_PUBLIC_THEME]
            ? cookies[process.env.NEXT_PUBLIC_THEME]
            : "default"
        ],
    });
  }, [cookies[process.env.NEXT_PUBLIC_THEME]]);

  const Theme = useMemo(() => {
    cookies[process.env.NEXT_PUBLIC_THEME] === undefined &&
      setCookie(null, process.env.NEXT_PUBLIC_THEME as any, "default");
    return createTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ settheme }}>
      <ThemeProvider theme={Theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
export const ThemeContextConsumer = ThemeContext.Consumer;
