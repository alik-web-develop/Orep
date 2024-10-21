import { useState, useContext } from 'react';
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { PiShoppingCart } from "react-icons/pi";
import Bio from '../../db/Bio.json';
import { NavLink } from "react-router-dom";
import NavLinkDrp from './NavLinksDrp.jsx';
import { useTranslation } from "react-i18next"
import './style.scss';
import { context } from "../../store"
import LoginForm from '../Authentication/index.jsx'

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, i18n: { changeLanguage } } = useTranslation();

  const { state, dispatch } = useContext(context);

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
          <NavLink to="/" className="navbar__logo-link">
            <DiCssdeck size="3rem" /> <span className="navbar__span">FullFusion</span>
          </NavLink>
        </div>
        <div className="navbar__mobile-icon">
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </div>
        <ul className="navbar__items">
          <li className="navbar__item"><NavLink to="/#about">{t('navigation.about')}</NavLink></li>
          <li className="navbar__item"><NavLink to="/#skills">{t('navigation.skills')}</NavLink></li>
          <li className="navbar__item"><NavLink to="/#experience">{t('navigation.experience')}</NavLink></li>
          <li className="navbar__item"><NavLink to="/#projects">{t('navigation.projects')}</NavLink></li>
          <li className="navbar__item"><NavLink to="/#education">{t('navigation.education')}</NavLink></li>
          <li className="navbar__item"><NavLink to="/courses">{t('navigation.courses')}</NavLink></li>
          <NavLink to="/basket" onClick={() => setIsOpen(false)} className="navbar__basket"><PiShoppingCart /></NavLink>
          <NavLinkDrp items={state.languages} activateFn={activateLang} />
        </ul>
        <div className="navbar__button-container">
          <LoginForm />
        </div>
        {isOpen && (
          <div className="navbar__mobile-menu">
            <NavLink className="navbar__mobile-link" to="/#about" onClick={() => setIsOpen(false)}>{t('navigation.about')}</NavLink>
            <NavLink className="navbar__mobile-link" to="/#skills" onClick={() => setIsOpen(false)}>{t('navigation.skills')}</NavLink>
            <NavLink className="navbar__mobile-link" to="/#experience" onClick={() => setIsOpen(false)}>{t('navigation.experience')}</NavLink>
            <NavLink className="navbar__mobile-link" to="/#projects" onClick={() => setIsOpen(false)}>{t('navigation.projects')}</NavLink>
            <NavLink className="navbar__mobile-link" to="/#education" onClick={() => setIsOpen(false)}>{t('navigation.education')}</NavLink>
            <NavLink to="/courses" onClick={() => setIsOpen(false)}>{t('navigation.courses')}</NavLink>
            <NavLink to="/basket" onClick={() => setIsOpen(false)}><PiShoppingCart /></NavLink>
            <NavLinkDrp items={state.languages} activateFn={activateLang} />
            <LoginForm />
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
