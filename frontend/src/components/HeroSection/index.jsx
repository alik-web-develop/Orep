import React from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
import './HeroSection.scss'; // Импорт стилей
import Logo2 from '../../images/logo2.jpg';
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';

const HeroSection = () => {
  return (
    <div id="about" className="hero-container">
      <div className="hero-bg">
        <HeroBgAnimation />
      </div>
      <div className="hero-inner-container">
        <div className="hero-left-container">
          <div className="hero-title">Hello, we are <br /> {Bio.name}</div>
          <div className="hero-text-loop">
            <span className="hero-span-name">We are </span>
            <span className="hero-span">
              <Typewriter
                options={{
                  strings: Bio.roles,
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </div>
          <div className="hero-subtitle">{Bio.description}</div>
          <a href="#" target='display' className="hero-resume-button">Check Resume</a>
        </div>
        <div className="hero-right-container">
          <img src={Logo2} alt="hero" className="hero-img" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
