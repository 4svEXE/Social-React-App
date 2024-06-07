import React, { useRef, useEffect } from "react";
import ControllButton from "widgets/controllButton";
import play from "public/img/icons/play.svg";
import pause from "public/img/icons/pause.svg";
import s from "./VideoCard.module.scss";

const VideoCard = ({ videoKey, videoSrc, videoRefs, videoState, handleButtonClick, isMobile }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRefs[videoKey] = videoRef;

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const video = videoRef.current;
        const percentage = (video.currentTime / video.duration) * 100;
        videoState.setPercentages((prevPercentages) => ({
          ...prevPercentages,
          [videoKey]: percentage,
        }));
      }
    };

    if (videoRef.current) {
      const video = videoRef.current;
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoRef.current) {
        const video = videoRef.current;
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [videoKey, videoRefs, videoState]);

  return (
    <div className={s.card + " col-span-1 " + (videoState.isPlaying[videoKey] ? s.active : "")}>
      <div className={s.controllButton}>
        <ControllButton
          onClick={() => handleButtonClick(videoSrc, videoKey)}
          percentage={Math.floor(videoState.percentages[videoKey])}
        >
          <img
            src={videoState.isPlaying[videoKey] ? pause : play}
            alt="control"
            className={videoState.isPlaying[videoKey] ? s.pause : s.play}
          />
        </ControllButton>
      </div>

      {isMobile && (
        <video
          ref={videoRef}
          src={videoSrc}
          className={
            "block xl:hidden mt-12 " +
            (videoState.videoSrc === videoSrc ? s.show : s.hide) +
            (videoState.isPlaying[videoKey] ? "" : " " + s.paused)
          }
        ></video>
      )}
    </div>
  );
};

export default VideoCard;
