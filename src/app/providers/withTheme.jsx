import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import classNames from "classnames";
import "../../scss/main.scss"

function WithTheme({ children }) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = JSON.parse(window.localStorage.getItem("darkTheme"));

  const [darkTheme, setDarkTheme] = useLocalStorage(
    "darkTheme",
    storedTheme !== null ? storedTheme : prefersDark
  );

  useEffect(() => {
    window.localStorage.setItem("darkTheme", darkTheme);
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((theme) => !theme);
  };

  const component = React.cloneElement(children, {
    toggleTheme,
  });

  return (
    <div
      className={classNames({
        dark: darkTheme,
      })}
    >
      {component}
    </div>
  );
}

export default WithTheme;
