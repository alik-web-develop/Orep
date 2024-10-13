import React from 'react';
import './EducationCardStyle.scss';

const EducationCard = ({ education }) => {
  return (
    <div className="education-card">
      <div className="education-top">
        <img src={education.img} className="image" alt="school" />
        <div className="body">
          <div className="name">{education.school}</div>
          <div className="degree">{education.degree}</div>
          <div className="date">{education.date}</div>
        </div>
      </div>
      <div className="grade">
        <b>Grade: </b>{education.grade}
      </div>
      <div className="description">
        <span className="description-span">{education.desc}</span>
      </div>
    </div>
  );
};

export default EducationCard;
