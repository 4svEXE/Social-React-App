import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import s from "./VideoGuides.module.scss";

import VideoCard from "widgets/VideoCard.VideoCard";

import phone from "public/img/VideoGuides/phone.png";


// videos
// ! step 1
import v1 from "public/video/v1.mp4";
import v2 from "public/video/v2.mp4";

export default function VideoGuides() {
  const { t } = useTranslation();
  const [videoSrc, setVideoSrc] = useState(v1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const [percentages, setPercentages] = useState({ v1: 0, v2: 0 });
  const [isPlaying, setIsPlaying] = useState({ v1: false, v2: false });
  const videoRefs = { v1: useRef(null), v2: useRef(null) };

  const handlePlayPause = (videoKey) => {
    const video = videoRefs[videoKey].current;
    const currentIsPlaying = isPlaying[videoKey];

    for (const ref of Object.values(videoRefs)) {
      ref.current.pause();
      if (ref.current !== video) {
        ref.current.currentTime = 0;
      }
    }

    if (currentIsPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying((prevIsPlaying) => ({
      ...prevIsPlaying,
      [videoKey]: !currentIsPlaying,
    }));
  };

  const handleTimeUpdate = (videoKey) => {
    const video = videoRefs[videoKey].current;
    const percentage = (video.currentTime / video.duration) * 100;
    setPercentages((prevPercentages) => ({
      ...prevPercentages,
      [videoKey]: percentage,
    }));
  };

  const handleButtonClick = (src, videoKey) => {
    if (videoSrc !== src) {
      setVideoSrc(src);
    }
    handlePlayPause(videoKey);
  };

  useEffect(() => {
    for (const videoKey in videoRefs) {
      const video = videoRefs[videoKey].current;
      video.addEventListener("timeupdate", () => handleTimeUpdate(videoKey));
    }
    return () => {
      for (const videoKey in videoRefs) {
        const video = videoRefs[videoKey].current;
        video.removeEventListener("timeupdate", () =>
          handleTimeUpdate(videoKey)
        );
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="flex pt-10 flex-col h-max items-center bg-[#E2ECF4] text-black dark:text-white dark:bg-black py-8 bg-opacity-25">
      <div className="w-full grid grid-cols-12 gap-3 min-h-[50vh]">
        <div className="col-span-8">
          <div className={s.cards + " grid xl:grid-cols-2 gap-3"}>
            <VideoCard
              src={v1}
              videoKey="v1"
              percentages={percentages}
              isPlaying={isPlaying}
              handleButtonClick={handleButtonClick}
              videoRefs={videoRefs}
              videoSrc={videoSrc}
            />
            <VideoCard
              src={v2}
              videoKey="v2"
              percentages={percentages}
              isPlaying={isPlaying}
              handleButtonClick={handleButtonClick}
              videoRefs={videoRefs}
              videoSrc={videoSrc}
            />
          </div>
        </div>

        {!isMobile && (
          <div className={s.videoContainer + " col-span-4 hidden xl:block"}>
            <img src={phone} alt="phone" className={s.phone} />

            {Object.keys(videoRefs).map((key) => (
              <video
                key={key}
                ref={videoRefs[key]}
                src={key === "v1" ? v1 : v2}
                style={{ display: videoSrc === (key === "v1" ? v1 : v2) ? "block" : "none" }}
              ></video>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}