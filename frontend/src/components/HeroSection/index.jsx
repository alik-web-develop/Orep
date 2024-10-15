import React from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
import './HeroSection.scss'; // Импорт стилей
import Logo from '../../images/logo.jpg';
import Typewriter from 'typewriter-effect';
import Bio from "../../db.json"; 

const HeroSection = () => {

  const bioData = Bio.Bio[0];

  return (
    <div id="about" className="hero-container">
      <div className="hero-bg">
        <HeroBgAnimation />
      </div>
      <div className="hero-inner-container">
        <div className="hero-left-container">
          <div className="hero-title">Hello, we are <br /> {bioData.name}</div>
          <div className="hero-text-loop">
            <span className="hero-span-name">We are </span>
            <span className="hero-span">
              <Typewriter
                options={{
                  strings: bioData.roles, 
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </div>
          <div className="hero-subtitle">{bioData.description}</div>
          <a href="#" target='_blank' rel='noopener noreferrer' className="hero-resume-button">Check Resume</a> 
        </div>
        <div className="hero-right-container">
          <img src={Logo} alt="hero" className="hero-img" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
