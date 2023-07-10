import styled from "@emotion/styled";
import { Button, createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "Oswald",
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          fontFamily: "Oswald",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Oswald",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "Oswald",
        },
      },
    },
  },
});

export const StyledButton = styled(Button)({
  fontFamily: "Oswald",
  textTransform: "none",
  fontWeight: "300",
  fontSize: "16px",
  borderRadius: "10px",
  color: "white",

  "&:disabled": {
    backgroundColor: "#A6A6A6",
    color: "white",
  },
});

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 600, sm: 400, xs: 280 },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
