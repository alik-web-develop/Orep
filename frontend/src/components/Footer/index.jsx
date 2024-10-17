import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import  Bio  from '../../db/Bio.json';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footerWrapper}>
        <h1 className={styles.logo}>FullFusion</h1>
        <nav className={styles.nav}>
          <a className={styles.navLink} href="#about">About</a>
          <a className={styles.navLink} href="#skills">Skills</a>
          <a className={styles.navLink} href="#experience">Experience</a>
          <a className={styles.navLink} href="#projects">Projects</a>
          <a className={styles.navLink} href="#education">Education</a>
        </nav>
        <div className={styles.socialMediaIcons}>
          <a className={styles.socialMediaIcon} href={Bio.Bio[0].facebook} target="_blank" rel="noopener noreferrer">
            <FacebookIcon />
          </a>
          <a className={styles.socialMediaIcon} href={Bio.Bio[0].twitter} target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
          </a>
          <a className={styles.socialMediaIcon} href={Bio.Bio[0].linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
          <a className={styles.socialMediaIcon} href={Bio.Bio[0].insta} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
        </div>
        <p className={styles.copyright}>
          &copy; 2024. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
