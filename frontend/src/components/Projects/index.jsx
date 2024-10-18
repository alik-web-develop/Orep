import React, { useState, useMemo } from 'react';
import './style.scss';
import ProjectCard from '../Cards/ProjectCard/ProjectCards.jsx';
import projects from '../../db/Projects.json';
import { useTranslation } from "react-i18next"
import AnimatedComponent from '../AnimationComp/index.jsx';
import BgAnimation from '../bg_anim/BgAnimation.jsx'

const Projects = ({ openModal, setOpenModal }) => {
    const [toggle, setToggle] = useState('all');
    const { t, i18n: { changeLanguage } } = useTranslation();

    // Мемоизация отфильтрованных проектов
    const filteredProjects = useMemo(() => {
        return toggle === 'all' ? projects : projects.filter((item) => item.category === toggle);
    }, [toggle]);

    return (
        <div className="projects-container" id="projects">
            <AnimatedComponent>
            <BgAnimation />

                <div className="projects-wrapper">
                    <div className="projects-title">{t("projects.title")}</div>
                    <div className="projects-desc">
                        {t("projects.description")}
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
            </AnimatedComponent>
        </div >
    );
};

export default React.memo(Projects); // Мемоизация компонента
