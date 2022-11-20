import { Box, Container } from "@mui/material";
import { styled } from "@mui/system";

export const PageContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
});

export const ContentWrapper = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

export const FormWrapper = styled(Box)({
  width: "100%",
  maxWidth: "400px",
  height: "450px",
  borderRadius: "10px",
  boxShadow: "var(--dark-shadow)",
  padding: "20px 15px",
  margin: "15px auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
});
