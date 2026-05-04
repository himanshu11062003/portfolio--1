import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaPaperPlane, FaCheckCircle, FaTimes, FaSpinner } from 'react-icons/fa';

const contactItems = [
  { icon: <FaEnvelope />, label: 'Email', value: 'himanshusingh11062003@gmail.com', href: 'mailto:himanshusingh11062003@gmail.com' },
  { icon: <FaPhone />, label: 'Phone', value: '+91-7061624322', href: 'tel:+917061624322' },
  { icon: <FaLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/hs2003', href: 'https://www.linkedin.com/in/hs2003' },
  { icon: <FaGithub />, label: 'GitHub', value: 'github.com/himanshu11062003', href: 'https://github.com/himanshu11062003' },
];

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [toast, setToast] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      form.reset();
      setStatus('idle');
      setToast(true);
      setTimeout(() => setToast(false), 5000);
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section">
      <motion.h2 className="section-title"
        initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        Get In Touch
      </motion.h2>
      <div className="contact-grid">
        <motion.div className="contact-info"
          initial={{ x: -60, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
          <h3>Let's Connect</h3>
          <p>I'm currently looking for new opportunities in cybersecurity and full stack development. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
          {contactItems.map((item, i) => (
            <div key={i} className="contact-item">
              <div className="contact-icon-box">{item.icon}</div>
              <div className="contact-details">
                <h4>{item.label}</h4>
                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{item.value}</a>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div className="contact-form-box"
          initial={{ x: 60, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
          <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="contact" />
            <div className="form-group"><input type="text" name="name" className="form-control" placeholder="Your Name" required /></div>
            <div className="form-group"><input type="email" name="email" className="form-control" placeholder="Your Email" required /></div>
            <div className="form-group"><input type="text" name="_subject" className="form-control" placeholder="Subject" required /></div>
            <div className="form-group"><textarea name="message" className="form-control" placeholder="Your Message" required /></div>
            <button type="submit" className="btn-submit" disabled={status === 'sending'}>
              {status === 'sending' ? <><FaSpinner className="spin" /> Sending...</> : <><FaPaperPlane /> Send Message</>}
            </button>
            {status === 'error' && <p style={{ color: '#f87171', marginTop: 10, fontSize: '0.85rem' }}>Something went wrong. Please try again.</p>}
          </form>
        </motion.div>
      </div>

      {/* Toast */}
      {toast && (
        <motion.div className="toast"
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }} transition={{ duration: 0.4 }}>
          <div className="toast-icon"><FaCheckCircle /></div>
          <div className="toast-content">
            <h4>Message Sent Successfully!</h4>
            <p>Thank you for reaching out. I'll get back to you shortly.</p>
          </div>
          <button className="toast-close" onClick={() => setToast(false)}><FaTimes /></button>
        </motion.div>
      )}
    </section>
  );
}
