import { CloseRounded, GitHub, LinkedIn } from '@mui/icons-material';
import { Modal } from '@mui/material';
import React from 'react';
import './style.scss';  // Импортируем SCSS файл

const Index = ({ openModal, setOpenModal }) => {
    const project = openModal?.project;

    return (
        <Modal open={true} onClose={() => setOpenModal({ state: false, project: null })}>
            <div className="container">
                <div className="wrapper">
                    <CloseRounded
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "20px",
                            cursor: "pointer",
                        }}
                        onClick={() => setOpenModal({ state: false, project: null })}
                    />
                    <img className="image" src={project?.image} alt="Project" />
                    <div className="title">{project?.title}</div>
                    <div className="date">{project?.date}</div>
                    <div className="tags">
                        {project?.tags.map((tag, index) => (
                            <div key={index} className="tag">{tag}</div>
                        ))}
                    </div>
                    <div className="desc">{project?.description}</div>
                    {project?.member && (
                        <>
                            <div className="label">Members</div>
                            <div className="members">
                                {project?.member.map((member, index) => (
                                    <div key={index} className="member">
                                        <img className="member-image" src={member.img} alt={member.name} />
                                        <div className="member-name">{member.name}</div>
                                        <a href={member.github} target="new" className="icon-link">
                                            <GitHub />
                                        </a>
                                        <a href={member.linkedin} target="new" className="icon-link">
                                            <LinkedIn />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <div className="button-group">
                        <a className="button dull" href={project?.github} target='new'>View Code</a>
                        <a className="button" href={project?.webapp} target='new'>View Live App</a>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Index;
