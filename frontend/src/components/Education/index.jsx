import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import  education from '../../db/Education.json';
import  experiences from '../../db/Expiriences.json';
import EducationCard from '../Cards/EducationCard/EducationCard.jsx';
import styles from './Education.module.scss';
import AnimatedComponent from '../AnimationComp/index.jsx';

const EducationSection = () => {
    return (
        <div className={styles.container} id="education">
            <div className={styles.wrapper}>
                <div className={styles.title}>Education</div>
                <div className={styles.desc}>
                    My education has been a journey of self-discovery and growth. My educational details are as follows.
                </div>
                <div className={styles.timelineSection}>
                    <Timeline>
                        {education.map((education, index) => (
                            <AnimatedComponent>

                                <TimelineItem key={index}>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <EducationCard education={education} />
                                    </TimelineContent>
                                    <TimelineSeparator>
                                        <TimelineDot variant="outlined" color="secondary" />
                                        {index !== experiences.length && <TimelineConnector style={{ background: '#854CE6' }} />}
                                    </TimelineSeparator>
                                </TimelineItem>
                            </AnimatedComponent>
                        ))}
                    </Timeline>
                </div>
            </div>
        </div>
    );
};

export default EducationSection;
