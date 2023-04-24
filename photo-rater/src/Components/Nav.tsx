import { FC, useState, useContext } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";
import Home from "./Home";
import RatingPage from './RatingPage';
import UploadPage from "./UploadPage";
import ProfilePage from "./ProfilePage";
import ProfileContext from "../Context/ProfileContext";
import LoginContext from "../Context/LoginContext";

const Nav: FC = () => {
    const { status, setStatus } = useContext(LoginContext)
    const [pSection, setPSection] = useState("overview")

    return (
        <ProfileContext.Provider value={{pSection, setPSection}}>
            <nav>
                <Router>
                    <div className="home navSection">
                        <Link to="/" className="navItem navIcon">
                            <FontAwesomeIcon id="home" icon={faHome} size="1x" />
                        </Link>
                    </div>
                    <div className="midNav navSection">
                        <Link to="rate" className="navItem">Rate</Link>
                        <Search />
                        <Link to="upload" className="navItem">Upload</Link>
                    </div>
                    <div className="navSection">
                        <div className="pDrop">
                            <Link to="profile" id="UN" className="navItem navIcon" onClick={() => setPSection("overview")}>
                                <FontAwesomeIcon id="user" icon={faUser} size="1x" />
                                <h2>Username</h2>
                            </Link>
                            <div id="pOptions">
                                <Link to="profile">
                                    <button className="pButton pD pDTop" onClick={() => setPSection("overview")}>
                                        Overview
                                    </button>
                                </Link>
                                <Link to="profile">
                                    <button className="pButton pD" onClick={() => setPSection("activity")}>
                                        Activity
                                    </button>
                                </Link>
                                <Link to="profile">
                                    <button className="pButton pD" onClick={() => setPSection("settings")}>
                                        Settings
                                    </button>
                                </Link>
                                <button className="logOut pD" onClick={() => setStatus(["out", ""])}>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="rate" element={<RatingPage />} />
                        <Route path="upload" element={<UploadPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                    </Routes>
                </Router>
            </nav>
        </ProfileContext.Provider>
    )
}

export default Nav;