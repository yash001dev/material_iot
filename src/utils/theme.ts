import { createTheme } from "@mui/material";

export const mainStyle = {
  width: "50rem",
  alignItems: "center",
  margin: "auto",
  marginTop: "20px",
};

export const loaderStyle = {
  display: "flex",
  margin: "auto",
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
};

export const loaderInnerStyle = {
  margin: "auto",
};

export const tableRoot = {
  width: "100%",
};

export const tableContainer = {
  maxHeight: 500,
};

export const buttonBoxStyle = {
  display: "flex !important",
  margin: 0,
};

export const textFieldStyle = {
  margin: "0 !important",
  marginRight: "15px !important",
  maxWidth: "85px",
};

export const iotTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFC812",
    },
  },
});

export const iotContainer = createTheme({
  components: {},
});
