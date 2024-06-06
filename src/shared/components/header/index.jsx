import React from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // import state

import Button from "widgets/button";
import localesHelper from "shared/helpers/localesHelper";

import logo from "public/img/logo.svg";
import "./header.css";

const navigation = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/#services",
    title: "Services",
  },
  {
    path: "/#cases",
    title: "Cases",
  },
  {
    path: "/#team",
    title: "Team",
  },
  {
    path: "/#reviews",
    title: "Reviews",
  },
  {
    path: "/#contact",
    title: "Contact",
  },
  {
    path: "/video-guides",
    title: "Guides",
  },
];

export default function Header({ toggleTheme }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = JSON.parse(window.localStorage.getItem("darkTheme") ?? "false");
  const language = window.localStorage.getItem("i18nextLng") ?? "en";


  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="bg-white border-gray-200 w-full z-20 px-4 lg:px-6 py-2.5 dark:bg-dark-gray dark:text-white">
      <div className="flex items-center justify-between border-b border-gray-400 py-8">
        <div className="flex flex-wrap items-center max-w-screen-xl">
          <div className="flex lg:flex-1">
            <a
              href="/"
              className="flex items-center"
              onClick={(e) => linkNav(e, "/")}
            >
              <img src={logo} className="mr-3 h-6 sm:h-9" alt="Cowchain Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Cowchain
              </span>

              <span className="sr-only">test project</span>
            </a>
          </div>
        </div>

        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>

            <div
              className={
                isNavOpen
                  ? "showMenuNav bg-black dark:bg-[#530469] "
                  : "hideMenuNav"
              }
            >
              {" "}
              <div
                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
              >
                <svg
                  className="h-8 w-8 text-gray-600 dark:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
                {navigation.map((n) => (
                  <li key={n.title + "_nav_li"} className="p-10">
                    <a
                      key={n.title + "_nav"}
                      href={n.path}
                      onClick={() => setIsNavOpen((prev) => !prev)}
                      className="text-md text-black font-semibold leading-6 dark:before:bg-white dark:text-white header-nav"
                    >
                      {t([`header.nav.${n.title}`, n.title])}
                    </a>
                  </li>
                ))}

                <div className="controls flex flex-col items-center">
                  <div className=" lg:flex lg:justify-end m-4">
                    <Button
                      title={
                        theme ? (
                          <>{t([`header.themes.white`])}</>
                        ) : (
                          <>{t([`header.themes.dark`])}</>
                        )
                      }
                      onClick={toggleTheme}
                    />
                  </div>

                  <div className=" lg:flex lg:justify-end">
                    <Button
                      title={language === "en" ? <>UA</> : <>EN</>}
                      onClick={localesHelper.toggleLanguage}
                    />
                  </div>
                </div>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex items-center">
            {navigation.map((n) => (
              <li key={n.title + "_li"}>
                <a
                  key={n.title}
                  href={n.path}
                  onClick={() => setIsNavOpen((prev) => !prev)}
                  className="text-md text-black font-semibold leading-6 dark:before:bg-white dark:text-white header-nav"
                >
                  {t([`header.nav.${n.title}`, n.title])}
                </a>
              </li>
            ))}

            <div className="controls flex">
              <div className="hidden lg:flex lg:justify-end ml-4 pl-4 border-2 border-transparent dark:border-l-white border-l-gray-900">
                <Button
                  title={
                    theme ? (
                      <>{t([`header.themes.white`])}</>
                    ) : (
                      <>{t([`header.themes.dark`])}</>
                    )
                  }
                  onClick={toggleTheme}
                />
              </div>

              <div className="hidden lg:flex lg:justify-end ml-4 pl-4 border-2 border-transparent dark:border-l-white border-l-gray-900">
                <Button
                  title={language === "en" ? <>UA</> : <>EN</>}
                  onClick={localesHelper.toggleLanguage}
                />
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}
