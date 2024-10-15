import { ThemeProvider } from "styled-components";
import { useState, useEffect, useContext, useReducer } from "react";
import { darkTheme, lightTheme } from './utils/Themes.jsx'
import Navbar from "./components/Navbar/index.jsx";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection/index.jsx";
import About from "./components/About/index.jsx";
import Skills from "./components/Skills/index.jsx";
import Projects from "./components/Projects/index.jsx";
import Contact from "./components/Contact/index.jsx";
import Footer from "./components/Footer/index.jsx";
import Experience from "./components/Experience/index.jsx";
import Education from "./components/Education/index.jsx";
import ProjectDetails from "./components/ProjectDetails/index.jsx";
import styled from "styled-components";
import AnimatedComponent from './components/AnimationComp';
import { useTranslation } from "react-i18next";
import { context, globalReducer, initialState } from "./store";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`
function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  console.log(openModal)

  const [state, dispatch] = useReducer(globalReducer, initialState)

  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ru" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  }


  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router >
        <context.Provider value={{ state, dispatch }}>
        <Navbar />
          <Body>
            <HeroSection />
            <Wrapper>
              <AnimatedComponent>
                <Skills />
              </AnimatedComponent>
              <Experience />
            </Wrapper>
            <AnimatedComponent>
              <Projects />
            </AnimatedComponent>
            <Wrapper>
              <AnimatedComponent>
                <Education />
              </AnimatedComponent>
              <AnimatedComponent>
                <Contact />
              </AnimatedComponent>
            </Wrapper>
            <Footer />
            {openModal.state &&
              <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
            }
          </Body>
        </context.Provider>

      </Router>
    </ThemeProvider>
  );
}

export default App;
