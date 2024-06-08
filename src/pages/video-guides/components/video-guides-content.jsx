import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import s from "./video-guides-content.module.scss";

import VideoCard from "./components/video-card/video-card";

import phone from "public/img/VideoGuides/phone.png";

// videos
import v1 from "/video/v1.mp4";
import v2 from "/video/v2.mp4";

export default function VideoGuides() {
  const { t } = useTranslation();
  const [videoSrc, setVideoSrc] = useState(v1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  const [percentages, setPercentages] = useState({});
  const [isPlaying, setIsPlaying] = useState({});
  const videoRefs = useRef({});

  // ! todo fix the bug with no timeline when resizing

  // ! To add new video - just add a link in "videos"
  const videos = [
    v1, 
    v2, 
    'https://htz-cs12.spac.me/v/044047128193033064221255171190063040231090229011006006168031/1717761032/75892660/x2/8a95313673796302b311b6a9d3ac1fbb/file.mp4',
    'https://htz-cs16.spac.me/v/044047128193033064221255171190063040231090229011006006168031/1717761060/75892640/x2/79e95c0a458ef03852882c8d5dee2a12/file.mp4',
    'https://htz-cs08.spac.me/v/044047128193033064221255171190063040231090229011006006168031/1717761314/75705215/x2/c1cd7c865fa5914518bf8fc339cc1e7d/file.mp4',
  ];

  const cardsContent = [
    {
      title: t("videoGuides.cards.card1.title"),
      description: t("videoGuides.cards.card1.description"),
    },
    {
      title: t("videoGuides.cards.card1.title"),
      description: t("videoGuides.cards.card1.description"),
    },
    {
      title: t("videoGuides.cards.card1.title"),
      description: t("videoGuides.cards.card1.description"),
    },
    {
      title: t("videoGuides.cards.card1.title"),
      description: t("videoGuides.cards.card1.description"),
    },
    {
      title: t("videoGuides.cards.card1.title"),
      description: t("videoGuides.cards.card1.description"),
    },
  ]

  useEffect(() => {
    const percentagesObj = {};
    const isPlayingObj = {};

    for (const video of videos) {
      percentagesObj[video] = 0;
      isPlayingObj[video] = false;
    }

    setIsPlaying(isPlayingObj);
    setPercentages(percentagesObj);
  }, []);

  const handlePlayPause = (videoKey) => {
    const video = videoRefs.current[videoKey];
    const currentIsPlaying = isPlaying[videoKey];

    for (const ref of Object.values(videoRefs.current)) {
      ref.pause();
      if (ref !== video) {
        ref.currentTime = 0;
      }
    }

    if (currentIsPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying((prevIsPlaying) => ({
      ...Object.keys(prevIsPlaying).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      [videoKey]: !currentIsPlaying,
    }));
  };

  const handleTimeUpdate = (videoKey) => {
    const video = videoRefs.current[videoKey];
    if (video) {
      const percentage = (video.currentTime / video.duration) * 100;
      setPercentages((prevPercentages) => ({
        ...prevPercentages,
        [videoKey]: percentage,
      }));
    }
  };

  const handleButtonClick = (src, videoKey) => {
    if (videoSrc !== src) {
      setVideoSrc(src);
    }
    handlePlayPause(videoKey);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1025);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    for (const videoKey in videoRefs.current) {
      const video = videoRefs.current[videoKey];
      if (video) video.addEventListener("timeupdate", () => handleTimeUpdate(videoKey));
    }
    return () => {
      for (const videoKey in videoRefs.current) {
        const video = videoRefs.current[videoKey];
        if (video) {
          video.removeEventListener("timeupdate", () => handleTimeUpdate(videoKey));
        }
      }
    };
  }, [videoRefs.current]);

  return (
    <section className="flex pt-10 flex-col h-max items-center bg-[#E2ECF4] text-black dark:text-white dark:bg-black py-8 z-10">
      <div className="w-full lg:w-[60%] xl:w-full flex gap-3 min-h-[50vh] relative">
        <div className="w-full lg:w-[45%] xl:w-[80%] m-auto">
          <div className={s.cards + " flex wrap gap-3 xl:grid xl:grid-cols-2 xl:w-[60%]"}>

            {videos.map((key, i) => (
              <VideoCard
                key={key}
                src={key}
                refs={(ref) => (videoRefs.current[key] = ref)}
                percentages={percentages}
                isPlaying={isPlaying}
                handleButtonClick={handleButtonClick}
                videoRefs={videoRefs}
                videoSrc={videoSrc}
                isMobile={isMobile}
                cardContent={cardsContent[i]}
              />
            ))}

          </div>
        </div>

        {!isMobile && (
          <div className={s.videoContainer + " col-span-4 hidden lg:block"}>
            <img src={phone} alt="phone" className={s.phone} />

            {videos.map((key) => (
              <video
                key={key}
                ref={(ref) => (videoRefs.current[key] = ref)}
                src={key}
                style={{ display: videoSrc === key ? "block" : "none" }}
              ></video>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
