import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AudioProvider } from "../contexts/AudioPlayerContext";
import ProfilePage from "./pages/ProfilePage";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LikedPage from "./pages/LikedPage";
import SingleBookPage from "./pages/SingleBook";
import BottomTabs from "./BottomTabs/Tabs";
import SearchPageExact from "./pages/SearchPageExact";
import GlobalAudioPlayer from "./components/GlobalAudioPlayer";

import "./App.css";

function App() {
  return (
    <AudioProvider>
      <Router>
        <div className="AppPageContainer">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Explore" element={<SearchPage />} />
            <Route path="/Liked" element={<LikedPage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/SingleBook" element={<SingleBookPage />} />
            <Route path="/Find" element={<SearchPageExact />} />
          </Routes>
          {/* Move GlobalAudioPlayer outside of Routes */}
          <GlobalAudioPlayer />
        </div>
        <BottomTabs />
      </Router>
    </AudioProvider>
  );
}

export default App;
