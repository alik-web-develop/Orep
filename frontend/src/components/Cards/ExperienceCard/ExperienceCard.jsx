import React, { useState, useEffect } from 'react';
import './ExperienceCard.scss';
import { BiDislike, BiSolidDislike, BiLike, BiSolidLike } from "react-icons/bi";
import axios from 'axios';

function ExperienceCard({ experience }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    useEffect(() => {
        // Fetch likes and dislikes from the server when the component mounts
        axios.get(`http://localhost:3000/experiences/${experience.id}`)
            .then(response => {
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
            });
    }, [experience.id]);

    const handleLikeClick = () => {
        if (disliked) {
            setDisliked(false);
            setDislikes(dislikes - 1);
        }
        const newLikedState = !liked;
        setLiked(newLikedState);
        setLikes(newLikedState ? likes + 1 : likes - 1);

        // Update likes on the server
        axios.patch(`http://localhost:3000/experiences/${experience.id}`, {
            likes: newLikedState ? likes + 1 : likes - 1
        });
    };

    const handleDislikeClick = () => {
        if (liked) {
            setLiked(false);
            setLikes(likes - 1);
        }
        const newDislikedState = !disliked;
        setDisliked(newDislikedState);
        setDislikes(newDislikedState ? dislikes + 1 : dislikes - 1);

        // Update dislikes on the server
        axios.patch(`http://localhost:3000/experiences/${experience.id}`, {
            dislikes: newDislikedState ? dislikes + 1 : dislikes - 1
        });
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
                    {liked ? <BiSolidLike /> : <BiLike />} {likes}
                </span>
                <span onClick={handleDislikeClick} style={{ cursor: 'pointer' }}>
                    {disliked ? <BiSolidDislike /> : <BiDislike />} {dislikes}
                </span>
            </div>
        </div>
    );
}

export default ExperienceCard;
