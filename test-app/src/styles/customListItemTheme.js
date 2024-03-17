import { createTheme } from "@mui/material/styles";

const customListItemTheme = createTheme({
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          width: "80%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-around",
          border: "1px solid light-gray",
          alignContent: "end",
        },
      },
    },
  },
});

export default customListItemTheme;
