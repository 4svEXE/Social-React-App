import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import s from "./VideoGuides.module.scss";

import VideoCard from "widgets/videoCard/VideoCard"; // імпорт нового компонента VideoCard
import phone from "public/img/VideoGuides/phone.png";

// videos
import v1 from "public/video/v1.mp4";
import v2 from "public/video/v2.mp4";

export default function VideoGuides() {
  const { t } = useTranslation();
  const [videoSrc, setVideoSrc] = useState(v1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  const v3 = "https://htz-cs16.spac.me/v/044047128193033064221255171190063040231090229011006006168031/1717667526/75963170/x2/7749af7fd1b2731da502664452eec514/file.mp4";

  const [percentages, setPercentages] = useState({ v1: 0, v2: 0, v3: 0 });
  const [isPlaying, setIsPlaying] = useState({ v1: false, v2: false, v3: false });
  const videoRefs = { v1: useRef(null), v2: useRef(null), v3: useRef(null) };

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
      v1: videoKey === "v1" ? !currentIsPlaying : false,
      v2: videoKey === "v2" ? !currentIsPlaying : false,
      v3: videoKey === "v3" ? !currentIsPlaying : false,
    }));
  };

  const handleButtonClick = (src, videoKey) => {
    if (videoSrc !== src) {
      setVideoSrc(src);
    }
    handlePlayPause(videoKey);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const videoState = {
    videoSrc,
    percentages,
    isPlaying,
    setPercentages,
  };

  return (
    <section className="flex pt-10 flex-col h-max items-center bg-[#E2ECF4] text-black dark:text-white dark:bg-black py-8 bg-opacity-25">
      <div className="w-full grid grid-cols-12 gap-3 min-h-[50vh]">
        <div className="col-span-8">
          <div className={s.cards + " grid xl:grid-cols-2 gap-3"}>
            <VideoCard
              videoKey="v1"
              videoSrc={v1}
              videoRefs={videoRefs}
              videoState={videoState}
              handleButtonClick={handleButtonClick}
              isMobile={isMobile}
            />
            <VideoCard
              videoKey="v2"
              videoSrc={v2}
              videoRefs={videoRefs}
              videoState={videoState}
              handleButtonClick={handleButtonClick}
              isMobile={isMobile}
            />
            <VideoCard
              videoKey="v3"
              videoSrc={v3}
              videoRefs={videoRefs}
              videoState={videoState}
              handleButtonClick={handleButtonClick}
              isMobile={isMobile}
            />
          </div>
        </div>
        {!isMobile && (
          <div className={s.videoContainer + " col-span-4 hidden xl:block"}>
            <img src={phone} alt="phone" className={s.phone} />
            <video
              ref={videoRefs["v1"]}
              src={v1}
              style={{ display: videoSrc === v1 ? "block" : "none" }}
            ></video>
            <video
              ref={videoRefs["v2"]}
              src={v2}
              style={{ display: videoSrc === v2 ? "block" : "none" }}
            ></video>
            <video
              ref={videoRefs["v3"]}
              src={v3}
              style={{ display: videoSrc === v3 ? "block" : "none" }}
            ></video>
          </div>
        )}
      </div>
    </section>
  );
}
