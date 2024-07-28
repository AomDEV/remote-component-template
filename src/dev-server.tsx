/**
 * webpack-dev-server entry point for debugging.
 * This file is not bundled with the library during the build process.
 */
import { RemoteComponent } from "@paciolan/remote-component";
import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import LocalComponent from "./index";
import moment from "moment";
import { Props } from "./types";

// different paths for localhost vs s3
const NODE_ENV = process.env.NODE_ENV;
const url = NODE_ENV === "development" ? "/dist/main.js" : "main.js";

const Component = (props: Props) =>
  NODE_ENV === "development"
    ? <LocalComponent {...props} />
    : <RemoteComponent url={url} {...props} />; // prettier-ignore

const App = () => (
  <Fragment>
    <Component
      appVersion="0.0.0"
      timestamp={moment().unix()}
    />
  </Fragment>
);

const node = document.getElementById("root") as Element;
const root = ReactDOM.createRoot(node);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
