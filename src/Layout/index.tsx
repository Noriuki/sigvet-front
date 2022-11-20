import { Box, Container } from "@mui/material";
import React from "react";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import PageContainer from "./PageContainer";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <div style={{ display: "flex", flex: 1, height: "calc(100vh - 70px)" }}>
        <LeftMenu />
        <PageContainer>{children}</PageContainer>
      </div>
    </Box>
  );
};

export default Layout;
