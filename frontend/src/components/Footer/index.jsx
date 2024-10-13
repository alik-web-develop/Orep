import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Bio } from '../../data/constants';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footerWrapper}>
        <h1 className={styles.logo}>Rishav Chanda</h1>
        <nav className={styles.nav}>
          <a className={styles.navLink} href="#about">About</a>
          <a className={styles.navLink} href="#skills">Skills</a>
          <a className={styles.navLink} href="#experience">Experience</a>
          <a className={styles.navLink} href="#projects">Projects</a>
          <a className={styles.navLink} href="#education">Education</a>
        </nav>
        <div className={styles.socialMediaIcons}>
          <a className={styles.socialMediaIcon} href={Bio.facebook} target="_blank" rel="noopener noreferrer">
            <FacebookIcon />
          </a>
          <a className={styles.socialMediaIcon} href={Bio.twitter} target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
          </a>
          <a className={styles.socialMediaIcon} href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
          <a className={styles.socialMediaIcon} href={Bio.insta} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
        </div>
        <p className={styles.copyright}>
          &copy; 2023 Rishav Chanda. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
