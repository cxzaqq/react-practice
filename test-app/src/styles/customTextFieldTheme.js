import { createTheme } from "@mui/material/styles";

const customTextFieldTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "50%",
          marginBottom: 30,
          position: "sticky ",
        },
      },
    },
  },
});

export default customTextFieldTheme;
