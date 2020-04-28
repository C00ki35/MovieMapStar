import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Amplify from "aws-amplify";
import config from "./config.json";
import SimpleReactLightbox from "simple-react-lightbox";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Components/theme";

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
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
