import { useAudioPlayer } from "../context/AudioPlayerContext";
import Styles from "../css/AudioPlayer.module.css";

const AudioPlayer = () => {
  const { book, isPlaying, togglePlayPause } = useAudioPlayer();

  if (!book) return null; // Hide if no book is playing

  return (
    <div className={Styles.audioPlayer}>
      <p>Playing: {book.title}</p>
      <button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default AudioPlayer;
