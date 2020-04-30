import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Amplify from "aws-amplify";
import SimpleReactLightbox from "simple-react-lightbox";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Components/theme";

require("dotenv").config();

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: process.env.REACT_APP_cognito_region,
    userPoolId: process.env.REACT_APP_user_pool_id,
    userPoolWebClientId: process.env.REACT_APP_app_client_id,
  },
});

ReactDOM.render(
  <>
    <SimpleReactLightbox>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </SimpleReactLightbox>
  </>,
  document.getElementById("root")
);
