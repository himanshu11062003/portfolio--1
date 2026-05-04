import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div className="footer-socials">
        <a href="mailto:himanshusingh11062003@gmail.com" className="footer-social" title="Email"><FaEnvelope /></a>
        <a href="https://github.com/himanshu11062003" target="_blank" rel="noreferrer" className="footer-social" title="GitHub"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/hs2003" target="_blank" rel="noreferrer" className="footer-social" title="LinkedIn"><FaLinkedinIn /></a>
      </div>
      <p className="copyright">© 2026 Himanshu Kumar. Designed with ♥ | All Rights Reserved.</p>
    </footer>
  );
}
