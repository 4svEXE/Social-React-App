import React from "react";
import VideoGuides from "./VideoGuides/VideoGuides";
import Breadcumbs from "widgets/Breadcrumbs/Breadcumbs";

export default function VideoGuidesPage() {
  const navBreadcumbs = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "#",
      title: "VideoGuides",
    },
  ];

  return (
    <div className=" w-full flex flex-col items-center justify-start bg-white dark:bg-black">
      <Breadcumbs nav={navBreadcumbs} />
      <VideoGuides />
    </div>
  );
}
