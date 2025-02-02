import { useState } from "react";
import Styles from "../css/ProfilePage.module.css";
import UserIcon from "../assets/TabsIcons/user.png";
import StarIcon from "../assets/ProfilePage/Stars.png";
import KidsIcon from "../assets/ProfilePage/kid.png";
import GoalIcon from "../assets/ProfilePage/Goal.png";
import Modal from "../components/ModalProfile";

const ProfilePage = () => {
  //States
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Handlers
  const handleMenuClick = (e) => {
    setIsModalOpen(true);
    e.preventDefault();
  };
  return (
    <div className={Styles.ProfileContainer}>
      <div className={Styles.ProfileHeader}>
        <h1 className={Styles.ProfilePageHeading}>Profile Page</h1>
      </div>

      <section className={Styles.ProfileInfo}>
        <div className={Styles.PictureBox}>
          <img src={UserIcon} alt="User Icon" className={Styles.UserPicture} />
        </div>
        <b>Hi</b>
        <button className={Styles.ProfileButton}>Edit Profile</button>
      </section>
      <section className={Styles.ProfileMenue}>
        <button className={Styles.MenueButton} onClick={handleMenuClick}>
          <img src={StarIcon} alt="User Icon" className={Styles.MenuIcon} />
          My Reviews
        </button>
        <button className={Styles.MenueButton} onClick={handleMenuClick}>
          <img src={GoalIcon} alt="User Icon" className={Styles.MenuIcon} />
          My listening Goals
        </button>
        <button className={Styles.MenueButton} onClick={handleMenuClick}>
          <img src={KidsIcon} alt="User Icon" className={Styles.MenuIcon} />
          Kids Mode
        </button>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Hello, this is a modal!</h2>
        <p>Click outside or press ✖ to close.</p>
      </Modal>
    </div>
  );
};

export default ProfilePage;
