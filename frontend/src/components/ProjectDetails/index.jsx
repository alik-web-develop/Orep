import React, { useEffect, useMemo } from 'react';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { Modal } from '@mui/material';
import AnimatedComponent from '../AnimationComp/index.jsx';
import './style.scss';
import LazyImage from '../lazyImg.jsx';

const Index = ({ openModal, setOpenModal }) => {
    // Мемоизация проекта
    const memoizedProject = useMemo(() => project, [project]);

    return (
        <div className="container">
            <div className="wrapper">
                <LazyImage className="image" src={memoizedProject?.image} alt="Project" />
                <div className="title">{memoizedProject?.title}</div>
                <div className="date">{memoizedProject?.date}</div>
                <div className="tags">
                    {memoizedProject?.tags.map((tag, index) => (
                        <div key={index} className="tag">{tag}</div>
                    ))}
                </div>
                <div className="desc">{memoizedProject?.description}</div>
                {memoizedProject?.member && (
                    <>
                        <div className="label">Members</div>
                        <div className="members">
                            {memoizedProject?.member.map((member, index) => (
                                <div className="member" key={index}>
                                    <AnimatedComponent>
                                        <LazyImage className="member-image" src={member.img} alt={member.name} />
                                        <div className="member-name">{member.name}</div>
                                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="icon-link">
                                            <GitHub />
                                        </a>
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link">
                                            <LinkedIn />
                                        </a>
                                    </AnimatedComponent>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <div className="button-group">
                    <a className="button dull" href={memoizedProject?.github} target="_blank" rel="noopener noreferrer">View Code</a>
                    <a className="button" href={memoizedProject?.webapp} target="_blank" rel="noopener noreferrer">View Live App</a>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Index); // Мемоизация компонента
