import { motion } from 'framer-motion';
import { FaShieldAlt, FaBug, FaTools, FaCode, FaServer } from 'react-icons/fa';
import { SiReact } from 'react-icons/si';

const items = [
  { icon: <FaShieldAlt />, text: 'VAPT Specialist' },
  { icon: <FaBug />, text: 'Vulnerability Identification (XSS, SQLi)' },
  { icon: <FaTools />, text: 'Security Tools (Burp Suite, Nmap, ZAP)' },
  { icon: <FaCode />, text: 'Full Stack Web Development' },
  { icon: <SiReact />, text: 'React & Node.js Ecosystem' },
  { icon: <FaServer />, text: 'Secure & Scalable Systems' },
];

export default function About() {
  return (
    <section id="about" className="section">
      <motion.h2 className="section-title"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}>
        About Me
      </motion.h2>
      <motion.div className="about-card"
        initial={{ x: 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}>
        <p>I am a highly motivated <strong>Cyber Security Analyst</strong> with hands-on experience in Vulnerability Assessment and Penetration Testing (VAPT). My core expertise lies in identifying and mitigating security flaws to protect critical infrastructure.</p>
        <p>Alongside my cybersecurity expertise, I am a capable <strong>Full Stack Developer</strong>. I love designing and building secure, efficient, and scalable web applications from the ground up.</p>
        <ul className="about-list">
          {items.map((it, i) => (
            <motion.li key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}>
              {it.icon} {it.text}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
