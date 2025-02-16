import { useAudio } from "../../contexts/AudioPlayerContext";

import Styles from "./GlobalAudioPlayer.module.css";
import { useState, useRef, useEffect } from "react";
import URL from "../utils/API";

const GlobalAudioPlayer = () => {
  const { currentBook, segments, playbackSpeed, changeSpeed, book } =
    useAudio();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preloadedAudio, setPreloadedAudio] = useState(null);
  const [playedTime, setPlayedTime] = useState(0);

  const totalDuration = 2400; // Example: 2 hours (Total audio duration in seconds)
  //
  //ref

  const audioRef = useRef(null);
  const preloadedAudioRef = useRef(null);

  //
  //handle close
  const close = () => {};
  //Load the audo url for next
  useEffect(() => {
    if (segments.length > 0 && currentIndex < segments.length - 1) {
      const nextAudioUrl = `${URL}/api/GetSeg/${currentBook.Category}/${
        currentBook.title
      }/${segments[currentIndex + 1]}`;
      preloadedAudioRef.current.src = nextAudioUrl;
      preloadedAudioRef.current.load();
    }
  }, [book]);

  //
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  //
  //Handle time update
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const elapsedInCurrentSegment = audioRef.current.currentTime;
    const segmentDuration = totalDuration / segments.length || 0; // Estimate per segment

    const previousSegmentsTime = segments
      .slice(0, currentIndex)
      .reduce((acc, seg) => acc + (seg.duration || segmentDuration), 0);

    // console.log(previousSegmentsTime, audioRef.current?.currentTime || 0);
    setPlayedTime(previousSegmentsTime + elapsedInCurrentSegment);
    //
    //
    const audio = audioRef.current;
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    if (duration > 0) {
      const totalElapsedTime = previousSegmentsTime + elapsedInCurrentSegment;
      setPlayedTime(totalElapsedTime);
      setProgress((totalElapsedTime / totalDuration) * 100);

      // When the current segment reaches 90%, preload the next segment
      if (
        currentTime >= duration * 0.9 &&
        currentIndex < segments.length - 1 &&
        !preloadedAudio
      ) {
        const nextAudio = new Audio(
          `${URL}/api/GetSeg/${book.Category}/${book.title}/${
            segments[currentIndex + 1]
          }`
        );
        setPreloadedAudio(nextAudio);
      }
    }
  };

  //
  const handleNext = () => {
    if (currentIndex < segments.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsPlaying(true);
    }
  };
  //
  const handleEnded = () => {
    if (preloadedAudio) {
      audioRef.current.src = preloadedAudio.src;
      audioRef.current.play();
      setCurrentIndex((prev) => prev + 1);
      setIsPlaying(true);
      setPreloadedAudio(null); // Reset preloaded audio
    } else if (currentIndex < segments.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };
  //

  const AUDIO_URL = segments.length
    ? `${URL}/api/GetSeg/${currentBook.Category}/${currentBook.title}/${segments[currentIndex]}`
    : "";
  //
  console.log(AUDIO_URL);
  if (!currentBook) return null; // Hide player if no book is selected

  return (
    <div className={Styles.playerContainer}>
      <button className={Styles.Close}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/9068/9068699.png"
          alt="X"
          className={Styles.CloseIcon}
        />
      </button>
      <div className={Styles.DetailsAndControlBOX}>
        <div className={Styles.BooIcon}>
          <img
            src={currentBook.cover_image_url}
            alt="Book Cover"
            className={Styles.BookCover}
          />
        </div>

        <audio
          ref={audioRef}
          src={AUDIO_URL}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          autoPlay={isPlaying}
        />
        {/* Preloaded hidden audio element */}
        <audio ref={preloadedAudioRef} style={{ display: "none" }} />

        <div className={Styles.controls}>
          <button onClick={handlePrevious}>⏮</button>
          <button onClick={togglePlayPause}>{isPlaying ? "⏸" : "▶"}</button>
          <button onClick={handleNext}>⏭</button>

          <button onClick={() => changeSpeed(playbackSpeed === 1 ? 1.5 : 1)}>
            {playbackSpeed}x
          </button>
        </div>
      </div>

      <div className={Styles.progressBar}>
        <input type="range" value={progress} readOnly />
      </div>

      <div className={Styles.trackInfo}>
        <strong>{currentBook.title}</strong>
      </div>
    </div>
  );
};

export default GlobalAudioPlayer;
