import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Routes, Route } from 'react-router-dom';
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import './App.scss';
import './Styles/styles.scss'
import Nav from './Components/Nav';
import ThemeContext from './Context/ThemeContext';
import AccentContext from './Context/AccentContext';
import OrderContext from './Context/OrderContext';
import LoginContext from './Context/LoginContext';

function App() {
  const [theme, setTheme] = useState('light')
  const [accent, setAccent] = useState('blk')
  const [order, setOrder] = useState('shuffled')
  const [status, setStatus] = useState(["in", "Username"])

  const toggleTheme = () => {
    const themeMode = theme === 'dark';
    setTheme(themeMode ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <AccentContext.Provider value={{accent, setAccent}}>
        <OrderContext.Provider value={{order, setOrder}}>
          <LoginContext.Provider value={{status, setStatus}}>
            <div className={`theme-${theme} accent-${accent}`}>
              {status[0] === "in" ?
              <main>
                <Nav />
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
              </main>
              :
              <main>
                <button className="logIn" onClick={() => setStatus(["in", "username"])}>
                  Sign In
                </button>
              </main>}
            </div>
          </LoginContext.Provider>
        </OrderContext.Provider>
      </AccentContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;