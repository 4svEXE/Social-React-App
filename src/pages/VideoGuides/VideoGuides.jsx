import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./VideoGuides.module.scss";

import ControllButton from "widgets/controllButton";

// icons
import play from "public/img/icons/play.svg";
import pause from "public/img/icons/pause.svg";

// videos
// ! step 1
import v1 from "public/video/v1.mp4";
import v2 from "public/video/v2.mp4";
import v3 from "https://htz-cs16.spac.me/v/044047128193033064221255171190063040231090229011006006168031/1717667526/75963170/x2/7749af7fd1b2731da502664452eec514/file.mp4";

export default function VideoGuides() {
  const { t } = useTranslation();
  const [videoSrc, setVideoSrc] = useState("");

  // ! Steps to add a new video-conteoller button:
  // ! 1. Add a new video in the videoSrc state
  // ! 2. update states percentages, isPlaying, videoRefs
  // ! 3. add a new button in the handlePlayPause function
  // ! 4. add a new video tag

  // ! step 2
  const [percentages, setPercentages] = useState({ v1: 0, v2: 0, v3: 0 });
  const [isPlaying, setIsPlaying] = useState({
    v1: false,
    v2: false,
    v3: false,
  });
  const videoRefs = {
    v1: useRef(null),
    v2: useRef(null),
    v3: useRef(null),
  };

  const handlePlayPause = (videoKey) => {
    const video = videoRefs[videoKey].current;
    const currentIsPlaying = isPlaying[videoKey];
    if (currentIsPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying({ ...isPlaying, [videoKey]: !currentIsPlaying });
  };

  const handleTimeUpdate = (videoKey) => {
    const video = videoRefs[videoKey].current;
    const percentage = (video.currentTime / video.duration) * 100;
    setPercentages({ ...percentages, [videoKey]: percentage });
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

  return (
    <div className="flex pt-10 flex-col h-max items-center bg-white text-black dark:text-white dark:bg-black py-8 bg-opacity-25">
      <div className="w-full grid grid-cols-12 min-h-[50vh]">
        <div className="col-span-6">
          <div className={styles.controllButton}>
            <ControllButton
              onClick={() => {
                handleButtonClick(v1, "v1");
              }}
              percentage={Math.floor(percentages["v1"])}
            >
              <img
                src={isPlaying["v1"] ? pause : play}
                alt="control"
                className={isPlaying["v1"] ? styles.pause : styles.play}
              />
            </ControllButton>
          </div>

          <div className={styles.controllButton}>
            <ControllButton
              onClick={() => {
                handleButtonClick(v2, "v2");
              }}
              percentage={Math.floor(percentages["v2"])}
            >
              <img
                src={isPlaying["v2"] ? pause : play}
                alt="control"
                className={isPlaying["v2"] ? styles.pause : styles.play}
              />
            </ControllButton>
          </div>

          {/* // ! step 3 */}
          <div className={styles.controllButton}>
            <ControllButton
              onClick={() => {
                handleButtonClick(v3, "v3");
              }}
              percentage={Math.floor(percentages["v3"])}
            >
              <img
                src={isPlaying["v3"] ? pause : play}
                alt="control"
                className={isPlaying["v3"] ? styles.pause : styles.play}
              />
            </ControllButton>
          </div>
        </div>

        <div className="col-span-4">
          {/* // ! step 4 */}
          <video ref={videoRefs['v1']} src={v1} controls style={{ display: videoSrc === v1 ? 'block' : 'none' }}></video>
          <video ref={videoRefs['v2']} src={v2} controls style={{ display: videoSrc === v2 ? 'block' : 'none' }}></video>
          <video ref={videoRefs['v3']} src={v3} controls style={{ display: videoSrc === v3 ? 'block' : 'none' }}></video>
        </div>
      </div>
    </div>
  );
}
