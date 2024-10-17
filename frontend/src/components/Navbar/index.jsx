import { useState, useEffect, useContext } from 'react';
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import Bio from '../../db/Bio.json';
import { Link, NavLink } from "react-router-dom";
import NavLinkDrp from './NavLinksDrp.jsx';
import { useTranslation } from "react-i18next"
import './style.scss';
import { context } from "../../store"

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, i18n: { changeLanguage } } = useTranslation();

  const { state, dispatch } = useContext(context)
  function activateLang(language) {
    dispatch({ type: "SET_LANG", payload: language.code })
    changeLanguage(language.code)
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <a className="navbar__logo-link" href="/">
            <DiCssdeck size="3rem" /> <span className="navbar__span">FullFusion</span>
          </a>
        </div>
        <div className="navbar__mobile-icon">
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </div>
        <ul className="navbar__items">
          <li className="navbar__item"><a href="#about">{t('navigation.about')}</a></li>
          <li className="navbar__item"><a href='#skills'>{t('navigation.skills')}</a></li>
          <li className="navbar__item"><a href='#experience'>{t('navigation.experience')}</a></li>
          <li className="navbar__item"><a href='#projects'>{t('navigation.projects')}</a></li>
          <li className="navbar__item"><a href='#education'>{t('navigation.education')}</a></li>
          <NavLinkDrp items={state.languages} activateFn={activateLang} />
        </ul>
        <div className="navbar__button-container">
          <button className="navbar__github-button" onClick={openModal}>{t('navigation.github')}</button>
        </div>
        {isOpen && (
          <div className="navbar__mobile-menu">
            <a className="navbar__mobile-link" href="#about" onClick={() => setIsOpen(false)}>{t('navigation.about')}</a>
            <a className="navbar__mobile-link" href='#skills' onClick={() => setIsOpen(false)}>{t('navigation.skills')}</a>
            <a className="navbar__mobile-link" href='#experience' onClick={() => setIsOpen(false)}>{t('navigation.experience')}</a>
            <a className="navbar__mobile-link" href='#projects' onClick={() => setIsOpen(false)}>{t('navigation.projects')}</a>
            <a className="navbar__mobile-link" href='#education' onClick={() => setIsOpen(false)}>{t('navigation.education')}</a>
            <NavLinkDrp items={state.languages} activateFn={activateLang} />
            <button className="navbar__github-button" onClick={openModal}>{t('navigation.github')}</button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{t('navigation.githubProfiles')}</h2>
            <h5>{t('navigation.githubCreators')}</h5>
            <div>
              <a href={Bio.Bio[0].github_mal4ik} target="_blank" rel="noopener noreferrer">{t('navigation.githubFirst')}</a><br />
              <a href={Bio.Bio[0].github_bulyon} target="_blank" rel="noopener noreferrer">{t('navigation.githubSecond')}</a>
              <button onClick={closeModal} className="modal-close"> <span>&times;</span> </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
