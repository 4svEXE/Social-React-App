import React from "react";
import s from "./video-card.module.scss";

import ControllButton from "widgets/controllButton";

// icons
import play from "/img/icons/play.svg";
import pause from "/img/icons/pause.svg";

export default function VideoCard({
  src,
  percentages,
  isPlaying,
  handleButtonClick,
  videoRefs,
  refs,
  videoSrc,
  isMobile,
  cardContent,
}) {
  const videoKey = src;
  return (
    <div
      className={
        s.card + " lg:cols-span-1 dark:text-[#f1f1f1] text-[#0f0f0f] " + (isPlaying[videoKey] ? s.active : "")
      }
    >
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

      {isMobile && (
        <video
          ref={refs}
          src={src}
          className={
            "block lg:hidden mt-12 " +
            (videoSrc === src ? s.show : s.hide) +
            (isPlaying[videoKey] ? "" : " " + s.paused)
          }
        ></video>
      )}


        <h6 className="">{cardContent.title}</h6>
        <p>{cardContent.description}</p>

    </div>
  );
}
