import React from "react";
import CasesContent from "./Cases/CasesContent";
import Breadcumbs from "widgets/Breadcrumbs/Breadcumbs";

export default function CasesPage() {
  const navBreadcumbs = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "#",
      title: "Cases",
    },
  ];

  return (
    <div className=" w-full flex flex-col items-center justify-start bg-white dark:bg-black">
      <Breadcumbs nav={navBreadcumbs} />
      <CasesContent />
    </div>
  );
}
