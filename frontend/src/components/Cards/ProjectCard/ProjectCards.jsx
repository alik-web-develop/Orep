import React, { useState } from 'react';
import './style.scss';

const Modal = ({ project, closeModal }) => {
    if (!project) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <img className="project-cards__image" src={project.image} alt="project" />
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
        </div>
    );
};

const ProjectCards = ({ project }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <div className="project-cards__card" onClick={openModal}>
                <img className="project-cards__image" src={project.image} alt="project" />
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
            
            {isOpen && <Modal project={project} closeModal={closeModal} />}
        </>
    );
};

export default ProjectCards;
