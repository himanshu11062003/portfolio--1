import { motion } from 'framer-motion';
import { FaGithub, FaFish, FaLink, FaRobot } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';

const projects = [
  {
    icon: <FaFish />,
    title: 'Phishing Simulation Tool',
    desc: 'Built a simulation platform using Python and Web Tech. It ethically simulates login pages for credential harvesting to be used strictly for awareness and security testing purposes.',
    tech: ['Python', 'HTML/CSS', 'JavaScript'],
    links: [{ label: 'GitHub', href: 'https://github.com/himanshu11062003/Singh-Phishing-Tool.git', icon: <FaGithub /> }],
  },
  {
    icon: <MdSecurity />,
    title: 'Web Vulnerability Scanner',
    desc: 'A Python-based automated scanner designed to detect open ports, inspect HTTP headers, and identify vulnerabilities like XSS, demonstrating fundamental VAPT concepts.',
    tech: ['Python', 'Networking', 'VAPT'],
    links: [{ label: 'GitHub', href: 'https://github.com/himanshu11062003/web-vulnerability-scanner.git', icon: <FaGithub /> }],
  },
  {
    icon: <FaLink />,
    title: 'URL Shortener',
    desc: 'A modern React application integrated with Material UI for creating and managing shortened URLs. Features dynamic routing and LocalStorage-based session handling.',
    tech: ['React', 'Material UI', 'LocalStorage'],
    links: [{ label: 'GitHub', href: 'https://github.com/himanshu11062003/url-shortener-app.git', icon: <FaGithub /> }],
  },
  {
    icon: <FaRobot />,
    title: 'AI Content Generator Platform',
    desc: 'A Full Stack platform powered by the Gemini API that generates content based on user prompts. Engineered with a Node.js REST API and a seamless React frontend integration.',
    tech: ['Node.js', 'React', 'Gemini API', 'REST API'],
    links: [
      { label: 'Frontend', href: 'https://github.com/himanshu11062003/ai-generator-platform-frontend.git', icon: <FaGithub /> },
      { label: 'Backend', href: 'https://github.com/himanshu11062003/ai-generator-platform-backend.git', icon: <FaGithub /> },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <motion.h2 className="section-title"
        initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        Featured Projects
      </motion.h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <motion.div key={i} className="project-card"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16,1,0.3,1] }}>
            <div className="project-thumb">{p.icon}</div>
            <div className="project-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-tech">
                {p.tech.map((t, j) => <span key={j} className="skill-tag">{t}</span>)}
              </div>
              <div className="project-links">
                {p.links.map((l, j) => (
                  <a key={j} href={l.href} target="_blank" rel="noreferrer" className="proj-link">
                    {l.icon} {l.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
