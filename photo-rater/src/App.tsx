import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import './App.scss';
import './Styles/styles.scss'
import Nav from './Components/Nav';
import LoginPage from './Components/LoginPage';
import Home from "./Components/Home";
import RatingPage from './Components/RatingPage';
import UploadPage from "./Components/UploadPage";
import ProfilePage from "./Components/ProfilePage";
import CreateProfile from './Components/CreateProfile';
import ThemeContext from './Context/ThemeContext';
import AccentContext from './Context/AccentContext';
import OrderContext from './Context/OrderContext';
import LoginContext from './Context/LoginContext';
import CreateAccountContext from './Context/CreateAccountContext';

function App() {
  const [theme, setTheme] = useState('light')
  const [accent, setAccent] = useState('blk')
  const [order, setOrder] = useState('shuffled')
  const [status, setStatus] = useState(["out", "username"])
  const [details, setDetails] = useState({email: "", password: ""})

  const toggleTheme = () => {
    const themeMode = theme === 'dark';
    setTheme(themeMode ? 'light' : 'dark');
  };

  return (
    <Router>
      <ThemeContext.Provider value={{theme, setTheme}}>
        <AccentContext.Provider value={{accent, setAccent}}>
          <OrderContext.Provider value={{order, setOrder}}>
            <LoginContext.Provider value={{status, setStatus}}>
              <CreateAccountContext.Provider value={{details, setDetails}}>
                <div className={`theme-${theme} accent-${accent}`}>
                  <main>
                    {status[0] === "in" &&
                      <Nav />
                    }
                      <Routes>
                          <Route path="/" element={<LoginPage />} />
                          <Route path="rate" element={<RatingPage />} />
                          <Route path="upload" element={<UploadPage />} />
                          <Route path="profile" element={<ProfilePage />} />
                          <Route path="create-profile" element={<CreateProfile />} />
                          <Route path="home" element={<Home />} />
                      </Routes>
                    {status[0] === "in" &&
                      <section>
                        <button type="button" className="themeSwitch pageContents" onClick={toggleTheme}>
                          {theme === "light" ?
                            <FontAwesomeIcon icon={faSun} />
                          :
                            <FontAwesomeIcon icon={faMoon} />
                          }
                        </button>
                        <div className="palette">
                          <div className="accentSwitch"></div>
                          <button type="button" className="aOpt current pageContents"/>
                          <button type="button" className="aOpt gry pageContents" onClick={() => setAccent("gry")}/>
                          <button type="button" className="aOpt rd pageContents" onClick={() => setAccent("rd")}/>
                          <button type="button" className="aOpt mngo pageContents" onClick={() => setAccent("mngo")}/>
                          <button type="button" className="aOpt ylo pageContents" onClick={() => setAccent("ylo")}/>
                          <button type="button" className="aOpt grn pageContents" onClick={() => setAccent("grn")}/>
                          <button type="button" className="aOpt tl pageContents" onClick={() => setAccent("tl")}/>
                          <button type="button" className="aOpt blu pageContents" onClick={() => setAccent("blu")}/>
                          <button type="button" className="aOpt indgo pageContents" onClick={() => setAccent("indgo")}/>
                          <button type="button" className="aOpt pnk pageContents" onClick={() => setAccent("pnk")}/>
                          <button type="button" className="aOpt rsb pageContents" onClick={() => setAccent("rsb")}/>
                          <button type="button" className="aOpt blk pageContents" onClick={() => setAccent("blk")}/>
                        </div>
                      </section>
                    }
                  </main>
                </div>
              </CreateAccountContext.Provider>
            </LoginContext.Provider>
          </OrderContext.Provider>
        </AccentContext.Provider>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;