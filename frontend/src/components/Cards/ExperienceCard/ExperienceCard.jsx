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
        // Получаем лайки и дизлайки с сервера только при монтировании компонента
        let isMounted = true;
        axios.get(`http://localhost:3000/experiences/${experience.id}`)
            .then(response => {
                if (isMounted) {
                    setLikes(response.data.likes);
                    setDislikes(response.data.dislikes);
                }
            })
            .catch(error => {
                // Если записи нет, создаем новую
                if (error.response && error.response.status === 404) {
                    axios.post('http://localhost:3000/experiences', {
                        id: experience.id,
                        likes: 0,
                        dislikes: 0
                    }).then(() => {
                        if (isMounted) {
                            setLikes(0);
                            setDislikes(0);
                        }
                    }).catch(err => {
                        console.error('Ошибка при создании новой записи:', err);
                    });
                } else {
                    console.error('Ошибка при загрузке данных:', error);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [experience.id]);

    const handleLikeClick = () => {
        if (disliked) {
            setDisliked(false);
            setDislikes(dislikes - 1);
        }
        const newLikedState = !liked;
        setLiked(newLikedState);
        const updatedLikes = newLikedState ? likes + 1 : likes - 1;
        setLikes(updatedLikes);

        // Обновляем лайки на сервере
        axios.patch(`http://localhost:3000/experiences/${experience.id}`, {
            likes: updatedLikes
        }).catch(error => {
            console.error('Ошибка при обновлении лайков:', error);
        });
    };

    const handleDislikeClick = () => {
        if (liked) {
            setLiked(false);
            setLikes(likes - 1);
        }
        const newDislikedState = !disliked;
        setDisliked(newDislikedState);
        const updatedDislikes = newDislikedState ? dislikes + 1 : dislikes - 1;
        setDislikes(updatedDislikes);

        axios.patch(`http://localhost:3000/experiences/${experience.id}`, {
            dislikes: updatedDislikes
        }).catch(error => {
            console.error('Ошибка при обновлении дизлайков:', error);
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
