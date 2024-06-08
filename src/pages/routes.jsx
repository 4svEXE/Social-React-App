import React from "react";
import { useRoutes } from "react-router-dom";

import HomePage from "./Home/Home";
import CasesPage from "./Cases/Cases";
import VideoGuides from "./video-guides/video-guides";
import P404 from "./P404";

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
