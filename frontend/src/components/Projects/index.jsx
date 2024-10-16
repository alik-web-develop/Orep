import React, { useState, useMemo } from 'react';
import './style.scss';
import ProjectCard from '../Cards/ProjectCard/ProjectCards.jsx';
import { projects } from '../../data/constants';

const Projects = ({ openModal, setOpenModal }) => {
    const [toggle, setToggle] = useState('all');

    // Мемоизация отфильтрованных проектов
    const filteredProjects = useMemo(() => {
        return toggle === 'all' ? projects : projects.filter((item) => item.category === toggle);
    }, [toggle]);

    return (
        <div className="projects-container" id="projects">
            <div className="projects-wrapper">
                <div className="projects-title">Projects</div>
                <div className="projects-desc">
                    I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects.
                </div>
                <div className="projects-toggle-button-group">
                    {['all', 'web app', 'android app', 'machine learning'].map((category) => (
                        <div
                            key={category}
                            className={`projects-toggle-button ${toggle === category ? 'active' : ''}`}
                            onClick={() => setToggle(category)}
                        >
                            {category === 'web app' ? "WEB APP'S" : category.toUpperCase()}
                        </div>
                    ))}
                </div>
                <div className="projects-card-container">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} openModal={openModal} setOpenModal={setOpenModal} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Projects); // Мемоизация компонента
