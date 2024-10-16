import React, { useState } from 'react';
import './ExperienceCard.scss';
import { BiDislike, BiSolidDislike, BiLike, BiSolidLike } from "react-icons/bi";

function ExperienceCard({ experience }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    function handleLikeClick() {
        setLiked(!liked);
        if (disliked) setDisliked(false);
    };

    function handleDislikeClick() {
        setDisliked(!disliked);
        if (liked) setLiked(false);
    };

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
                {experience?.desc && (
                    <span className="experience-card__span">{experience?.desc}</span>
                )}
                {experience?.skills && (
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
                )}
            </div>
            <div className="rated">
                <span onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
                    {liked ? <BiSolidLike /> : <BiLike />}
                </span>
                <span onClick={handleDislikeClick} style={{ cursor: 'pointer' }}>
                    {disliked ? <BiSolidDislike /> : <BiDislike />}
                </span>
            </div>
        </div>
    );
}

export default ExperienceCard;
