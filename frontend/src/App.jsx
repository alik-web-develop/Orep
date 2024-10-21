import { ThemeProvider } from "styled-components";
import { useState, useReducer, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.jsx';
import Navbar from "./components/Navbar/index.jsx";
import './App.scss';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeroSection from "./components/HeroSection/index.jsx";
import Skills from "./components/Skills/index.jsx";
import Projects from "./components/Projects/index.jsx";
import Contact from "./components/Contact/index.jsx";
import Experience from "./components/Experience/index.jsx";
import Education from "./components/Education/index.jsx";
import Courses from "./components/Courses";
import Basket from "./components/Basket";
import ProjectDetails from "./components/ProjectDetails/index.jsx";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { context, globalReducer, initialState } from "./store";
import Footer from "./components/Footer"; // Импорт Footer
import Music from '../public/Music/music.mp3'; // Импорт музыки

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), 
              linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`;

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  const [state, dispatch] = useReducer(globalReducer, initialState);

  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ru" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <context.Provider value={{ state, dispatch }}>
          <ScrollToHash />
          <Navbar />

          <Body>
            <Routes>
              <Route path="/" element={
                <>
                  <HeroSection />
                  <Wrapper>
                    <Skills />
                    <Experience />
                  </Wrapper>
                  <Wrapper>
                    <Education />
                    <Projects />
                    <Contact />
                  </Wrapper>
                </>
              } />

              <Route path="/project/:id" element={<ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/basket" element={<Basket />} />
            </Routes>

            {openModal.state && (
              <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
            )}
          </Body>

          {/* Footer теперь с аудиоплеером */}
          <Footer music={Music} />
        </context.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
