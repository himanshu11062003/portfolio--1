import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaShieldAlt, FaLock, FaCreditCard, FaNetworkWired, FaSearch, FaToolbox, FaCode, FaGithub } from 'react-icons/fa';
import { SiNodedotjs, SiReact } from 'react-icons/si';

const achievements = [
  { target: 100, label: 'Problems Solved on HackerRank' },
  { target: 4,   label: 'Projects Built' },
  { target: 1,   label: 'Internship Completed' },
  { target: 11,  label: 'Certifications Earned' },
];

const certs = [
  { icon: <FaShieldAlt />, title: 'Cybersecurity Analyst Job Simulation', issuer: 'Tata (Forage)', href: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_69b17371ff554757c9f4dcb8_1776206116517_completion_certificate.pdf' },
  { icon: <FaLock />, title: 'Cyber Job Simulation', issuer: 'Deloitte (Forage)', href: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_69b17371ff554757c9f4dcb8_1776202484691_completion_certificate.pdf' },
  { icon: <FaCreditCard />, title: 'Cybersecurity Simulation', issuer: 'Mastercard (Forage)', href: 'https://www.theforage.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_69b17371ff554757c9f4dcb8_1773238645005_completion_certificate.pdf' },
  { icon: <FaNetworkWired />, title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', href: 'https://www.credly.com/badges/a562e41c-bda0-4093-a6a2-5e723eeb1c36/linked_in_profile' },
  { icon: <FaSearch />, title: 'Digital Forensics', issuer: 'Coursera', href: 'https://coursera.org/share/9fc20cd2ff06416c0c45f29663225dec' },
  { icon: <FaToolbox />, title: 'Intro to Cybersecurity Tools & Cyberattacks', issuer: 'Coursera', href: 'https://coursera.org/share/3bcea4decf0e2860edcbc72c0580dc00' },
  { icon: <FaShieldAlt />, title: 'Intro to Cybersecurity Essentials', issuer: 'Coursera', href: 'https://coursera.org/share/85df291ace1471f0cbd262effc0c3e37' },
  { icon: <FaCode />, title: 'DSA Self-Paced (C++/Java)', issuer: 'Cipher School', href: 'https://www.cipherschools.com/certificate/preview?id=66a9bad1777cd431c3cc449e' },
  { icon: <SiNodedotjs />, title: 'Back-End Apps with Node.js', issuer: 'Coursera', href: 'https://coursera.org/share/b0290158956408d2d6386248beb86f2b' },
  { icon: <SiReact />, title: 'Front-End Apps with React', issuer: 'Coursera', href: 'https://coursera.org/share/b2cf695c319632c455759b0105f5c812' },
  { icon: <FaGithub />, title: 'Getting Started with Git and GitHub', issuer: 'Coursera', href: 'https://coursera.org/share/e8de9605196d518e5ba5bdb138f1313b' },
];

function Counter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span className="ach-counter" ref={ref}>{count}+</span>;
}

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <motion.h2 className="section-title"
        initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4 }}>
        Certifications &amp; Achievements
      </motion.h2>

      {/* Achievements */}
      <div className="achievements-grid">
        {achievements.map((a, i) => (
          <motion.div key={i} className="ach-card"
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16,1,0.3,1] }}>
            <Counter target={a.target} />
            <p>{a.label}</p>
          </motion.div>
        ))}
      </div>

      <h3 className="sub-heading">Certifications</h3>
      <div className="certs-grid">
        {certs.map((c, i) => (
          <motion.a key={i} href={c.href} target="_blank" rel="noreferrer" className="cert-card"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3, delay: i * 0.03, ease: 'easeOut' }}>
            <div className="cert-icon">{c.icon}</div>
            <div className="cert-info"><h4>{c.title}</h4><p>{c.issuer}</p></div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
