import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo">Himanshu<span>.</span></a>

        <button className="mobile-toggle" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className={active === l.href ? 'active' : ''}
                onClick={() => { setActive(l.href); setOpen(false); }}>
                {l.label}
              </a>
            </li>
          ))}
          <li className="nav-cta"><a href="#contact" onClick={() => setOpen(false)}>Contact Me</a></li>
        </ul>
      </div>
    </header>
  );
}
