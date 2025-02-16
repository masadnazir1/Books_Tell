import { createContext, useContext, useState, useRef, useEffect } from "react";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [currentBook, setCurrentBook] = useState(null);
  const [segments, setSegments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (segments.length > 0 && currentIndex < segments.length) {
      audioRef.current.src = segments[currentIndex];
      audioRef.current.load();
      if (isPlaying) audioRef.current.play();
    }
  }, [segments, currentIndex]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentIndex < segments.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const changeSpeed = (speed) => {
    audioRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  return (
    <AudioContext.Provider
      value={{
        currentBook,
        setCurrentBook,
        segments,
        setSegments,
        currentIndex,
        setCurrentIndex,
        isPlaying,
        togglePlayPause,
        handleNext,
        handlePrevious,
        progress,
        setProgress,
        playbackSpeed,
        changeSpeed,
        audioRef,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
