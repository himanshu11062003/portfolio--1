import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaAt, FaGithub, FaLinkedinIn, FaChevronDown, FaShieldAlt, FaCode } from 'react-icons/fa';

const words = ['Web Security', 'Penetration Testing', 'React Development', 'Backend APIs'];

function useTyping(words) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let speed = deleting ? 60 : 100;
    if (!deleting && charIdx === current.length) speed = 1600;
    else if (deleting && charIdx === 0) speed = 300;

    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setText(current.slice(0, charIdx + 1));
        setCharIdx(i => i + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setText(current.slice(0, charIdx - 1));
        setCharIdx(i => i - 1);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, charIdx, deleting, wordIdx, words]);

  return text;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};
const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } }
};

export default function Hero() {
  const typed = useTyping(words);
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <section id="home" className="hero-section">
      {/* LEFT */}
      <motion.div className="hero-left"
        variants={stagger} initial="hidden" animate="show">
        <motion.span className="hero-greeting" variants={item}>Hi, I am</motion.span>
        <motion.h1 className="hero-name" variants={item}>Himanshu Kumar</motion.h1>
        <motion.p className="hero-sub" variants={item}>Cyber Security Analyst / Full Stack Developer</motion.p>
        <motion.div className="typing-row" variants={item}>
          <span className="typing-prefix">→&nbsp;</span>
          <span>{typed}</span>
          <span className="cursor" />
        </motion.div>

        <motion.div className="socials" variants={item}>
          <a href="mailto:himanshusingh11062003@gmail.com" className="social-btn" title="Email"><FaAt /></a>
          <a href="https://github.com/himanshu11062003" target="_blank" rel="noreferrer" className="social-btn" title="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/hs2003" target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn"><FaLinkedinIn /></a>
        </motion.div>

        <motion.div variants={item} style={{ position: 'relative', display: 'inline-block' }}>
          <button className="cv-btn" onClick={() => setCvOpen(o => !o)}>
            Download CV <FaChevronDown className={`chevron${cvOpen ? ' open' : ''}`} />
          </button>
          {cvOpen && (
            <div className="cv-menu">
              <a href="/cyber.pdf" download className="cv-item" onClick={() => setCvOpen(false)}>
                <FaShieldAlt /> Cyber Security CV
              </a>
              <a href="/fullstack.pdf" download className="cv-item" onClick={() => setCvOpen(false)}>
                <FaCode /> Full Stack CV
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* RIGHT */}
      <motion.div className="hero-right"
        initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16,1,0.3,1] }}>
        <img src="/photo.jpg" alt="Himanshu Kumar" className="hero-photo" />
      </motion.div>
    </section>
  );
}
