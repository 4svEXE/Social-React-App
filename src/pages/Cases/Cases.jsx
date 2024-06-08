import React from "react";
import CasesContent from "./components/cases-content";
import Breadcumbs from "widgets/Breadcrumbs/Breadcumbs";
import { useTranslation } from "react-i18next";

export default function CasesPage() {
  const { t } = useTranslation();

  const navBreadcumbs = [
    {
      path: "/",
      title: t([`header.nav.Home`]),
    },
    {
      path: "#",
      title: t([`header.nav.Cases`]),
    },
  ];

  return (
    <div className=" w-full flex flex-col items-center justify-start bg-white dark:bg-black">
      <Breadcumbs nav={navBreadcumbs} />
      <CasesContent />
    </div>
  );
}
