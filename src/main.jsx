import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./tailwind.custom.scss";
import App from "app";
import { ConnectProwiders } from "app/providers";
import "shared/global/localization/index"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConnectProwiders>
      <App />
    </ConnectProwiders>
  </React.StrictMode>
);
