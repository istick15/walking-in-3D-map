import { Box, Button, Typography, useTheme } from "@mui/material";
import type { NextPage } from "next";
import { parseCookies, setCookie } from "nookies";
import { Fragment, useContext } from "react";
import { ThemeConfig, ThemeContext } from "../context/theme";

const Home: NextPage = () => {
  const theme = useTheme();
  const cookies = parseCookies();
  const { settheme } = useContext(ThemeContext);

  return (
    <Box>
      <Fragment>
        <Typography>Workshop for 3D</Typography>
      </Fragment>
    </Box>
  );
};

export default Home;
