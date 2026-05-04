import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaUserSecret, FaDatabase, FaUsers } from 'react-icons/fa';
import { SiCplusplus, SiPython, SiHtml5, SiJavascript, SiReact, SiNodedotjs, SiMysql, SiMongodb, SiGit } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const skills = [
  {
    icon: <FaCode />, title: 'Programming',
    tags: [{ icon: <SiCplusplus />, label: 'C++' }, { icon: <SiPython />, label: 'Python' }, { icon: <FaJava />, label: 'Java' }],
  },
  {
    icon: <FaLaptopCode />, title: 'Web Development',
    tags: [{ icon: <SiHtml5 />, label: 'HTML' }, { label: 'CSS3' }, { icon: <SiJavascript />, label: 'JavaScript' }, { icon: <SiReact />, label: 'React' }, { icon: <SiNodedotjs />, label: 'Node.js' }],
  },
  {
    icon: <FaUserSecret />, title: 'Cybersecurity Tools',
    tags: [{ label: 'Wireshark' }, { label: 'Nmap' }, { label: 'Burp Suite' }, { label: 'Metasploit' }, { label: 'OWASP ZAP' }, { label: 'MITM Proxy' }],
  },
  {
    icon: <FaDatabase />, title: 'Databases & Tools',
    tags: [{ icon: <SiMysql />, label: 'MySQL' }, { icon: <SiMongodb />, label: 'MongoDB' }, { icon: <SiGit />, label: 'Git' }, { label: 'REST APIs' }, { label: 'Postman' }],
  },
  {
    icon: <FaUsers />, title: 'Soft Skills',
    tags: [{ label: 'Problem Solving' }, { label: 'Communication' }, { label: 'Leadership' }, { label: 'Adaptability' }],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <motion.h2 className="section-title"
        initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4 }}>
        My Skills
      </motion.h2>
      <div className="skills-grid">
        {skills.map((s, i) => (
          <motion.div key={i} className="skill-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: i * 0.05 ease: [0.16,1,0.3,1] }}>
            <div className="skill-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <div className="skill-tags">
              {s.tags.map((t, j) => (
                <span key={j} className="skill-tag">
                  {t.icon && <span style={{ fontSize:'0.95em' }}>{t.icon}</span>} {t.label}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
