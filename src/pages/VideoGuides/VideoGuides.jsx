import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./VideoGuides.module.scss";

import PrimotyButton from "widgets/primotyButton/primotyButton";
import masd from "public/img/home/MASD.png";
import v1 from "public/video/v1.mp4";
import ControllButton from "widgets/controllButton";
export default function VideoGuides() {
  const { t } = useTranslation();

  return (
    <div className="flex pt-10 flex-col h-max items-center bg-white text-black dark:text-white dark:bg-black py-8 bg-opacity-25">
      <div className="w-full grid grid-cols-12 min-h-[50vh]">
        <div className="col-span-6">
          <div className="controll-button">
          <ControllButton text="Details" url="#" />
          </div>
        </div>

        <div className="col-span-4">
          <video src={v1} controls></video>
        </div>
      </div>
    </div>
  );
}
