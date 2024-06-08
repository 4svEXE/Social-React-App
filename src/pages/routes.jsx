import React from "react";
import { useRoutes } from "react-router-dom";

import HomePage from "./Home/home";
import CasesPage from "./Cases/cases";
import VideoGuides from "./video-guides/video-guides";
import P404 from "./404/404";

const routesMap = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/cases",
    element: <CasesPage />,
  },
  {
    path: "/video-guides",
    element: <VideoGuides />,
  },
  {
    path: "*",
    element: <P404 />,
  },
];

const Routes = () => useRoutes(routesMap);

export default Routes;
