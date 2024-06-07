import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import s from "./VideoGuides.module.scss";

import ControllButton from "widgets/controllButton";

import phone from "public/img/VideoGuides/phone.png";

// icons
import play from "public/img/icons/play.svg";
import pause from "public/img/icons/pause.svg";

// videos
import v1 from "public/video/v1.mp4";
import v2 from "public/video/v2.mp4";

const VideoCard = ({ src, videoKey, percentages, isPlaying, handleButtonClick, videoRefs, videoSrc }) => {
  return (
    <div className={s.card + " col-span-1 " + (isPlaying[videoKey] ? s.active : "")}>
      <div className={s.controllButton}>
        <ControllButton
          onClick={() => {
            handleButtonClick(src, videoKey);
          }}
          percentage={Math.floor(percentages[videoKey])}
        >
          <img
            src={isPlaying[videoKey] ? pause : play}
            alt="control"
            className={isPlaying[videoKey] ? s.pause : s.play}
          />
        </ControllButton>
      </div>

      <video
        ref={videoRefs[videoKey]}
        src={src}
        className={
          "block xl:hidden mt-12 " +
          (videoSrc === src ? s.show : s.hide) +
          (isPlaying[videoKey] ? "" : " " + s.paused)
        }
      ></video>
    </div>
  );
};