import { createTheme } from "@mui/material/styles";

const customListButtonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          marginLeft: 10,
        },
      },
    },
  },
});

export default customListButtonTheme;
