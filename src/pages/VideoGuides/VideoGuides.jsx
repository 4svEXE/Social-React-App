import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import s from "./VideoGuides.module.scss";

import ControllButton from "widgets/controllButton";

import phone from "public/img/VideoGuides/phone.png";

// icons
import play from "public/img/icons/play.svg";
import pause from "public/img/icons/pause.svg";

// videos
// ! step 1
import v1 from "public/video/v1.mp4";
import v2 from "public/video/v2.mp4";

export default function VideoGuides() {
  const { t } = useTranslation();
  const [videoSrc, setVideoSrc] = useState(v1);

  // ! an examle how to add a new video from other server
  const v3 =
    "https://htz-cs16.spac.me/v/044047128193033064221255171190063040231090229011006006168031/1717667526/75963170/x2/7749af7fd1b2731da502664452eec514/file.mp4";

  // ! Steps to add a new video-conteoller button:
  // ! 1. Add a new video in the videoSrc state
  // ! 2. update states percentages, isPlaying, videoRefs
  // ! 3. add a new button in the handlePlayPause function
  // ! 4. add a new video tag
  // ! 5. update setIsPlaying

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

    for (const ref of Object.values(videoRefs)) {
      ref.current.pause();
    }
    if (currentIsPlaying) {
      video.pause();
    } else {
      video.play();
    }

    // ! step 5
    setIsPlaying((prevIsPlaying) => ({
      ...prevIsPlaying,
      v1: videoKey === "v1" ? !currentIsPlaying : false,
      v2: videoKey === "v2" ? !currentIsPlaying : false,
      v3: videoKey === "v3" ? !currentIsPlaying : false,
    }));
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
    <section className="flex pt-10 flex-col h-max items-center bg-[#E2ECF4] text-black dark:text-white dark:bg-black py-8 bg-opacity-25">
      <div className="w-full grid grid-cols-12 gap-3 min-h-[50vh]">
        <div className="col-span-8">

          <div className={s.cards + ' grid grid-cols-2 gap-3'}>
            <div className={s.card + ' col-span-1 ' + (isPlaying["v1"] ? s.active : '')}>
              <div className={s.controllButton}>
                <ControllButton
                  onClick={() => {
                    handleButtonClick(v1, "v1");
                  }}
                  percentage={Math.floor(percentages["v1"])}
                >
                  <img
                    src={isPlaying["v1"] ? pause : play}
                    alt="control"
                    className={isPlaying["v1"] ? s.pause : s.play}
                  />
                </ControllButton>
              </div>
            </div>

            <div className={s.card + ' col-span-1 ' + (isPlaying["v2"] ? s.active : '')}>
              <div className={s.controllButton}>
                <ControllButton
                  onClick={() => {
                    handleButtonClick(v2, "v2");
                  }}
                  percentage={Math.floor(percentages["v2"])}
                >
                  <img
                    src={isPlaying["v2"] ? pause : play}
                    alt="control"
                    className={isPlaying["v2"] ? s.pause : s.play}
                  />
                </ControllButton>
              </div>
            </div>

          {/* // ! step 3 */}

            <div className={s.card + ' col-span-1 ' + (isPlaying["v3"] ? s.active : '')}>
              <div className={s.controllButton}>
                <ControllButton
                  onClick={() => {
                    handleButtonClick(v3, "v3");
                  }}
                  percentage={Math.floor(percentages["v3"])}
                >
                  <img
                    src={isPlaying["v3"] ? pause : play}
                    alt="control"
                    className={isPlaying["v3"] ? s.pause : s.play}
                  />
                </ControllButton>
              </div>
            </div>
          </div>
        </div>

        <div className={s.videoContainer + " col-span-4"}>
          <img src={phone} alt="phone" className={s.phone} />

          {/* // ! step 4 */}
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
      </div>
    </section>
  );
}
