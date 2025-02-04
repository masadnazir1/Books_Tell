import { useState } from "react";
import Styles from "../css/SingleBookPage.module.css";
import back from "../assets/General/back.png";
import sound from "../assets/General/sound.png";
import cover from "../assets/Covers/cover.png";
import like from "../assets/TabsIcons/Heart.png";
import Modal from "../components/ModalProfile";
import { useNavigate } from "react-router-dom";

const SingleBookPage = () => {
  const navigate = useNavigate();
  //States
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Handlers
  const handleMenuClick = (e) => {
    setIsModalOpen(true);
    e.preventDefault();
  };
  //
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className={Styles.SingleBookPageContainer}>
      <div className={Styles.SingleBookPageHeader}>
        <img
          src={back}
          alt=""
          className={Styles.back}
          onClick={handleBackClick}
        />
        <img
          src={sound}
          alt=""
          className={Styles.back}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <section className={Styles.ProfileInfo}>
        <div className={Styles.BooKcover}>
          <img src={cover} alt="" className={Styles.BooKcoverImage} />
        </div>
      </section>

      <section className={Styles.BookInfoBox}>
        <div className={Styles.BooKInfo}>
          <strong className={Styles.BookTitle}>The Power of Habit</strong>
          <p className={Styles.BookAuthor}>By: Charles Duhigg</p>
        </div>
        <div className={Styles.Action}>
          <button className={Styles.ActionButton} onClick={handleMenuClick}>
            <img src={like} alt="" className={Styles.LikeIcon} />
          </button>
        </div>
      </section>
      <section className={Styles.BookActions}>
        <button className={Styles.ActionButtonRead}>Read</button>
        <button className={Styles.ActionButtonListen}>Listen</button>
      </section>
      <section className={Styles.BookDescription}>
        <strong>Description</strong>
        <p>
          In the quiet village of Eldenwood, nestled between ancient forests and
          rolling hills, young Elara discovers a hidden map that leads to a
          forgotten kingdom — a place shrouded in mystery and legend. When a
          dark force awakens, threatening to destroy everything she holds dear,
          Elara is forced to embark on a perilous journey with unlikely allies:
          a brooding swordsman, a mischievous thief, and a scholar with a secret
          past. As they travel through enchanted lands, battling mythical
          creatures and solving cryptic puzzles, Elara begins to unravel the
          secrets of her own heritage, uncovering powers she never knew she had.
          But time is running out, and the forces of darkness are closing in.
          With the fate of Eldenwood — and perhaps the world — hanging
        </p>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Hello, this is a modal!</h2>
        <p>Click outside or press ✖ to close.</p>
      </Modal>
    </div>
  );
};

export default SingleBookPage;
