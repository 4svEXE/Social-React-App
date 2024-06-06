import React from "react";
import WithRouter from "./withRouter";
import WithTheme from "./withTheme";
import WithLayout from "./withLayout";

export function ConnectProwiders({ children }) {
  return (
    <WithRouter>
      <WithTheme>
        <WithLayout children={children} />
      </WithTheme>
    </WithRouter>
  );
}
