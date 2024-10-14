import React from 'react';
import './styles.scss'; // Импортируем стили
import { skills } from '../../data/constants';

const Skills = () => {
  return (
    <div className="skills-container" id="skills">
      <div className="skills-wrapper">
        <h1 className="skills-title">Skills</h1>
        <p className="skills-desc">
          Here are some of my skills on which I have been working on for the past 2 years.
        </p>
        <div className="skills-list">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.title}>
              <h2 className="skill-card-title">{skill.title}</h2>
              <div className="skill-items">
                {skill.skills.map((item) => (
                  <div className="skill-item" key={item.name}>
                    <img className="skill-item-image" src={item.image} alt={item.name} />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
