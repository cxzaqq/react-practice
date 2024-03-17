import { createTheme } from "@mui/material/styles";

const customButtonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: 55,
          marginBottom: 30,
        },
      },
    },
  },
});

export default customButtonTheme;
