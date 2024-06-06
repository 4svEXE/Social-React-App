import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./VideoGuides.module.scss";
// import PrimotyButton from "widgets/primotyButton/primotyButton";
// import masd from "public/img/home/MASD.png";
import play from "public/img/icons/play.svg";
import pause from "public/img/icons/pause.svg";
import v1 from "public/video/v1.mp4";
import ControllButton from "widgets/controllButton";

export default function VideoGuides() {
  const { t } = useTranslation();
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const percentage = (video.currentTime / video.duration) * 100;
    setPercentage(percentage);
  };

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="flex pt-10 flex-col h-max items-center bg-white text-black dark:text-white dark:bg-black py-8 bg-opacity-25">
      <div className="w-full grid grid-cols-12 min-h-[50vh]">
        <div className="col-span-6">
          <div className={styles.controllButton}>
            <ControllButton onClick={handlePlayPause} percentage={Math.floor(percentage)}>
              <img src={isPlaying ? pause : play} alt="control" className={isPlaying ? styles.pause : styles.play} />
            </ControllButton>
          </div>
        </div>
        <div className="col-span-4">
          <video ref={videoRef} src={v1} controls></video>
        </div>
      </div>
    </div>
  );
}
