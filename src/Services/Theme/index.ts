import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ptBR as corePTBR } from "@mui/material/locale";
import { ptBR } from "@mui/x-data-grid";

const theme = createTheme(
  {
    palette: {
      primary: {
        light: "hsl(159, 86%, 55%)",
        main: "hsl(159, 86%, 45%)",
        dark: "hsl(159, 86%, 35%)",
        contrastText: "#FFFFFF",
      },
      secondary: {
        light: "hsl(192, 69%, 55%)",
        main: "hsl(192, 69%, 45%)",
        dark: "hsl(192, 69%, 35%)",
        contrastText: "#FFFFFF",
      },
      error: {
        light: "hsl(2, 85%, 68%))",
        main: "hsl(2, 85%, 58%)",
        dark: "hsl(2, 85%, 48%)",
        contrastText: "#FFFFFF",
      },
      warning: {
        light: "hsl(28, 100%, 70%)",
        main: "hsl(28, 100%, 60%)",
        dark: "hsl(28, 100%, 50%)",
        contrastText: "#FFFFFF",
      },
      info: {
        light: "hsl(198, 67%, 62%)",
        main: "hsl(198, 67%, 42%)",
        dark: "hsl(198, 67%, 22%)",
        contrastText: "#FFFFFF",
      },
      success: {
        light: "hsl(123, 58%, 83%)",
        main: "hsl(123, 58%, 63%)",
        dark: "hsl(123, 58%, 43%)",
        contrastText: "#FFFFFF",
      },
    },
  },
  ptBR,
  corePTBR
);

export default responsiveFontSizes(theme);
