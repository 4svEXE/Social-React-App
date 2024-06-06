import React from "react";
import VideoGuides from "./VideoGuides/VideoGuides";
import Breadcumbs from "widgets/Breadcrumbs/Breadcumbs";
import { useTranslation } from "react-i18next";

export default function VideoGuidesPage() {
  const { t } = useTranslation();

  const navBreadcumbs = [
    {
      path: "/",
      title: t([`header.nav.Home`]),
    },
    {
      path: "#",
      title: t([`header.nav.Guides`]),
    },
  ];

  return (
    <div className=" w-full flex flex-col items-center justify-start bg-[#E2ECF4] dark:bg-black">
      <Breadcumbs nav={navBreadcumbs} />
      <VideoGuides />
    </div>
  );
}
