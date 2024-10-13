import React from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
import './HeroSection.scss'; // Импорт стилей
import HeroImg from '../../images/HeroImage.jpg';
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
          <div className="hero-title">Hi, I am <br /> {Bio.name}</div>
          <div className="hero-text-loop">
            I am a
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
          <a href={Bio.resume} target='display' className="hero-resume-button">Check Resume</a>
        </div>
        <div className="hero-right-container">
          <img src={HeroImg} alt="hero" className="hero-img" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
