import React from 'react';
import AnimatedComponent from '../AnimationComp';
import './style.scss';

const About = () => {
  return (
    <div className="about-container">
      <AnimatedComponent>
        <div className="about-text">About</div>
        <div className="about-social-media-icons">
          <a href="#" className="about-social-media-icon">Icon 1</a>
          <a href="#" className="about-social-media-icon">Icon 2</a>
        </div>
      </AnimatedComponent>
    </div>

  );
};

export default About;
