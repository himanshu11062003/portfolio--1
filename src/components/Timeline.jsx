import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Timeline({ id, title, items }) {
  const tlRef = useRef(null);
  const ballRef = useRef(null);
  const [ballTop, setBallTop] = useState(0);

  useEffect(() => {
    let ticking = false;
    function update() {
      if (!tlRef.current || !ballRef.current) return;
      const rect = tlRef.current.getBoundingClientRect();
      const traveled = window.innerHeight * 0.55 - rect.top;
      const clamped = Math.max(0, Math.min(tlRef.current.offsetHeight, traveled));
      setBallTop(clamped);
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id={id} className="section">
      <motion.h2 className="section-title"
        initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4 }}>
        {title}
      </motion.h2>
      <div className="timeline" ref={tlRef}>
        <div className="tl-ball" ref={ballRef} style={{ top: ballTop }} />
        {items.map((item, i) => (
          <motion.div key={i}
            className={`tl-item ${i % 2 === 0 ? 'left' : 'right'}`}
            initial={{ x: i % 2 === 0 ? -60 : 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 ease: [0.16,1,0.3,1] }}>
            <div className="tl-content">
              <h3>{item.title}</h3>
              <h4>{item.org}</h4>
              <span className="tl-date">{item.date}</span>
              {item.points && (
                <ul>{item.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
