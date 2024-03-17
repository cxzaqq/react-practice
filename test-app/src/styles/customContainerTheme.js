import { createTheme } from "@mui/material/styles";

const customContainerTheme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          textAlign: "center",
          marginTop: 50,
        },
      },
    },
  },
});

export default customContainerTheme;
