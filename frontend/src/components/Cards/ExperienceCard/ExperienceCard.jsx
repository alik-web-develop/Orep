import React from 'react';
import './ExperienceCard.scss';

const ExperienceCard = ({ experience }) => {
    return (
        <div className="experience-card__container">
            <div className="experience-card__top">
                <img className="experience-card__image" src={experience.img} alt="Experience" />
                <div className="experience-card__body">
                    <div className="experience-card__role">{experience.role}</div>
                    <div className="experience-card__company">{experience.company}</div>
                    <div className="experience-card__date">{experience.date}</div>
                </div>
            </div>
            <div className="experience-card__description">
                {experience?.desc &&
                    <span className="experience-card__span">{experience?.desc}</span>
                }
                {experience?.skills &&
                    <>
                        <br />
                        <div className="experience-card__skills">
                            <b>Skills:</b>
                            <div className="experience-card__item-wrapper">
                                {experience?.skills?.map((skill, index) => (
                                    <div className="experience-card__skill" key={index}>• {skill}</div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>

        </div>
    );
};

export default ExperienceCard;
