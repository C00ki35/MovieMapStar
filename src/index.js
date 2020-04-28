import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Amplify from "aws-amplify";
import SimpleReactLightbox from "simple-react-lightbox";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Components/theme";

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: process.env.cognito_region,
    userPoolId: process.env.user_pool_id,
    userPoolWebClientId: process.env.app_client_id,
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
