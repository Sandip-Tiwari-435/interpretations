import styles from './Footer.module.css';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h2 className={styles.footerTitle}>About the Developer</h2>
        <p>Passionate about building meaningful experiences and thoughtful user interfaces.</p>
        
        <div className={styles.socialLinks}>
          <a href="https://github.com/Sandip-Tiwari-435" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/your-linkedin-username/" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/your-twitter-handle" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>

        <div className={styles.copyright}>
          © {new Date().getFullYear()} Your Developer Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
