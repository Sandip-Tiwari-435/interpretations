import styles from './Footer.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span>Made with ♥ by Sandip</span>

        <div className={styles.socialLinks}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} Your Developer Name. All rights reserved.
          </div>
          <a href="https://github.com/Sandip-Tiwari-435" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/sandip435/" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
