import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LikedPage from "./pages/LikedPage";
import SingleBookPage from "./pages/SingleBook";
import BottomTabs from "./BottomTabs/Tabs";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="AppPageContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Explore" element={<SearchPage />} />
          <Route path="/Liked" element={<LikedPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/SingleBook" element={<SingleBookPage />} />
        </Routes>
      </div>
      <BottomTabs />
    </Router>
  );
}

export default App;
