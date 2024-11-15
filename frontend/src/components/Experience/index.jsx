import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/ExperienceCard/ExperienceCard.jsx';
import experiences from '../../db/Expiriences.json';  // Импортируем статичные данные опыта
import AnimatedComponent from '../AnimationComp/index.jsx';
import styles from './Experience.module.scss';
import { useTranslation } from "react-i18next";
import BgAnimation from '../bg_anim/BgAnimation.jsx';

function Experience() {
    const { t, i18n: { changeLanguage } } = useTranslation();

    return (
        <div className={styles.container} id="experience">
            <BgAnimation />
            <div className={styles.wrapper}>
                <div className={styles.title}>{t("experience.title")}</div>
                <div className={styles.desc}>
                    {t("experience.description")}
                </div>
                <div className={styles.timelineSection}>
                    <Timeline>

                        {experiences.map((experience, index) => (
                            <AnimatedComponent key={experience.id}>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot variant="outlined" color="secondary" />
                                        {index !== experiences.length - 1 && (
                                            <TimelineConnector style={{ background: '#854CE6' }} />
                                        )}
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <ExperienceCard experience={experience} />
                                    </TimelineContent>
                                </TimelineItem>
                            </AnimatedComponent>
                        ))}
                    </Timeline>
                </div>
            </div>
        </div>
    );
}

export default Experience;
