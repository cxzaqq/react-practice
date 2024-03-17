import { createTheme } from "@mui/material/styles";

const customListTypographyTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          width: "80%",
        },
      },
    },
  },
});

export default customListTypographyTheme;
