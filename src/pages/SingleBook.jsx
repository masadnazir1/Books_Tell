import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Styles from "../css/SingleBookPage.module.css";
import back from "../assets/General/back.png";
import sound from "../assets/General/sound.png";
import like from "../assets/TabsIcons/Heart.png";
import Modal from "../components/ModalProfile";
import URL from "../utils/API";
import { useNavigate, useLocation, useFetcher } from "react-router-dom";
import { useAudio } from "../../contexts/AudioPlayerContext";

const SingleBookPage = () => {
  const location = useLocation();
  const { book } = location.state || {};
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // Default speed
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);

  // const [segments, setSegments] = useState([]);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preloadedAudio, setPreloadedAudio] = useState(null);
  const [playedTime, setPlayedTime] = useState(0);
  const totalDuration = 2400; // Example: 2 hours (Total audio duration in seconds)
  //
  const { setCurrentBook, setSegments, setCurrentIndex, setbook } = useAudio();

  useEffect(() => {
    // setbook(book);
  }, []);

  const audioRef = useRef(null);
  const preloadedAudioRef = useRef(null);
  //
  //
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  //

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await axios.get(
          `${URL}/api/GetMeta/${book.Category}/${book.title}/segments`
        );
        setSegments(response.data.segments || []);
        setCurrentIndex(0);
        setCurrentBook(book);
      } catch (error) {
        console.error("Error fetching segments:", error);
      }
    };
    fetchSegments();
  }, [book]);

  // useEffect(() => {
  //   if (segments.length > 0 && currentIndex < segments.length - 1) {
  //     const nextAudioUrl = `${URL}/api/GetSeg/${book.Category}/${book.title}/${
  //       segments[currentIndex + 1]
  //     }`;
  //     preloadedAudioRef.current.src = nextAudioUrl;
  //     preloadedAudioRef.current.load();
  //   }
  // }, [book]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  //
  //
  const toggleSpeedOptions = () => {
    setShowSpeedOptions(!showSpeedOptions);
  };

  const changeSpeed = (speed) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
    setPlaybackSpeed(speed);
    setShowSpeedOptions(false); // Hide dropdown after selection
  };

  //
  //

  const handleTimeUpdate = () => {
    //
    //
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

  const handleSeek = (e) => {
    const newTotalTime = (e.target.value / 100) * totalDuration;
    let newSegmentIndex = 0;
    let accumulatedTime = 0;

    for (let i = 0; i < segments.length; i++) {
      accumulatedTime += segments[i].duration || segmentDuration;
      if (newTotalTime < accumulatedTime) {
        newSegmentIndex = i;
        break;
      }
    }

    setCurrentIndex(newSegmentIndex);
    audioRef.current.currentTime =
      newTotalTime - (accumulatedTime - segments[newSegmentIndex].duration);
    setProgress(e.target.value);
  };

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

  const addtoShelf = async () => {
    const data = {
      user_id: "1234",
      book_id: "12345",
    };

    try {
      const response = await axios.post(`${URL}/api/AddToMyShelf/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        alert(response.data.ok);
      }
    } catch (error) {
      console.error("Error adding the book to the shelf");
    }
  };

  // const AUDIO_URL = segments.length
  //   ? `${URL}/api/GetSeg/${book.Category}/${book.title}/${segments[currentIndex]}`
  //   : "";

  return (
    <div className={Styles.SingleBookPageContainer}>
      <div className={Styles.SingleBookPageHeader}>
        <img
          src={back}
          alt="Back"
          className={Styles.back}
          onClick={() => navigate(-1)}
        />
        <img
          src={sound}
          alt="Sound"
          className={Styles.back}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <section className={Styles.ProfileInfo}>
        <div className={Styles.BooKcover}>
          <img
            src={book.cover_image_url}
            alt="Book Cover"
            className={Styles.BooKcoverImage}
          />
        </div>
      </section>

      <section className={Styles.BookInfoBox}>
        <div className={Styles.BooKInfo}>
          <strong className={Styles.BookTitle}>{book.title}</strong>
          <p className={Styles.BookAuthor}>By: {book.author}</p>
        </div>
      </section>

      <div className={Styles.containerPlayer}>
        <>
          <audio
            ref={audioRef}
            // src={AUDIO_URL}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            autoPlay={isPlaying}
          />
          {/* Preloaded hidden audio element */}
          <audio ref={preloadedAudioRef} style={{ display: "none" }} />

          <div className={Styles.controls}>
            <div className={Styles.ControlButtonsAudio}>
              <button
                onClick={handlePrevious}
                // disabled={currentIndex === 0}
                className={Styles.ControlButtons}
              >
                ⏮
              </button>
              <button
                onClick={togglePlayPause}
                className={Styles.ControlButtons}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button
                className={Styles.ControlButtons}
                onClick={handleNext}
                // disabled={currentIndex === segments.length - 1}
              >
                ⏭
              </button>
              <div className={Styles.speedControls}>
                <button
                  onClick={toggleSpeedOptions}
                  className={Styles.SpeedButton}
                >
                  {playbackSpeed}x ▼
                </button>

                {showSpeedOptions && (
                  <ul className={Styles.speedDropdown}>
                    <li onClick={() => changeSpeed(0.5)}>0.5x</li>
                    <li onClick={() => changeSpeed(1.0)}>1x</li>
                    <li onClick={() => changeSpeed(1.5)}>1.5x</li>
                    <li onClick={() => changeSpeed(2.0)}>2x</li>
                  </ul>
                )}
              </div>
            </div>

            <button className={Styles.ActionButton} onClick={addtoShelf}>
              <img src={like} alt="Like" className={Styles.LikeIcon} />
            </button>
          </div>
          <div className={Styles.RangeContainer}>
            <input
              type="range"
              value={progress}
              max="100"
              onChange={handleSeek}
              className={Styles.slider}
            />
            <p className={Styles.Playbacktime}>
              {formatTime(playedTime)} / {formatTime(totalDuration)}
            </p>
          </div>
        </>
      </div>

      <section className={Styles.BookDescription}>
        <strong>Description</strong>
        <p>{book.description}</p>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Hello, this is a modal!</h2>
        <p>Click outside or press ✖ to close.</p>
      </Modal>
    </div>
  );
};

export default SingleBookPage;
