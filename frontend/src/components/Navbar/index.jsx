import React from 'react';
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import './style.scss'; // Импорт стилей

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <a className="navbar__logo-link" href="/">
            <DiCssdeck size="3rem" /> <span className="navbar__span">Portfolio</span>
          </a>
        </div>
        <div className="navbar__mobile-icon">
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </div>
        <ul className="navbar__items">
          <li className="navbar__item"><a href="#about">About</a></li>
          <li className="navbar__item"><a href='#skills'>Skills</a></li>
          <li className="navbar__item"><a href='#experience'>Experience</a></li>
          <li className="navbar__item"><a href='#projects'>Projects</a></li>
          <li className="navbar__item"><a href='#education'>Education</a></li>
        </ul>
        <div className="navbar__button-container">
          <a className="navbar__github-button" href={Bio.github} target="_blank" rel="noopener noreferrer">Github Profile</a>
        </div>
        {isOpen && (
          <div className="navbar__mobile-menu">
            <a className="navbar__mobile-link" href="#about" onClick={() => setIsOpen(false)}>About</a>
            <a className="navbar__mobile-link" href='#skills' onClick={() => setIsOpen(false)}>Skills</a>
            <a className="navbar__mobile-link" href='#experience' onClick={() => setIsOpen(false)}>Experience</a>
            <a className="navbar__mobile-link" href='#projects' onClick={() => setIsOpen(false)}>Projects</a>
            <a className="navbar__mobile-link" href='#education' onClick={() => setIsOpen(false)}>Education</a>
            <a className="navbar__github-button" style={{ padding: '10px 16px' }} href={Bio.github} target="_blank" rel="noopener noreferrer">Github Profile</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
