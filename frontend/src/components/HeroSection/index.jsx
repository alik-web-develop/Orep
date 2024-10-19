import React from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
import './HeroSection.scss'; // Импорт стилей
import Logo from '../../images/logo.jpg';
import Typewriter from 'typewriter-effect';
import Bio from "../../db/Bio.json";
import AnimatedComponent from '../AnimationComp';
import { context } from "../../store"
import { useState, useEffect, useContext } from 'react';
import { useTranslation } from "react-i18next"
import bgAnim from '../bg_anim/BgAnimation.jsx'


function HeroSection() {

  const bioData = Bio.Bio[0];
  const { t, i18n: { changeLanguage } } = useTranslation();


  return (

    <div id="about" className="hero-container">
      <bgAnim />
      <div className="hero-bg">
        <HeroBgAnimation />
      </div>
      <AnimatedComponent>
        <div className="hero-inner-container">
          <div className="hero-left-container">
            <div className="hero-title">{t("hero.hello")} <br /> {t("hero.title")}</div>
            <div className="hero-text-loop">
              <span className="hero-span-name">{t("hero.weAre")} </span>
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
            <div className="hero-subtitle">{t("hero.description")}</div>
            <a href={bioData.resume} target='_blank' rel='noopener noreferrer' className="hero-resume-button">{t("hero.resume")}</a>
          </div>
          <div className="hero-right-container">
            <img src={Logo} alt="hero" className="hero-img" />
          </div>
        </div>
      </AnimatedComponent>
    </div>
  );
}

export default HeroSection;
