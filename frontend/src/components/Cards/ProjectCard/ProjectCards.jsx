import React from 'react';
import './style.scss';
import LazyImage from '../../lazyImg.jsx';

const ProjectCards = ({ project, setOpenModal }) => {
    return (
        <div className="project-cards__card">
            <LazyImage className="project-cards__image" src={project.image} alt="project" />
            <div className="project-cards__tags">
                {project.tags?.map((tag, index) => (
                    <span className="project-cards__tag" key={index}>{tag}</span>
                ))}
            </div>
            <div className="project-cards__details">
                <div className="project-cards__title">{project.title}</div>
                <div className="project-cards__date">{project.date}</div>
                <div className="project-cards__description">{project.description}</div>
            </div>
        </div>
    );
};

export default React.memo(ProjectCards); // Мемоизация компонента
