import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Styles from "../css/SingleBookPage.module.css";
import back from "../assets/General/back.png";
import sound from "../assets/General/sound.png";
import like from "../assets/TabsIcons/Heart.png";
import Modal from "../components/ModalProfile";
import URL from "../utils/API";
import { useNavigate, useLocation } from "react-router-dom";

const SingleBookPage = () => {
  const location = useLocation();
  const { book } = location.state || {};

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segments, setSegments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await axios.get(
          `${URL}/api/GetMeta/${book.Category}/${book.title}/segments`
        );
        setSegments(response.data.segments || []);
      } catch (error) {
        console.error("Error fetching segments:", error);
      }
    };
    fetchSegments();
  }, [book]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
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
    if (currentIndex < segments.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  //add the book to the shelf
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

  const AUDIO_URL = segments.length
    ? `${URL}/api/GetSeg/${book.Category}/${book.title}/${segments[currentIndex]}`
    : "";

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
        {segments.length > 0 ? (
          <>
            <audio
              ref={audioRef}
              src={AUDIO_URL}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              autoPlay={isPlaying}
            />
            <div className={Styles.controls}>
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
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
                disabled={currentIndex === segments.length - 1}
              >
                ⏭
              </button>
              <div className={Styles.Action}>
                <button className={Styles.ActionButton} onClick={addtoShelf}>
                  <img src={like} alt="Like" className={Styles.LikeIcon} />
                </button>
              </div>
            </div>
            <div className={Styles.RangeContainer}>
              <input
                type="range"
                value={progress}
                max="100"
                onChange={handleSeek}
                className={Styles.slider}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className={Styles.slider}
              />
            </div>
          </>
        ) : (
          <p>Loading segments...</p>
        )}
      </div>
      {/* 
      <section className={Styles.BookActions}>
        <button className={Styles.ActionButtonRead}>Read</button>
        <button className={Styles.ActionButtonListen}>Listen</button>
      </section> */}

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
