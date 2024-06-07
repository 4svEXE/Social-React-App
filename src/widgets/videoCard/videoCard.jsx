import React from "react";
import s from "./VideoCard.module.scss";

import ControllButton from "widgets/controllButton";

// icons
import play from "public/img/icons/play.svg";
import pause from "public/img/icons/pause.svg";


export default function VideoCard({
  src,
  percentages,
  isPlaying,
  handleButtonClick,
  videoRefs,
  refs,
  videoSrc,
  isMobile,
}) {

const videoKey = src
  return (
    <div
      className={
        s.card + " col-span-1 " + (isPlaying[videoKey] ? s.active : "")
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
            "block xl:hidden mt-12 " +
            (videoSrc === src ? s.show : s.hide) +
            (isPlaying[videoKey] ? "" : " " + s.paused)
          }
        ></video>
      )}
    </div>
  );
}
